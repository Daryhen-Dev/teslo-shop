import { Geist, Geist_Mono, Montserrat_Alternates } from "next/font/google";

export const geistSans = Geist({
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export const titleFont = Montserrat_Alternates({ 
    subsets:["latin"], 
    weight: ['500', '700']
});

