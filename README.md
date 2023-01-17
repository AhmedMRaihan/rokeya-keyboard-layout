## উপক্রমণিকা
এই কিবোর্ড সফটওয়ারটি ইংরেজী QWERTY কিবোর্ডের (ইউ.এস.এ লেআউট হিসেবে বহুল প্রচলিত এবং বাংলাদেশের সর্বত্র ব্যবহৃত) উপর ভিত্তি করে তৈরী। এখানে কিবোর্ড থেকে যেকোন কি প্রেস করা হলে সেই কি/অক্ষরটি কোন অক্ষর তা সনাক্ত করা হয়, পূর্বোক্ত অক্ষরের সাথে এর কোন সংযুক্তি হতে পারে নাকি তা বের করা হয় এবং সবশেষে সঠিক অক্ষরটি আউটপুট দেয়া হয়।

এই লেআউট ডেভেলপ করার সময় এটা মাথায় রাখা হয়েছে যে বাংলাদেশের বেশিরভাগ মানুষই ইংরেজী কিবোর্ডে বা ইংরেজী লেআউটে বাংলা লিখে থাকেন। একই সাথে বাংলা বর্ণের গঠনকেও মাথায় রেখে এটাকে তৈরী করা হয়েছে।

## এই লেআউট যেভাবে বাকিদের থেকে স্বতন্ত্র
 * স্বরবর্ণ টাইপ করার সময় সেটি -কার রূপে হবে (যেমন: ই-কার, আ-কার ইত্যাদি) নাকি পূর্ণরূপে হবে সেটি অটোমেটিক্যালি সনাক্ত করা হয়
 * সকল রকমের বাংলা বর্ণ লেখা সম্ভব
 * ফোনেটিক এবং ফিক্সড উভয় লেআউট হিসেবেই ব্যবহার করা সম্ভব

## Introduction [![Build+Test+Publish](https://github.com/AhmedMRaihan/rokeya-keyboard-layout/actions/workflows/build-and-deploy.yml/badge.svg)](https://github.com/AhmedMRaihan/rokeya-keyboard-layout/actions/workflows/build-and-deploy.yml)

This keyboard layout is based on QWERTY based English keyboard. The layout and the implementation code takes an input from keyboard, then check a valid combination with previously pressed keys and finally output the corresponding bangla letter typed.

This layout is developed keeping in mind that majority of bangladesh are accustomed to English layout keyboard so the layout reflect this layout. At the same time bangla language architecture are also taken care of when the codes are developed in this project.

Test here: [Rokeya Layout Demo](https://ahmedmraihan.github.io/rokeya-keyboard-layout/index.html)

## Local Development

First, install required libraries and start a http server using this command (You should have Python3 installed beforehand):
```bash
npm install
npm audit fix
python3 -m http.server 8080
```
Then, visit http://localhost:8080/index.html to test

## Appendix

* Supported browsers:
  * Google Chrome
  * Microsoft Edge
  * Mozilla Firefox

* Logo: [From Openclipart](https://openclipart.org/detail/240540/orange-squares-1)