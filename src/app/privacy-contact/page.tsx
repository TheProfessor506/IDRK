import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyContactPage() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background p-4 sm:p-6 md:p-8">
      <header className="absolute top-0 left-0 w-full p-4 flex justify-between items-center sm:p-6">
        <Link href="/" className="flex items-center gap-2 group" prefetch={false}>
          <span className="font-headline text-xl font-bold">Radulescu.org</span>
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
            <CardDescription className="pt-2">
              My privacy policy is simple. For any questions, you can reach me at:{' '}
              <a href="mailto:matei@radulescu.org" className="text-primary underline">
                matei@radulescu.org
              </a>
            </CardDescription>
          </CardHeader>
          <CardContent className="prose prose-sm prose-invert max-w-none text-muted-foreground">
            <h3>No Data Collection</h3>
            <p>
              I do not collect, use, save, or have access to any of your personal data from any of my applications or this website.
            </p>
            <p>
              This website does not use cookies, tracking scripts, or any third-party analytics or advertising frameworks. Since I collect no data, your personal information is safe.
            </p>
            <h3>Commitment to Privacy</h3>
            <p>
              This website and any associated applications are created by a sole independent developer. My business model does not depend on collecting or monetizing user data. I value privacy and have designed my projects with this principle at the core.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
