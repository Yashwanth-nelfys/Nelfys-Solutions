import { NextRequest,NextResponse } from 'next/server';import { Resend } from 'resend';import { contactSchema } from '@/lib/validations';
export const runtime='nodejs';
export async function POST(request:NextRequest){
 const origin=request.headers.get('origin');const host=request.headers.get('host');if(origin&&host){try{if(new URL(origin).host!==host)return NextResponse.json({error:'Request origin could not be verified.'},{status:403});}catch{return NextResponse.json({error:'Invalid request origin.'},{status:403});}}
 let body:unknown;try{body=await request.json();}catch{return NextResponse.json({error:'Please submit a valid form.'},{status:400});}
 const parsed=contactSchema.safeParse(body);if(!parsed.success)return NextResponse.json({error:'Please review the form fields and try again.',issues:parsed.error.flatten().fieldErrors},{status:400});
 const data=parsed.data;if(data.website)return NextResponse.json({ok:true});
 const apiKey=process.env.RESEND_API_KEY;const to=process.env.CONTACT_TO_EMAIL;const from=process.env.CONTACT_FROM_EMAIL;
 if(!apiKey||!to||!from)return NextResponse.json({error:'The contact form is not fully configured yet. Please try again later or contact the company through its verified public profile.'},{status:503});
 try{const resend=new Resend(apiKey);const result=await resend.emails.send({from,to,replyTo:data.email,subject:`New project inquiry — ${data.name}`,text:[`Name: ${data.name}`,`Email: ${data.email}`,`Phone: ${data.phone||'Not provided'}`,`Company: ${data.company||'Not provided'}`,`Service: ${data.service}`,`Budget: ${data.budget||'Not specified'}`,`Timeline: ${data.timeline||'Not specified'}`,'','Project description:',data.message].join('\n')});if(result.error)return NextResponse.json({error:'The email provider could not accept your message. Please try again later.'},{status:502});return NextResponse.json({ok:true},{status:200});}catch{return NextResponse.json({error:'The message could not be sent right now. Please try again later.'},{status:502});}
}
