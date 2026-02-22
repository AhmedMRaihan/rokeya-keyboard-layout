"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import styles from "@/src/components/home/ui.module.css";

import BuetDateUI from "@/src/components/home/buetDateUI";
import Footer from "@/src/components/common/footer";
import ManagedTextarea from "@/src/components/common/managedTextarea";

type componentProps = {
  keyboardLanguage: string;
}
type componentState = {
  currentLanguage: string;
}
class Home extends React.Component<componentProps, componentState> {
  constructor(props: componentProps) {
    super(props);
    this.state = {
      currentLanguage: "bn_BD",
    };
  }

  toggleLanguage() {
    this.setState({
      currentLanguage: this.state.currentLanguage === "bn_BD" ? "en_US" : "bn_BD",
    });
  }

  render() {
    return (
      <main className="main_content text-dark-black dark:text-light-grey m-4">
        <h2 className="text-lg font-semibold mb-4">
          নিচের টেক্সট-এরিয়া তে বাংলা লিখুন
          <label
            id="activeLanguageIndicator"
            className="langugage_switch_button bg-blue-100 dark:bg-blue-700 text-blue-700 dark:text-blue-100 px-2 py-1 rounded ml-2"
            onClick={ () => {this.toggleLanguage();} }
          >
            বাংলা
          </label>
          <a
            href="https://github.com/AhmedMRaihan/rokeya-keyboard-layout/actions"
            className="float-right"
          >
            <Image
              src="https://github.com/AhmedMRaihan/rokeya-keyboard-layout/actions/workflows/deployment.yml/badge.svg"
              alt="Build Status"
              className="inline-block"
              width={370}
              height={40}
            />
          </a>
        </h2>
        <ManagedTextarea 
          id="checkItOut"
          currentLanguage={this.state.currentLanguage}
          twClassList="w-full text-lg border border-gray-700 p-1 mr-1 font-inherit"
          rows={8}
          />
        <div className="user_instruction inline-block">
          <div className={`${styles.help_texts} float-left w-3/5 mr-[-4px]`}>
            <h2 className="text-lg font-semibold mb-4">সহায়ক তথ্যাবলী: </h2>
            <ul className="list-disc ml-4">
              <li>
                <strong>কি-ম্যাপ:</strong> প্রায় সকল বর্ণই ফোনেটিক স্টাইলের
                ইংরেজী বর্ণমালায় পাওয়া যাবে।
                <br />
                যেমন: কবুতর = k b u shift+t r, রংপুর = r shift+v p u r, মি = m
                i, মই = m I, সঙ্গীত = s x q g ii shift+t
              </li>
              <li>
                <strong>ব্যতিক্রম:</strong> হ=H, ঙ=x, ঞ=X, য়=y, ৎ=Z, ং=V, ঁ=B,
                ঃ=M, হসন্ত = q অথবা +, এবং য-ফলা = Y
              </li>
              <li>
                <strong>যুক্তাক্ষর লেখার নিয়ম:</strong> প্রথম বর্ণ, এরপরে হসন্ত
                (q অথবা প্লাস [+]) এবং তারপর দ্বিতীয় বর্ণ। যেমন: ক্স = k + s,
                ক্ত = k q T, হ্ম = H + m, হ্ন = H + n, ল্ক = l q k
              </li>
              <li>
                <strong>র-ফলা টাইপ করার নিয়ম:</strong> &quot;r(র) q(হসন্ত)
                বর্ণ&quot; এই ক্রমে টাইপ করুন। যেমন: র্ণ = r q N
              </li>
              <li>
                h চেপে{" "}
                <strong>স্বরবরর্ণের পূর্ন-রূপ ও কার-রূপে সুইচ করুন</strong>।
                যেমন: b i= বি এবং b i h= বই
              </li>
              <li>
                কোন <strong>বর্ণের নিচে এককভাবে হসন্ত টাইপ</strong> করতে হসন্ত
                (q অথবা +) চেপে h চাপুন। যেমন: ক্‌ন = k q h n
              </li>
              <li>
                টেক্সট এরিয়া-তে <strong>বাংলা অথবা ইংরেজীতে সুইচ</strong> করতে
                ctrl+m অথবা F9 চাপুন
              </li>
            </ul>
          </div>
          <div className="example_texts float-right w-2/5 mr-[-4px] text-justify">
            <h2 className="text-lg font-semibold mb-4">নিজে চেষ্টা করুন: </h2>
            <span>
              এই প্যারাগ্রাফটিতে সকল বাংলা বর্ণ রয়েছে। চেষ্টা করুন এই কিবোর্ড
              লেআউট দিয়ে:
            </span>
            <blockquote className="tracking-tight m-6">
              <p className="border-l-2 border-gray-700 pl-2">
                বর্ষামুখর দিন শেষে, ঊর্দ্ধপানে চেয়ে যখন আষাঢ়ে গল্প শোনাতে বসে
                ওসমান ভুঁইঞা, ঈষান কোণে তখন অন্ধকার মেঘের আড়ম্বর, সবুজে ঋদ্ধ
                বনভূমির নির্জনতা চিরে থেকে থেকে ঐরাবতের ডাক, মাটির উপর শুকনো
                পাতা ঝরে পড়ে ঔদাসীন্যে, এবং তারই ফাঁকে জমে থাকা ঢের পুরোনো গভীর
                দুঃখ হঠাৎ যেন বৃষ্টিতে ধুয়ে মুছে ধূসর জীবনে রঙধনু এনে দেয়।
              </p>
            </blockquote>
            <BuetDateUI />
          </div>
        </div>
        <Footer />
      </main>
    );
  }
}

export default Home;
