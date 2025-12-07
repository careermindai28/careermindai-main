import { NextRequest, NextResponse } from 'next/server';
import { openai, DEFAULT_MODEL } from '@/lib/openaiClient';

type ResumeAuditRequest = {
  resumeText: string;
  jobDescription?: string;
  targetRole?: string;
  companyName?: string;
  region?: string;
  experienceLevel?: string;
};

interface SectionFeedback {
  section: string;
  comments: string[];
}

interface Subscores {
  atsScore: number;
  contentScore: number;
  formattingScore: number;
  impactScore: number;
}

interface OpenAIResumeAuditResponse {
  overallScore: number;
  subscores: Subscores;
  summary: string;
  strengths: string[];
  improvements: string[];
  sectionFeedback: SectionFeedback[];
  recommendedKeywords: string[];
  riskFlags: string[];
  regionNotes: string;
  roleFitNotes: string;
}

function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function transformToUIFormat(openAIResponse: OpenAIResumeAuditResponse) {
  return {
    resumeMindScore: clampScore(openAIResponse.overallScore),
    strengths: openAIResponse.strengths.slice(0, 5).map((strength, index) => ({
      title: `Strength ${index + 1}`,
      description: strength,
    })),
    improvements: openAIResponse.improvements.slice(0, 5).map((improvement, index) => ({
      title: `Improvement ${index + 1}`,
      description: improvement,
      priority: (index < 2 ? 'high' : index < 4 ? 'medium' : 'low') as 'high' | 'medium' | 'low',
    })),
    atsCompatibility: clampScore(openAIResponse.subscores.atsScore),
    atsRecommendations: openAIResponse.sectionFeedback.slice(0, 5).map((section, index) => ({
      title: section.section,
      description: section.comments.join(' '),
      impact: (index < 2 ? 'high' : index < 4 ? 'medium' : 'low') as 'high' | 'medium' | 'low',
    })),
    summary: openAIResponse.summary,
    recommendedKeywords: openAIResponse.recommendedKeywords,
    riskFlags: openAIResponse.riskFlags,
    regionNotes: openAIResponse.regionNotes,
    roleFitNotes: openAIResponse.roleFitNotes,
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: ResumeAuditRequest = await request.json();

    // Validate required fields
    if (!body.resumeText || body.resumeText.trim().length < 100) {
      return NextResponse.json(
        { error: 'Resume text is required and must be at least 100 characters long' },
        { status: 400 }
      );
    }

    // Build the system prompt
    const systemPrompt = `You are an expert resume analyzer specializing in the ResumeMind Score™ methodology. 

Your task is to analyze resumes comprehensively and provide structured feedback in JSON format.

ResumeMind Score™ Logic:
- Overall Score (0-100): Weighted average of subscores
- ATS Score (0-100): Keyword matching, formatting compatibility, section parsing
- Content Score (0-100): Achievement quantification, action verbs, impact demonstration
- Formatting Score (0-100): Visual clarity, standard sections, font choices, spacing
- Impact Score (0-100): Career progression, measurable results, relevance to target role

Analysis Guidelines:
1. Identify 3-5 key strengths in the resume
2. Provide 3-5 specific, actionable improvements with priority levels
3. Give detailed section-by-section feedback
4. Recommend missing keywords from job description (if provided)
5. Flag any red flags (gaps, typos, formatting issues)
6. Provide region-specific and role-specific notes when applicable

CRITICAL: You MUST return ONLY valid JSON with no additional text, explanations, or markdown formatting. The response must be a single JSON object that can be parsed directly.`;

    // Build the user prompt
    let userPrompt = `Analyze this resume and provide a comprehensive audit:\n\nRESUME TEXT:\n${body.resumeText}`;

    if (body.jobDescription) {
      userPrompt += `\n\nJOB DESCRIPTION:\n${body.jobDescription}`;
    }

    if (body.targetRole) {
      userPrompt += `\n\nTARGET ROLE: ${body.targetRole}`;
    }

    if (body.companyName) {
      userPrompt += `\n\nCOMPANY: ${body.companyName}`;
    }

    if (body.region) {
      userPrompt += `\n\nREGION: ${body.region}`;
    }

    if (body.experienceLevel) {
      userPrompt += `\n\nEXPERIENCE LEVEL: ${body.experienceLevel}`;
    }

    userPrompt += `\n\nProvide your analysis in the following JSON structure (return ONLY the JSON, no other text):
{
  "overallScore": <number 0-100>,
  "subscores": {
    "atsScore": <number 0-100>,
    "contentScore": <number 0-100>,
    "formattingScore": <number 0-100>,
    "impactScore": <number 0-100>
  },
  "summary": "<overall assessment string>",
  "strengths": ["<strength 1>", "<strength 2>", ...],
  "improvements": ["<improvement 1>", "<improvement 2>", ...],
  "sectionFeedback": [
    {
      "section": "<section name>",
      "comments": ["<comment 1>", "<comment 2>"]
    }
  ],
  "recommendedKeywords": ["<keyword 1>", "<keyword 2>", ...],
  "riskFlags": ["<flag 1>", "<flag 2>", ...],
  "regionNotes": "<region-specific advice>",
  "roleFitNotes": "<role-specific advice>"
}`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    });

    const rawContent = completion.choices[0]?.message?.content;

    if (!rawContent) {
      throw new Error('No content received from OpenAI');
    }

    // Parse the JSON response
    let parsedResponse: OpenAIResumeAuditResponse;
    try {
      parsedResponse = JSON.parse(rawContent);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', rawContent);
      throw new Error('Invalid JSON response from AI');
    }

    // Validate and clamp scores
    parsedResponse.overallScore = clampScore(parsedResponse.overallScore);
    parsedResponse.subscores.atsScore = clampScore(parsedResponse.subscores.atsScore);
    parsedResponse.subscores.contentScore = clampScore(parsedResponse.subscores.contentScore);
    parsedResponse.subscores.formattingScore = clampScore(parsedResponse.subscores.formattingScore);
    parsedResponse.subscores.impactScore = clampScore(parsedResponse.subscores.impactScore);

    // Transform to UI format
    const uiResponse = transformToUIFormat(parsedResponse);

    return NextResponse.json(uiResponse, { status: 200 });

  } catch (error: any) {
    console.error('Resume audit API error:', error);

    if (error.status === 401) {
      return NextResponse.json(
        { error: 'Invalid OpenAI API key. Please check your configuration.' },
        { status: 500 }
      );
    }

    if (error.status === 429) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please try again later.' },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: error.message || 'An error occurred while analyzing the resume' },
      { status: 500 }
    );
  }
}