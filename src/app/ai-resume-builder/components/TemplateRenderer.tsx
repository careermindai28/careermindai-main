import { ResumeJSON, TemplateKey } from "@/lib/resumeTypes";
import ATSClassicTemplate from "@/templates/atsClassic";
import ModernProfessionalTemplate from "@/templates/modernProfessional";
import ExecutiveTemplate from "@/templates/executive";

type Props = {
  template: TemplateKey;
  data: ResumeJSON;
};

export default function TemplateRenderer({ template, data }: Props) {
  switch (template) {
    case "modernProfessional":
      return <ModernProfessionalTemplate data={data} />;
    case "executive":
      return <ExecutiveTemplate data={data} />;
    case "atsClassic":
    default:
      return <ATSClassicTemplate data={data} />;
  }
}
