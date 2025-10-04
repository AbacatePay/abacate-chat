import { PageLayout } from "@/app/components/layout/page-layout";
import { ReactNode } from "react";

interface AcademyLayoutProps {
  children: ReactNode;
}

export default function AcademyLayout({ children }: AcademyLayoutProps) {
  return <PageLayout title="Academy">{children}</PageLayout>;
}
