import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaHeadset,
} from "react-icons/fa";

const CONTACTS = [
  {
    icon: (
      <FaMapMarkerAlt className="text-xl text-[color:var(--custom-orange)]" />
    ),
    label: "Our Office",
    value: "Jl. Raya Puputan No.19, Bali",
  },
  {
    icon: <FaEnvelope className="text-xl text-[color:var(--custom-orange)]" />,
    label: "Our Email",
    value: "netick@support.com",
    href: "mailto:netick@support.com",
  },
  {
    icon: <FaPhoneAlt className="text-xl text-[color:var(--custom-orange)]" />,
    label: "Our Phone",
    value: "+62 123-321-543",
    href: "tel:+62123321543",
  },
  {
    icon: <FaHeadset className="text-xl text-[color:var(--custom-orange)]" />,
    label: "Our Hotline",
    value: "1280-0021",
    href: "tel:12800021",
  },
];

const ContactInfoCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 w-full text-gray-900 flex flex-col gap-6 border border-gray-100">
      <div>
        <h3 className="text-[color:var(--custom-orange)] font-semibold text-sm mb-1">
          Hello!
        </h3>
        <h2 className="text-2xl font-semibold mb-2">Get In Touch</h2>
        <p className="text-gray-500 text-sm mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua enim adiqua
          consectetur adipiscing.
        </p>
      </div>
      <ul className="flex flex-col gap-5">
        {CONTACTS.map((c, i) => (
          <li key={i} className="flex items-start gap-4">
            <span className="mt-1">{c.icon}</span>
            <div>
              <div className="font-semibold text-base">{c.label}</div>
              {c.href ? (
                <a
                  href={c.href}
                  className="text-gray-500 hover:text-[color:var(--custom-orange)] text-sm transition"
                >
                  {c.value}
                </a>
              ) : (
                <div className="text-gray-500 text-sm">{c.value}</div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContactInfoCard;
