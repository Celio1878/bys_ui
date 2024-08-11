"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChaptersPagination } from "@/components/chapters-pagination";
import { BreadcrumbComponent } from "@/components/breadcrumb-component";
import { useParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useSession } from "next-auth/react";
import { CreateComment } from "@/components/create-comment";
import { Comment } from "@/components/comment";

export default function ChapterPage() {
  const chapter_title = "test";
  const { id } = useParams() as { id: string };
  const { data: session } = useSession() as any;

  return (
    <div className="flex flex-col items-center justify-center gap-10 pt-8">
      <BreadcrumbComponent
        book_link={`/books/${id}`}
        chapters_link={`/books/${id}/#chapters`}
        chapter_title={chapter_title}
        book_title={"text"}
      />
      <Card className="w-11/12 lg:w-2/3 xl:w-3/5 py-2 px-6 sm:px-16 bg-amber-50">
        <CardHeader>
          <CardTitle className="text-center">{chapter_title}</CardTitle>
        </CardHeader>
        <CardContent
          className="flex flex-col gap-1 p-0 leading-6 indent-2.5"
          dangerouslySetInnerHTML={{ __html: html_content }}
        />
      </Card>

      <ChaptersPagination chapters_tags={[]} />
      <Separator />
      <Card className="w-full flex flex-col bg-slate-50">
        <CardHeader>
          <CardTitle>Comentarios</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-col w-full mt-7 gap-10">
          <CreateComment user_name={session?.user.name} />
          <Separator />
          <Comment user_name={session?.user.name} />
          <Comment user_name={session?.user.name} />
          <Comment user_name={session?.user.name} />
        </CardContent>
      </Card>
    </div>
  );
}

const html_content = `<p>In the heart of a bustling city, where the streets hummed with the <span style="color: #FF0000">rhythm of life</span>, a <span style="color: #FF4500">young woman</span> named <mark>Emily</mark> found herself at a crossroads. Her days were filled with the monotony of a corporate job, a routine that left her yearning for something more.</p>
<p>One fateful evening, as she sat alone in her apartment, <mark>Emily</mark> stumbled upon an advertisement for a writing workshop. Intrigued, she decided to take a chance and sign up, determined to reignite the creative spark that had long been <span style="color: #FF00FF">dormant within her</span>.</p><hr>
<p><em>The workshop was a revelation</em>, <u>Emily</u> recalled, her eyes shining with newfound purpose. <strong>Under the guidance of a seasoned author, she learned to weave words into tapestries of emotion, painting vivid scenes that transported her readers to distant lands and into the depths of the human experience.</strong></p>
<p>As the weeks passed, Emily's confidence grew, and her passion for writing blossomed. She found herself lost in the worlds she created, her fingers dancing across the keyboard as she poured her heart and soul into every sentence.</p><p>Little did she know, this was just the beginning of a journey that would forever change the course of her life.</p>`;
