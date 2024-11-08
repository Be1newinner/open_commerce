/** @format */

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, MapPin } from 'lucide-react';
import { footerData, footerMenuData as menuData } from '@/service/offline';

const Footer = () => {
  const formattedPhoneNumber = footerData.contactInfo.phone.number.replace(
    /\s/g,
    '',
  );

  return (
    <footer className="px-4 py-20 flex justify-center items-center bg-gray-200">
      <div className="container">
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
          <div>
            <Image
              src={footerData.logo.src}
              width={footerData.logo.width}
              height={footerData.logo.height}
              alt={footerData.logo.alt}
            />
            <p className="mt-3 footer-links">{footerData.description}</p>
            <div className="flex gap-4 mt-3">
              {footerData.socialLinks.map(
                (social, index) =>
                  social.link && (
                    <Link
                      href={social.link}
                      target="_blank"
                      key={index}
                      className="text-gray-700 hover:bg-gray-900 p-2 rounded-lg hover:text-white transition duration-200 ease-in-out"
                    >
                      <social.icon size={24} />
                    </Link>
                  ),
              )}
            </div>
          </div>

          <div>
            <h2 className="font-bold text-xl mb-2">My Account</h2>
            <ul>
              {footerData.myAccount.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="footer-links mb-3">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-xl mb-2">Information</h2>
            <ul>
              {footerData.information.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} className="footer-links mb-3">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-xl mb-2">Talk To Us</h2>
            <p className="footer-links">{footerData.contactInfo.phone.label}</p>
            <Link
              href={`tel:${formattedPhoneNumber}`}
              className="footer-links text-[22px] font-bold text-black"
            >
              {footerData.contactInfo.phone.number}
            </Link>
            <div className="flex flex-col gap-2 mt-3">
              <Link
                href={`mailto:${footerData.contactInfo.phone.mail}`}
                className="footer-links flex justify-start items-center gap-2"
              >
                <Mail size={20} />
                {footerData.contactInfo.phone.mail}
              </Link>
              <Link
                href={`${footerData.contactInfo.phone.location.map}`}
                target="_blank"
                className="footer-links flex justify-start items-start gap-2"
              >
                <MapPin size={20} />
                {footerData.contactInfo.phone.location.loc}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-2">
          {menuData.map((category, index) => (
            <div key={index} className="flex gap-2">
              <h2 className="font-bold text-md">{category.title}:</h2>
              <ul className="flex flex-wrap gap-2 ">
                {category.items.map((item, idx) => (
                  <React.Fragment key={idx}>
                    <li className="footer-links">{item}</li>
                    {idx < category.items.length - 1 && (
                      <span className="text-gray-400">|</span>
                    )}
                  </React.Fragment>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
