import { z } from 'zod';
export const contactSchema = z.object({
 name:z.string().trim().min(2,'Please enter your full name.').max(100),
 email:z.string().trim().email('Enter a valid email address.').max(254),
 phone:z.string().trim().max(40).optional().or(z.literal('')),
 company:z.string().trim().max(120).optional().or(z.literal('')),
 service:z.string().trim().min(1,'Choose a service.').max(100),
 budget:z.string().trim().max(80).optional().or(z.literal('')),
 timeline:z.string().trim().max(80).optional().or(z.literal('')),
 message:z.string().trim().min(20,'Please describe your project in at least 20 characters.').max(5000),
 consent:z.boolean().refine(v=>v===true,'Please confirm that we may contact you about this inquiry.'),
 website:z.string().max(0,'Invalid submission.').optional()
});
export type ContactInput = z.infer<typeof contactSchema>;
