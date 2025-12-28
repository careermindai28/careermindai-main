import { NextRequest } from "next/server";
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

export async function POST(req: NextRequest) {
  const { email, plan } = await req.json();

  if (!email || !plan) {
    return new Response(JSON.stringify({ error: "Missing data" }), { status: 400 });
  }

  const user = await admin.auth().getUserByEmail(email);
  const db = getFirestore();

  await db.collection("users").doc(user.uid).set(
    { plan },
    { merge: true }
  );

  return Response.json({ ok: true });
}
