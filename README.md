#বাংলা
এই কিবোর্ড সফটওয়ারটি ইংরেজী QWERTY কিবোর্ডের (ইউ.এস.এ লেআউট হিসেবে বহুল প্রচলিত এবং বাংলাদেশের সর্বত্র ব্যবহৃত) উপর ভিত্তি করে তৈরী। এখানে কিবোর্ড থেকে যেকোন কি প্রেস করা হলে সেই কি/অক্ষরটি কোন অক্ষর তা সনাক্ত করা হয়, পূর্বোক্ত অক্ষরের সাথে এর কোন সংযুক্তি হতে পারে নাকি তা বের করা হয় এবং সবশেষে সঠিক অক্ষরটি আউটপুট দেয়া হয়।

এই লেআউট ডেভেলপ করার সময় এটা মাথায় রাখা হয়েছে যে বাংলাদেশের বেশিরভাগ মানুষই ইংরেজী কিবোর্ডে বা ইংরেজী লেআউটে বাংলা লিখে থাকেন। একই সাথে বাংলা বর্ণের গঠনকেও মাথায় রেখে এটাকে তৈরী করা হয়েছে।

##নামকরণ
**রোকেয়া কিবোর্ড লেআউট**: আমার জন্ম এবং বেড়ে উঠা যেখানে সেই রংপুর শহরের বিখ্যাত একজন মানুষ, মহীয়সী নারী বেগর রোকেয়া'র নামে এই কিবোর্ডটির নামকরণ করা হয়েছে

##এই লেআউট যেভাবে বাকিদের থেকে স্বতন্ত্র
 * স্বরবর্ণ টাইপ করার সময় সেটি -কার রূপে হবে (যেমন: ই-কার, আ-কার ইত্যাদি) নাকি পূর্ণরূপে হবে সেটি অটোমেটিক্যালি সনাক্ত করা হয়
 * সকল রকমের বাংলা বর্ণ লেখা সম্ভব
 * ফোনেটিক এবং ফিক্সড উভয় লেআউট হিসেবেই ব্যবহার করা সম্ভব

##অনলাইন ডেমো
[Rokeya Layout Demo](http://seoul.freehostia.com/)

#সহায়ক তথ্যাবলী
  * কি-ম্যাপ: প্রায় সকল বর্ণই ফোনেটিক স্টাইলের ইংরেজী বর্ণমালায় পাওয়া যাবে
  * ব্যতিক্রম: হ=H, ঙ=x, ঞ=X, য়=y, ৎ=Z, ং=V, ঁ=B, ঃ=M, হসন্ত = q অথবা +, এবং য-ফলা = Y
  * যুক্তাক্ষর লেখার নিয়ম: প্রথম বর্ণ, এরপরে হসন্ত (q অথবা প্লাস [+]) এবং তারপর দ্বিতীয় বর্ণ। যেমন: ক্স = k + s, ক্ত = k q T, হ্ম = H + m, হ্ন = H + n, ল্ক = l q k
  * র-ফলা টাইপ করার নিয়ম: "r(র) q(হসন্ত) বর্ণ" এই ক্রমে টাইপ করুন। যেমন: র্ণ = r q N0.
  * h চেপে স্বরবরর্ণের পূর্ন-রূপ ও কার-রূপে সুইচ করুন। যেমন: b i= বি এবং b i h= বই
  * কোন বর্ণের নিচে এককভাবে হসন্ত টাইপ করতে হসন্ত (q অথবা +) চেপে h চাপুন। যেমন: ক্‌ন = k q h n
  * কম্পিউটার থেকে বাংলা ও ইংরেজীতে সুইচ করতে ctrl+m অথবা F9 চাপুন
  

##টেক্সট ডেমো
এই প্যারাগ্রাফটিতে সকল বাংলা বর্ণ রয়েছে। চেষ্টা করুন এই কিবোর্ড লেআউট দিয়ে
> বর্ষামুখর দিন শেষে, ঊর্দ্ধপানে চেয়ে যখন আষাঢ়ে গল্প শোনাতে বসে ওসমান ভুঁইঞা, ঈষান কোণে তখন অন্ধকার মেঘের আড়ম্বর, সবুজে ঋদ্ধ বনভূমির নির্জনতা চিরে থেকে থেকে ঐরাবতের ডাক, মাটির উপর শুকনো পাতা ঝরে পড়ে ঔদাসীন্যে, এবং তারই ফাঁকে জমে থাকা ঢের পুরোনো গভীর দুঃখ হঠাৎ যেন বৃষ্টিতে ধুয়ে মুছে ধূসর জীবনে রঙধনু এনে দেয়। 


##সাইট অ্যাডমিনদের জন্যে: ব্যবহার নির্দেশিকা
প্রথমে স্ক্রিপ্টটি লোড করে নিন সাইটের HEAD এলিমেন্ট এর ভিতরে কোন এক জায়গায়:
```javascritpt
<script type="text/javascript" src="http://bangla-keyboard-layout.googlecode.com/svn/trunk/rokeya_layout-4.4.73.js"></script>
```
এরপরে যেই টেক্সটবক্সে রোকেয়া লেআউটের উপস্থিতি দেখতে চান, সেটার আইডি দিয়ে কল করুন:
```javascritpt
new banglaLayout("{ID-GOES-HERE}");
//যদি টুলটিপ দেখাতে চান, তাহলে উপরের লাইনের বদলের নিচের লাইনের মতো করে ফাংশন কল করুন:
new banglaLayout("{ID-GOES-HERE}").loadHelpTooltip();
```
যদি সকল টেক্সটবক্সে দেখতে চান তাহলে নিচের জেকুয়েরী কোডটা কল করুন:
```javascritpt
(function($){
try{
	var $textbox= $("input[type=text], textarea").not('[noBanglaText]');
	$textbox.each(function(index,valueOfElement){
	if(this.id == '')
	{
		this.id= Math.random();
	}
	new banglaLayout(this.id).loadHelpTooltip();
	});	
}catch(e){}
})(jQuery);
```
যদি কোন টেক্সটবক্সে রোকেয়া লেআউটের উপস্থিতি দেখতে না চান, তাহলে সেটার এইচটিএমএল কোডে নিচের অংশটি বসিয়ে দিন:
```html
noBanglaText='noBanglaText'
```

যেমন, 
বসানোর আগে: ```html<code language="html"><input type='text' id='1' /></code>```
বসানোর পরে: ```html<input type='text' id='1' noBanglaText='noBanglaText' /></code>```

#English
This keyboard layout is based on QWERTY based English keyboard. The layout and the implementation code takes an input from keyboard, then check a valid combination with previously pressed keys and finally output the corresponding bangla letter typed.

This layout is developed keeping in mind that majority of bangladesh are accustomed to English layout keyboard so the layout reflect this layout. At the same time bangla language architecture are also taken care of when the codes are developed in this project.

Online demo: [Rokeya Layout Demo](http://seoul.freehostia.com/)
