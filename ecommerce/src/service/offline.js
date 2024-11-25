/** @format */

import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import logo from '@/assets/logo.png';

export const footerData = {
  logo: {
    src: logo,
    width: 100,
    height: 100,
    alt: 'logo',
  },
  description:
    'Shofy is a powerful tool eCommerce Laravel script for creating a professional and visually appealing online store.',
  myAccount: [
    { label: 'Track Orders', href: '/track-orders' },
    { label: 'Shipping', href: '/shipping' },
    { label: 'Wishlist', href: '/wishlist' },
    { label: 'My Account', href: '/account' },
    { label: 'Order History', href: '/order-history' },
    { label: 'Returns', href: '/returns' },
  ],
  information: [
    { label: 'Our Story', href: '/our-story' },
    { label: 'Careers', href: '/careers' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Latest News', href: '/latest-news' },
    { label: 'Contact Us', href: '/contact' },
  ],
  contactInfo: {
    phone: {
      label: 'Got Questions? Call us',
      number: '+91 941 234 5673',
      mail: 'support@shofy.com',
      location: {
        loc: '79 Sleepy Hollow St. Jamaica, New York 1432',
        map: '',
      },
    },
  },
  socialLinks: [
    { icon: Facebook, link: 'https://www.facebook.com/shofy' },
    { icon: Twitter, link: 'https://www.x.com/shofy' },
    { icon: Instagram, link: 'https://www.instagram.com/shofy' },
    { icon: Linkedin, link: '' },
  ],
};

export const footerMenuData = [
  {
    title: 'Health & Beauty',
    items: [
      'Top Brands',
      'Best Sellers',
      'Computers & Laptops',
      'Mobile Phone',
      'CPU Heat Pipes',
      'Accessories',
      'CPU Coolers',
    ],
  },
  {
    title: 'Electronics',
    items: [
      'Featured',
      'New Arrivals',
      'TWS Earphones',
      'Gifts',
      'Computers',
      'Playstation',
    ],
  },
  {
    title: 'Sweet Treats',
    items: [
      'Headphones',
      'Wireless Headphones',
      'Accessories',
      'TWS Earphones',
      'CPU Coolers',
      'Smart Watch',
      'Gaming Console',
    ],
  },
  {
    title: 'Fashion',
    items: [
      'New Arrivals',
      'Featured',
      'Top Brands',
      'Electronics',
      'Best Sellers',
      'Computers & Laptops',
      'Mobile Phone',
    ],
  },
];
