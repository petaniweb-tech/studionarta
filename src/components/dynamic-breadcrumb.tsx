"use client"

import React from "react";
import { usePathname } from 'next/navigation'
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const DynamicBreadcrumb = () => {
  const path = usePathname()

  // Split the pathname into segments
  const pathnames = path.split("/").filter((x: string) => x);

  // Generate breadcrumb items based on the path segments
  const breadcrumbItems = pathnames.map((value, index) => {
    // Build the URL for each breadcrumb item
    const to = `/${pathnames.slice(0, index + 1).join("/")}`;

    // Check if it's the last segment
    const isLast = index === pathnames.length - 1;

    return (
      <React.Fragment key={to}>
        <BreadcrumbItem>
          {isLast ? (
            // Render text for the last segment
            <BreadcrumbPage>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </BreadcrumbPage>
          ) : (
            // Render link for other segments
            <BreadcrumbLink asChild className="breadcrumb-link" href={to}>
              <Link href={to}>
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {!isLast && <BreadcrumbSeparator />}{" "}
        {/* Add a separator if not the last item */}
      </React.Fragment>
    );
  });

  return (
    <Breadcrumb className="font-supportingfont">
      <BreadcrumbList>
        {/* Add a Home breadcrumb link */}
        <BreadcrumbItem>
          <BreadcrumbLink asChild href={"/"}>
            <Link href={"/"}>Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {pathnames.length > 0 && <BreadcrumbSeparator />}{" "}
        {/* Add a separator after Home if there are more segments */}
        {breadcrumbItems}{" "}
        {/* Render the dynamically generated breadcrumb items */}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DynamicBreadcrumb;
