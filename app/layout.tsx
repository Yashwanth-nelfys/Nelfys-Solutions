import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { siteUrl } from '@/lib/utils';
export const metadata: Metadata = { metadataBase:new URL(siteUrl), title:{default:"Nelfy's Solutions | Web, Mobile & Software Development",template:"%s | Nelfy's Solutions"}, description:'Nelfy’s Solutions builds websites, mobile applications, and custom software to help businesses innovate, improve digital experiences, and grow.', applicationName:"Nelfy's Solutions", openGraph:{type:'website',siteName:"Nelfy's Solutions",title:"Nelfy's Solutions | Web, Mobile & Software Development",description:'Thoughtful digital products built around real business needs.',url:siteUrl}, twitter:{card:'summary_large_image',title:"Nelfy's Solutions | Web, Mobile & Software Development",description:'Websites, mobile applications, and custom software for businesses.'}, robots:{index:true,follow:true} };
export const viewport:Viewport={themeColor:'#080b14',width:'device-width',initialScale:1};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Header/><main id="main">{children}</main><Footer/></body></html>}
