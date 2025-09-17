import Link from 'next/link';
import { ContactForm } from '@/components/contact-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { MateiAllLogo } from '@/components/icons';

export default function PrivacyContactPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <header className="absolute top-0 left-0 w-full p-4 flex justify-between items-center sm:p-6">
        <Link href="/" className="flex items-center gap-2 group" prefetch={false}>
          <MateiAllLogo className="h-8 w-8 transition-transform group-hover:scale-110" />
          <span className="font-headline text-xl font-bold">Matei.All</span>
        </Link>
        <Button asChild variant="ghost">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </header>

      <main className="w-full max-w-2xl mt-16 sm:mt-0">
        <Card className="w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-headline">Privacy & Contact</CardTitle>
            <CardDescription className="pt-2">My policy is simple. My contact form is even simpler.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-8 pt-2">
            <div className="text-center p-6 bg-secondary rounded-lg w-full">
              <p className="text-secondary-foreground/80">
                "Contact me via mail and my apps are made by me and I don't collect any data cus idc"
              </p>
            </div>
            <div className="w-full">
              <h3 className="text-2xl font-headline text-center mb-6">Send a Message</h3>
              <ContactForm />
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
