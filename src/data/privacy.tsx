import Link from "next/link";

export const privacySections = [
  {
    title: "1. Introduction",
    content: (
      <p>
        This page explains how{" "}
        <Link href="/about-us">
          <span className="font-semibold text-[color:var(--custom-orange)] cursor-pointer">
            DiaryFood
          </span>
        </Link>{" "}
        manages, uses, and protects personal data of users on this food and
        beverage recipe platform.
      </p>
    ),
  },
  {
    title: "2. Data We Collect",
    content: (
      <ul className="list-disc pl-5">
        <li>Name, email, and account data during registration or login.</li>
        <li>
          Activity data such as saved recipes, comments, or shared content.
        </li>
        <li>Device information and access logs (IP, browser, access time).</li>
      </ul>
    ),
  },
  {
    title: "3. How We Use Your Data",
    content: (
      <ul className="list-disc pl-5">
        <li>To process registration, login, and community feature usage.</li>
        <li>
          To send notifications, updates, or promotions related to DiaryFood
          (with user consent).
        </li>
        <li>To improve service quality and user experience.</li>
        <li>To manage security and prevent misuse.</li>
      </ul>
    ),
  },
  {
    title: "4. Data Protection",
    content: (
      <ul className="list-disc pl-5">
        <li>
          DiaryFood uses security protocols (HTTPS, encryption) to protect user
          data.
        </li>
        <li>
          Data will not be sold or shared with third parties without permission,
          except when legally required.
        </li>
        <li>Only authorized staff can access user data.</li>
      </ul>
    ),
  },
  {
    title: "5. User Rights",
    content: (
      <ul className="list-disc pl-5">
        <li>
          Right to access, update, or delete personal data through account
          settings.
        </li>
        <li>
          Right to withdraw consent for data usage in promotions or newsletters.
        </li>
        <li>
          Right to submit questions or complaints regarding privacy to the
          DiaryFood team.
        </li>
      </ul>
    ),
  },
  {
    title: "6. Cookies",
    content: (
      <ul className="list-disc pl-5">
        <li>
          DiaryFood uses cookies to store preferences and enhance user
          experience.
        </li>
        <li>
          Users can configure their browser to reject cookies, though some
          features may not work optimally.
        </li>
      </ul>
    ),
  },
  {
    title: "7. Policy Updates",
    content: (
      <p>
        DiaryFood may update this privacy policy at any time. Changes will be
        announced through the website. Users are advised to check this page
        regularly.
      </p>
    ),
  },
  {
    title: "8. Contact",
    content: (
      <p>
        If you have any questions or feedback regarding privacy and security,
        please contact us through our{" "}
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
