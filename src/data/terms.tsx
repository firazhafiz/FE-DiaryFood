import Link from "next/link";
import { ReactNode } from "react";

export const terms: { title: string; content: ReactNode }[] = [
  {
    title: "1. Introduction",
    content: (
      <p>
        Welcome to{" "}
        <Link href="/about-us">
          <span className="font-semibold text-[color:var(--custom-orange)] cursor-pointer">
            DiaryFood
          </span>
        </Link>
        , a food and beverage recipe platform. By accessing and using our
        services, you acknowledge that you have read, understood, and agreed to
        all terms and conditions stated below.
      </p>
    ),
  },
  {
    title: "2. Definitions",
    content: (
      <ul className="list-disc pl-5">
        <li>
          <b>DiaryFood</b>: A website providing various food and beverage
          recipes, cooking tips, and community features.
        </li>
        <li>
          <b>User</b>: Any person who accesses, registers, or uses DiaryFood
          services.
        </li>
        <li>
          <b>Content</b>: All information, recipes, images, videos, and other
          materials available on DiaryFood.
        </li>
      </ul>
    ),
  },
  {
    title: "3. Terms of Use",
    content: (
      <ul className="list-decimal pl-5">
        <li>
          Users must provide accurate and verifiable information when
          registering or using services.
        </li>
        <li>
          Prohibited from uploading, sharing, or publishing content that
          violates laws, promotes discrimination, contains pornography, or
          infringes on others' copyrights.
        </li>
        <li>
          Users are fully responsible for content uploaded or shared through
          their accounts.
        </li>
        <li>
          DiaryFood reserves the right to remove content or deactivate accounts
          that violate terms without prior notice.
        </li>
      </ul>
    ),
  },
  {
    title: "4. User Rights & Obligations",
    content: (
      <ul className="list-disc pl-5">
        <li>
          Right to access, search, and use recipes and features according to
          terms.
        </li>
        <li>Responsible for maintaining account and password security.</li>
        <li>
          Responsible for all activities conducted through personal accounts.
        </li>
      </ul>
    ),
  },
  {
    title: "5. DiaryFood Rights & Obligations",
    content: (
      <ul className="list-disc pl-5">
        <li>Right to manage, modify, or remove content that violates terms.</li>
        <li>Right to update, add, or remove features without prior notice.</li>
        <li>Obligation to protect user data according to privacy policy.</li>
      </ul>
    ),
  },
  {
    title: "6. Content & Copyright",
    content: (
      <ul className="list-disc pl-5">
        <li>All content uploaded by users remains their responsibility.</li>
        <li>
          DiaryFood may use, display, or share user content for promotional
          purposes while maintaining proper attribution.
        </li>
        <li>
          Prohibited from copying, distributing, or utilizing DiaryFood content
          without written permission.
        </li>
      </ul>
    ),
  },
  {
    title: "7. Limitation of Liability",
    content: (
      <ul className="list-disc pl-5">
        <li>
          DiaryFood is not responsible for losses or damages resulting from the
          use of recipes or information on the website.
        </li>
        <li>
          Recipes and tips are provided as references only; results may vary
          depending on ingredients and cooking methods.
        </li>
      </ul>
    ),
  },
  {
    title: "8. Terms & Conditions Updates",
    content: (
      <p>
        DiaryFood reserves the right to modify these terms and conditions at any
        time. Changes will be announced through the website. Users are advised
        to check this page regularly.
      </p>
    ),
  },
  {
    title: "9. Contact",
    content: (
      <p>
        If you have any questions or feedback regarding these terms and
        conditions, please contact us through our{" "}
        <Link href="/contact">
          <span className="font-semibold text-[color:var(--custom-orange)] cursor-pointer">
            Contact
          </span>
        </Link>{" "}
        page.
      </p>
    ),
  },
];
