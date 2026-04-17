
// SENTINEL - Customer Review Intelligence Platform
// Hack Malenadu '26 | Full-Stack AI Review Analysis App
// Stack: React + Vite + Claude AI API + Recharts

import { useState, useCallback, useRef } from "react";
import {
  LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Cell, PieChart, Pie
} from "recharts";

// ─── Synthetic Dataset (200+ reviews, 3 product categories, seeded complaint trend) ───
const SYNTHETIC_REVIEWS = [
  // CATEGORY 1: SmartBlend Pro Juicer (reviews 1-80)
  // Normal period (1-50)
  { id:1, product:"SmartBlend Pro Juicer", date:"2024-01-02", text:"Absolutely love this juicer! Motor is super powerful, easy to clean, packaging was perfect.", rating:5, lang:"en" },
  { id:2, product:"SmartBlend Pro Juicer", date:"2024-01-04", text:"Battery life is incredible lasts all week on single charge. Very durable build quality.", rating:5, lang:"en" },
  { id:3, product:"SmartBlend Pro Juicer", date:"2024-01-05", text:"Bahut acha product hai, delivery bhi fast thi. Motor strong hai.", rating:4, lang:"hi" },
  { id:4, product:"SmartBlend Pro Juicer", date:"2024-01-06", text:"Good juicer overall. Customer support was helpful when I had questions.", rating:4, lang:"en" },
  { id:5, product:"SmartBlend Pro Juicer", date:"2024-01-07", text:"Motor power is outstanding juice quality excellent no complaints", rating:5, lang:"en" },
  { id:6, product:"SmartBlend Pro Juicer", date:"2024-01-08", text:"Delivery was fast, product looks premium. Easy to assemble.", rating:4, lang:"en" },
  { id:7, product:"SmartBlend Pro Juicer", date:"2024-01-09", text:"Works amazingly well!! The blade durability is top notch 👍👍", rating:5, lang:"en" },
  { id:8, product:"SmartBlend Pro Juicer", date:"2024-01-10", text:"Motor runs smooth and quiet. Packaging was secure no damage.", rating:4, lang:"en" },
  { id:9, product:"SmartBlend Pro Juicer", date:"2024-01-11", text:"Tik tok se dekha tha, bought it, totally worth it! Easy cleaning feature ❤️", rating:5, lang:"en" },
  { id:10, product:"SmartBlend Pro Juicer", date:"2024-01-12", text:"Motor is good but plastic feels slightly cheap. Overall satisfied.", rating:3, lang:"en" },
  { id:11, product:"SmartBlend Pro Juicer", date:"2024-01-13", text:"Perfect for morning routine. Durability seems solid after 2 weeks.", rating:5, lang:"en" },
  { id:12, product:"SmartBlend Pro Juicer", date:"2024-01-14", text:"Best purchase this year. Motor power and ease of use top class.", rating:5, lang:"en" },
  { id:13, product:"SmartBlend Pro Juicer", date:"2024-01-15", text:"Good product fast delivery customer support excellent 5 stars", rating:5, lang:"en" },
  { id:14, product:"SmartBlend Pro Juicer", date:"2024-01-16", text:"Accha hai lekin thoda noisy hai. Motor powerful toh hai.", rating:3, lang:"hi" },
  { id:15, product:"SmartBlend Pro Juicer", date:"2024-01-17", text:"Packaging intact delivery fast motor works great durable product", rating:4, lang:"en" },
  { id:16, product:"SmartBlend Pro Juicer", date:"2024-01-18", text:"Super impressed with blade quality and cleaning ease. Worth every penny!", rating:5, lang:"en" },
  { id:17, product:"SmartBlend Pro Juicer", date:"2024-01-19", text:"Value for money. Good motor power, nice packaging.", rating:4, lang:"en" },
  { id:18, product:"SmartBlend Pro Juicer", date:"2024-01-20", text:"Works like a charm. Delivery speed was excellent. Motor is quiet.", rating:5, lang:"en" },
  { id:19, product:"SmartBlend Pro Juicer", date:"2024-01-21", text:"Build quality is premium, motor powerful, packaging excellent", rating:5, lang:"en" },
  { id:20, product:"SmartBlend Pro Juicer", date:"2024-01-22", text:"Not bad. Motor seems ok. Packaging was a bit dented though.", rating:3, lang:"en" },
  { id:21, product:"SmartBlend Pro Juicer", date:"2024-01-23", text:"Solid product. Motor quiet, durable, easy clean feature works.", rating:4, lang:"en" },
  { id:22, product:"SmartBlend Pro Juicer", date:"2024-01-24", text:"Good motor powerful delivery fast 5 stars recommend to all friends", rating:5, lang:"en" },
  { id:23, product:"SmartBlend Pro Juicer", date:"2024-01-25", text:"Bahut badiya product! Delivery same day ayi. Motor ekdum powerful.", rating:5, lang:"hi" },
  { id:24, product:"SmartBlend Pro Juicer", date:"2024-01-26", text:"Juicer motor power excellent, easy to clean, no noise issues.", rating:5, lang:"en" },
  { id:25, product:"SmartBlend Pro Juicer", date:"2024-01-27", text:"Fast delivery secure packaging motor smooth running five star", rating:5, lang:"en" },
  // SEEDED EMERGING COMPLAINT: Packaging complaints surge in reviews 26-80
  { id:26, product:"SmartBlend Pro Juicer", date:"2024-02-01", text:"Motor fine but packaging was TERRIBLE box completely crushed on delivery 😤", rating:2, lang:"en" },
  { id:27, product:"SmartBlend Pro Juicer", date:"2024-02-02", text:"Product ok but the packaging is very bad, juicer corner damaged.", rating:2, lang:"en" },
  { id:28, product:"SmartBlend Pro Juicer", date:"2024-02-03", text:"Motor strong but pakaging was broken, bubble wrap nahi tha. Disappointing.", rating:2, lang:"hi" },
  { id:29, product:"SmartBlend Pro Juicer", date:"2024-02-04", text:"Packaging disaster!! Box arrived open and crushed. Motor works but very upset.", rating:1, lang:"en" },
  { id:30, product:"SmartBlend Pro Juicer", date:"2024-02-05", text:"Good motor but packaging quality is shocking. Got dented product.", rating:2, lang:"en" },
  { id:31, product:"SmartBlend Pro Juicer", date:"2024-02-06", text:"Motor excellent as advertised but packaging needs serious improvement.", rating:3, lang:"en" },
  { id:32, product:"SmartBlend Pro Juicer", date:"2024-02-07", text:"Why is the packaging so terrible now?? My last order was fine. Box crushed.", rating:2, lang:"en" },
  { id:33, product:"SmartBlend Pro Juicer", date:"2024-02-08", text:"Packaging broken, product scratched. Customer support was nice but packaging issue big.", rating:2, lang:"en" },
  { id:34, product:"SmartBlend Pro Juicer", date:"2024-02-09", text:"Love motor power but packaging was pathetic, no protection inside.", rating:2, lang:"en" },
  { id:35, product:"SmartBlend Pro Juicer", date:"2024-02-10", text:"Packaging bahut bura tha. Product ke upar scratch aa gaye. Motor theek hai.", rating:2, lang:"hi" },
  { id:36, product:"SmartBlend Pro Juicer", date:"2024-02-11", text:"This is the 3rd order, packaging getting worse each time. Motor still good though.", rating:2, lang:"en" },
  { id:37, product:"SmartBlend Pro Juicer", date:"2024-02-12", text:"Packaging destroyed, juicer has dent on side. Motor functional but unhappy.", rating:2, lang:"en" },
  { id:38, product:"SmartBlend Pro Juicer", date:"2024-02-13", text:"Quality juicer but PLEASE fix your packaging! Third complaint this week.", rating:2, lang:"en" },
  { id:39, product:"SmartBlend Pro Juicer", date:"2024-02-14", text:"Juicer itself great, easy clean, motor powerful but packaging absolutely awful.", rating:3, lang:"en" },
  { id:40, product:"SmartBlend Pro Juicer", date:"2024-02-15", text:"Packaging failure again. Box wet and torn. Motor running fine at least.", rating:2, lang:"en" },
  { id:41, product:"SmartBlend Pro Juicer", date:"2024-02-16", text:"Motor nice and powerful but packaging so bad, got scratched unit.", rating:2, lang:"en" },
  { id:42, product:"SmartBlend Pro Juicer", date:"2024-02-17", text:"Good product overall but packaging has been consistently bad recently.", rating:3, lang:"en" },
  { id:43, product:"SmartBlend Pro Juicer", date:"2024-02-18", text:"Motor works, durability seems ok, but PACKAGING IS AWFUL every single time!", rating:2, lang:"en" },
  { id:44, product:"SmartBlend Pro Juicer", date:"2024-02-19", text:"Super disappointed with packaging quality. Product dented on arrival.", rating:2, lang:"en" },
  { id:45, product:"SmartBlend Pro Juicer", date:"2024-02-20", text:"Same issue as everyone else - packaging crushed. Motor fine. Fix packaging!!", rating:2, lang:"en" },
  { id:46, product:"SmartBlend Pro Juicer", date:"2024-02-21", text:"Packaging bahut kharab hai bhai. Last 5 orders mein yahi problem.", rating:1, lang:"hi" },
  { id:47, product:"SmartBlend Pro Juicer", date:"2024-02-22", text:"Juicer performance great, customer support helpful, but packaging needs urgent fix.", rating:3, lang:"en" },
  { id:48, product:"SmartBlend Pro Juicer", date:"2024-02-23", text:"Motor excellent, easy clean, but packaging disaster. Dented corners.", rating:2, lang:"en" },
  { id:49, product:"SmartBlend Pro Juicer", date:"2024-02-24", text:"I ordered 2, BOTH came in terrible packaging. Motor works at least.", rating:2, lang:"en" },
  { id:50, product:"SmartBlend Pro Juicer", date:"2024-02-25", text:"Please fix packaging. Motor good, product good, just packaging terrible.", rating:2, lang:"en" },
  // More mixed reviews continuing the trend
  { id:51, product:"SmartBlend Pro Juicer", date:"2024-02-26", text:"Packaging still not fixed. Dented juicer again. Will not reorder.", rating:1, lang:"en" },
  { id:52, product:"SmartBlend Pro Juicer", date:"2024-02-27", text:"Why is packaging so bad? Motor is great though.", rating:2, lang:"en" },
  { id:53, product:"SmartBlend Pro Juicer", date:"2024-02-28", text:"Motor powerful easy clean durable good product happy customer", rating:5, lang:"en" },
  { id:54, product:"SmartBlend Pro Juicer", date:"2024-03-01", text:"Packaging broken again 3rd time same issue please resolve it", rating:1, lang:"en" },
  { id:55, product:"SmartBlend Pro Juicer", date:"2024-03-02", text:"Good motor but packaging sucks as everyone says.", rating:3, lang:"en" },
  { id:56, product:"SmartBlend Pro Juicer", date:"2024-03-03", text:"Packaging completely squashed. Motor fine. Very disappointed.", rating:2, lang:"en" },
  { id:57, product:"SmartBlend Pro Juicer", date:"2024-03-04", text:"Packaging issue continuing. Box wet and crushed on arrival.", rating:2, lang:"en" },
  { id:58, product:"SmartBlend Pro Juicer", date:"2024-03-05", text:"Motor super powerful five stars! Packaging was perfect this time!", rating:5, lang:"en" },
  { id:59, product:"SmartBlend Pro Juicer", date:"2024-03-06", text:"Packaging broken again same issue that everyone mentions.", rating:2, lang:"en" },
  { id:60, product:"SmartBlend Pro Juicer", date:"2024-03-07", text:"Really good juicer! Easy to clean, motor powerful, delivery fast.", rating:5, lang:"en" },
  { id:61, product:"SmartBlend Pro Juicer", date:"2024-03-08", text:"Packaging complaint still there. Dented corner on my unit.", rating:2, lang:"en" },
  { id:62, product:"SmartBlend Pro Juicer", date:"2024-03-09", text:"Packaging bahut bura. Motor acha hai. Please packaging thik karo.", rating:2, lang:"hi" },
  { id:63, product:"SmartBlend Pro Juicer", date:"2024-03-10", text:"Motor is excellent. Packaging was damaged on arrival but product works.", rating:3, lang:"en" },
  { id:64, product:"SmartBlend Pro Juicer", date:"2024-03-11", text:"Same packaging issue. Box crushed. Motor fine.", rating:2, lang:"en" },
  { id:65, product:"SmartBlend Pro Juicer", date:"2024-03-12", text:"Juicer is great! Motor powerful, easy clean, durable. Happy!", rating:5, lang:"en" },
  { id:66, product:"SmartBlend Pro Juicer", date:"2024-03-13", text:"Packaging still broken. Will contact customer support again.", rating:2, lang:"en" },
  { id:67, product:"SmartBlend Pro Juicer", date:"2024-03-14", text:"Motor works fine, packaging was not great but usable product.", rating:3, lang:"en" },
  { id:68, product:"SmartBlend Pro Juicer", date:"2024-03-15", text:"Another crushed packaging. This is a systemic issue clearly.", rating:1, lang:"en" },
  { id:69, product:"SmartBlend Pro Juicer", date:"2024-03-16", text:"Packaging not ok, motor excellent. Mixed feelings.", rating:3, lang:"en" },
  { id:70, product:"SmartBlend Pro Juicer", date:"2024-03-17", text:"Worst packaging ever but motor is solid. Fix the packaging!", rating:2, lang:"en" },
  { id:71, product:"SmartBlend Pro Juicer", date:"2024-03-18", text:"Motor great performance 5 stars. No packaging issues this time.", rating:5, lang:"en" },
  { id:72, product:"SmartBlend Pro Juicer", date:"2024-03-19", text:"Packaging complaint: box arrived in terrible condition. Motor functional.", rating:2, lang:"en" },
  { id:73, product:"SmartBlend Pro Juicer", date:"2024-03-20", text:"Packaging is really bad lately. I've seen many same complaints here.", rating:2, lang:"en" },
  { id:74, product:"SmartBlend Pro Juicer", date:"2024-03-21", text:"Motor powerful, easy clean. Packaging was a bit damaged but usable.", rating:3, lang:"en" },
  { id:75, product:"SmartBlend Pro Juicer", date:"2024-03-22", text:"Packaging damaged again. Seems like batch issue. Motor ok.", rating:2, lang:"en" },
  { id:76, product:"SmartBlend Pro Juicer", date:"2024-03-23", text:"Excellent motor and easy cleaning but packaging issue persists!", rating:3, lang:"en" },
  { id:77, product:"SmartBlend Pro Juicer", date:"2024-03-24", text:"Packaging bahut kharab, motor strong hai, 2 star only for packaging.", rating:2, lang:"hi" },
  { id:78, product:"SmartBlend Pro Juicer", date:"2024-03-25", text:"Motor great durability great but packaging is a disaster zone!", rating:3, lang:"en" },
  { id:79, product:"SmartBlend Pro Juicer", date:"2024-03-26", text:"Packaging still crushed. Been 2 months of same complaints. Ridiculous.", rating:1, lang:"en" },
  { id:80, product:"SmartBlend Pro Juicer", date:"2024-03-27", text:"Motor excellent! Easy clean! Packaging was fine this delivery 😊", rating:5, lang:"en" },

  // CATEGORY 2: NutriMax Protein Powder (reviews 81-150)
  { id:81, product:"NutriMax Protein Powder", date:"2024-01-03", text:"Best protein powder I've tried! Taste is amazing, mixes well no lumps.", rating:5, lang:"en" },
  { id:82, product:"NutriMax Protein Powder", date:"2024-01-05", text:"Good taste but packaging seal was broken on arrival. Quality concern.", rating:3, lang:"en" },
  { id:83, product:"NutriMax Protein Powder", date:"2024-01-07", text:"Taste bahut acha hai. Delivery fast, packaging sealed properly.", rating:5, lang:"hi" },
  { id:84, product:"NutriMax Protein Powder", date:"2024-01-09", text:"Protein content as advertised. Taste excellent, easy to mix.", rating:5, lang:"en" },
  { id:85, product:"NutriMax Protein Powder", date:"2024-01-11", text:"Not sure if this is genuine product. Taste seems different than before 🤔", rating:3, lang:"en" },
  { id:86, product:"NutriMax Protein Powder", date:"2024-01-13", text:"Great taste and consistency. No lumps, mixes instantly. Love it!", rating:5, lang:"en" },
  { id:87, product:"NutriMax Protein Powder", date:"2024-01-15", text:"Taste good delivery fast packaging intact. Would recommend.", rating:4, lang:"en" },
  { id:88, product:"NutriMax Protein Powder", date:"2024-01-17", text:"This is not genuine product!! Taste completely different from before.", rating:1, lang:"en" },
  { id:89, product:"NutriMax Protein Powder", date:"2024-01-19", text:"Taste great, muscle recovery noticeable. Happy with purchase.", rating:5, lang:"en" },
  { id:90, product:"NutriMax Protein Powder", date:"2024-01-21", text:"Mixes well no lumps, taste is great. Delivery was fast.", rating:4, lang:"en" },
  { id:91, product:"NutriMax Protein Powder", date:"2024-01-23", text:"Excellent taste and texture. Delivery was quick, packaging secure.", rating:5, lang:"en" },
  { id:92, product:"NutriMax Protein Powder", date:"2024-01-25", text:"Protein tastes amazing best I've had in years. Mix ratio perfect.", rating:5, lang:"en" },
  { id:93, product:"NutriMax Protein Powder", date:"2024-01-27", text:"Taste acha hai, protein content sahi hai, delivery bhi fast thi.", rating:4, lang:"hi" },
  { id:94, product:"NutriMax Protein Powder", date:"2024-01-29", text:"Good product taste and texture is fine. Packaging was slightly damaged.", rating:3, lang:"en" },
  { id:95, product:"NutriMax Protein Powder", date:"2024-01-31", text:"Amazing taste!! Great protein content, no digestive issues whatsoever.", rating:5, lang:"en" },
  { id:96, product:"NutriMax Protein Powder", date:"2024-02-02", text:"Taste excellent as always, delivery was prompt and packaging sealed.", rating:5, lang:"en" },
  { id:97, product:"NutriMax Protein Powder", date:"2024-02-04", text:"Tasty protein, no clumping, mixes well. Would buy again.", rating:5, lang:"en" },
  { id:98, product:"NutriMax Protein Powder", date:"2024-02-06", text:"Good taste delivery fast happy customer five star product", rating:5, lang:"en" },
  { id:99, product:"NutriMax Protein Powder", date:"2024-02-08", text:"Best protein supplement! Great taste, energy boost real, no side effects.", rating:5, lang:"en" },
  { id:100, product:"NutriMax Protein Powder", date:"2024-02-10", text:"Taste is good but this batch has a slightly different color. Authentic?", rating:3, lang:"en" },
  { id:101, product:"NutriMax Protein Powder", date:"2024-02-12", text:"Great taste, protein mix is smooth, packaging was perfect no issues.", rating:5, lang:"en" },
  { id:102, product:"NutriMax Protein Powder", date:"2024-02-14", text:"Taste amazing mixes instantly no lumps five stars all day", rating:5, lang:"en" },
  { id:103, product:"NutriMax Protein Powder", date:"2024-02-16", text:"Taste is ok. Delivery fast. Packaging sealed. Overall decent.", rating:4, lang:"en" },
  { id:104, product:"NutriMax Protein Powder", date:"2024-02-18", text:"Really good protein. Taste and consistency is wonderful.", rating:5, lang:"en" },
  { id:105, product:"NutriMax Protein Powder", date:"2024-02-20", text:"Taste excellent, packaging sealed, delivery quick. No complaints.", rating:5, lang:"en" },
  { id:106, product:"NutriMax Protein Powder", date:"2024-02-22", text:"Top protein powder. Taste great, muscle gains visible. Recommend!", rating:5, lang:"en" },
  { id:107, product:"NutriMax Protein Powder", date:"2024-02-24", text:"Taste good packaging intact delivery fast. Good product overall.", rating:4, lang:"en" },
  { id:108, product:"NutriMax Protein Powder", date:"2024-02-26", text:"Taste is slightly off this batch. Might be storage issue? Concerned.", rating:3, lang:"en" },
  { id:109, product:"NutriMax Protein Powder", date:"2024-02-28", text:"Excellent protein supplement. Great taste, fast delivery, secure packaging.", rating:5, lang:"en" },
  { id:110, product:"NutriMax Protein Powder", date:"2024-03-01", text:"Love this protein! Taste is spot on, mixes well every time.", rating:5, lang:"en" },
  { id:111, product:"NutriMax Protein Powder", date:"2024-03-03", text:"Protein powder is great. Taste wonderful, no side effects.", rating:5, lang:"en" },
  { id:112, product:"NutriMax Protein Powder", date:"2024-03-05", text:"Great taste delivery fast. Would definitely reorder. 5 stars.", rating:5, lang:"en" },
  { id:113, product:"NutriMax Protein Powder", date:"2024-03-07", text:"Taste badhiya hai, mix easily ho jata hai. Delivery bhi on time.", rating:5, lang:"hi" },
  { id:114, product:"NutriMax Protein Powder", date:"2024-03-09", text:"Good protein product. Taste and texture satisfactory. Packaging fine.", rating:4, lang:"en" },
  { id:115, product:"NutriMax Protein Powder", date:"2024-03-11", text:"Taste excellent, delivery fast. Overall very happy with purchase!", rating:5, lang:"en" },
  { id:116, product:"NutriMax Protein Powder", date:"2024-03-13", text:"Protein quality good taste great packaging sealed delivery good.", rating:4, lang:"en" },
  { id:117, product:"NutriMax Protein Powder", date:"2024-03-15", text:"Taste is amazing! No clumps, instant mix, great flavor. Buy it!", rating:5, lang:"en" },
  { id:118, product:"NutriMax Protein Powder", date:"2024-03-17", text:"Good protein supplement. Taste is fine, mix consistency good.", rating:4, lang:"en" },
  { id:119, product:"NutriMax Protein Powder", date:"2024-03-19", text:"Really great taste, fast delivery, proper sealing. Five stars!", rating:5, lang:"en" },
  { id:120, product:"NutriMax Protein Powder", date:"2024-03-21", text:"Love the taste. Mixes perfectly. Protein content legit. Happy buyer.", rating:5, lang:"en" },
  // Bot-like spam reviews (to be flagged)
  { id:121, product:"NutriMax Protein Powder", date:"2024-03-22", text:"Best product. Best product. Best product. Buy now best product.", rating:5, lang:"en", spam:true },
  { id:122, product:"NutriMax Protein Powder", date:"2024-03-22", text:"Best product. Best product. Best product. Buy now best product.", rating:5, lang:"en", spam:true },
  { id:123, product:"NutriMax Protein Powder", date:"2024-03-23", text:"Amazing buy it amazing buy it amazing buy it amazing buy it now", rating:5, lang:"en", spam:true },
  { id:124, product:"NutriMax Protein Powder", date:"2024-03-23", text:"Great taste great taste great taste great taste great taste great", rating:5, lang:"en", spam:true },
  { id:125, product:"NutriMax Protein Powder", date:"2024-03-24", text:"Taste is great delivery is fast packaging is good five stars yes", rating:5, lang:"en" },
  { id:126, product:"NutriMax Protein Powder", date:"2024-03-24", text:"Protein product good. No issue. Good packaging. Good delivery.", rating:4, lang:"en" },
  { id:127, product:"NutriMax Protein Powder", date:"2024-03-25", text:"Taste is very good mix instantly no lumps love this product.", rating:5, lang:"en" },
  { id:128, product:"NutriMax Protein Powder", date:"2024-03-25", text:"Delivery fast packaging sealed taste excellent five star product.", rating:5, lang:"en" },
  { id:129, product:"NutriMax Protein Powder", date:"2024-03-26", text:"Great protein supplement, great taste. Customer support helpful.", rating:5, lang:"en" },
  { id:130, product:"NutriMax Protein Powder", date:"2024-03-26", text:"Bahut badhiya protein hai. Taste zabardast, mix instantly ho jata.", rating:5, lang:"hi" },
  { id:131, product:"NutriMax Protein Powder", date:"2024-03-27", text:"Taste is wonderful, packaging is fine, delivery was quick.", rating:5, lang:"en" },
  { id:132, product:"NutriMax Protein Powder", date:"2024-03-27", text:"Love this protein so much. Great taste, great results.", rating:5, lang:"en" },
  { id:133, product:"NutriMax Protein Powder", date:"2024-03-28", text:"Taste amazing. No clumping. Delivery fast. Worth every rupee!", rating:5, lang:"en" },
  { id:134, product:"NutriMax Protein Powder", date:"2024-03-28", text:"Would this be genuine product? Taste slightly off but ok overall.", rating:3, lang:"en" },
  { id:135, product:"NutriMax Protein Powder", date:"2024-03-29", text:"Great protein. Taste and delivery both excellent. Recommend.", rating:5, lang:"en" },
  { id:136, product:"NutriMax Protein Powder", date:"2024-03-29", text:"Taste great delivery fast packaging secure. Five stars product.", rating:5, lang:"en" },
  { id:137, product:"NutriMax Protein Powder", date:"2024-03-30", text:"Protein supplement is amazing. Taste is perfect, no digestive issues.", rating:5, lang:"en" },
  { id:138, product:"NutriMax Protein Powder", date:"2024-03-30", text:"Really satisfied with taste and protein quality. Delivery was fast.", rating:5, lang:"en" },
  { id:139, product:"NutriMax Protein Powder", date:"2024-03-31", text:"Sarcastic review: oh wow AMAZING product, totally not over-priced 😒", rating:2, lang:"en", sarcasm:true },
  { id:140, product:"NutriMax Protein Powder", date:"2024-03-31", text:"Yeah right, 'best protein ever' sure 🙄 taste is mediocre at best", rating:2, lang:"en", sarcasm:true },
  { id:141, product:"NutriMax Protein Powder", date:"2024-04-01", text:"Taste great, fast delivery, packaging sealed. Happy purchase.", rating:5, lang:"en" },
  { id:142, product:"NutriMax Protein Powder", date:"2024-04-01", text:"Good product. Taste ok. Delivery ok. Packaging ok. Will buy again.", rating:4, lang:"en" },
  { id:143, product:"NutriMax Protein Powder", date:"2024-04-02", text:"Taste is excellent and delivery was very fast. Happy!", rating:5, lang:"en" },
  { id:144, product:"NutriMax Protein Powder", date:"2024-04-02", text:"Love NutriMax. Taste is the best on market. No compromise!", rating:5, lang:"en" },
  { id:145, product:"NutriMax Protein Powder", date:"2024-04-03", text:"Good overall. Taste decent, packaging fine, delivery adequate.", rating:4, lang:"en" },
  { id:146, product:"NutriMax Protein Powder", date:"2024-04-03", text:"Taste amazing protein content verified excellent product!", rating:5, lang:"en" },
  { id:147, product:"NutriMax Protein Powder", date:"2024-04-04", text:"Taste is very good, mixes well. Would buy again definitely.", rating:5, lang:"en" },
  { id:148, product:"NutriMax Protein Powder", date:"2024-04-04", text:"Great protein supplement. Taste perfect, delivery fast, packaging fine.", rating:5, lang:"en" },
  { id:149, product:"NutriMax Protein Powder", date:"2024-04-05", text:"Taste is good but price seems too high for this quality level.", rating:3, lang:"en" },
  { id:150, product:"NutriMax Protein Powder", date:"2024-04-05", text:"Excellent taste delivery fast packaging sealed. Five star product!", rating:5, lang:"en" },

  // CATEGORY 3: AuraGlow Face Serum (reviews 151-220)
  { id:151, product:"AuraGlow Face Serum", date:"2024-01-04", text:"Skin glow improved dramatically in 2 weeks. Texture is luxurious!", rating:5, lang:"en" },
  { id:152, product:"AuraGlow Face Serum", date:"2024-01-06", text:"Good serum but delivery took 2 weeks which is too long.", rating:3, lang:"en" },
  { id:153, product:"AuraGlow Face Serum", date:"2024-01-08", text:"Bahut acha serum! Skin glow aayi. Delivery fast thi.", rating:5, lang:"hi" },
  { id:154, product:"AuraGlow Face Serum", date:"2024-01-10", text:"Texture amazing, skin feels hydrated, delivery was quick.", rating:5, lang:"en" },
  { id:155, product:"AuraGlow Face Serum", date:"2024-01-12", text:"Skin texture improved. Minor complaint: delivery speed slow.", rating:4, lang:"en" },
  { id:156, product:"AuraGlow Face Serum", date:"2024-01-14", text:"This serum is magical! Skin glowing, pores reduced, texture smooth.", rating:5, lang:"en" },
  { id:157, product:"AuraGlow Face Serum", date:"2024-01-16", text:"Delivery was fast, packaging good, serum seems authentic. Good purchase.", rating:4, lang:"en" },
  { id:158, product:"AuraGlow Face Serum", date:"2024-01-18", text:"Skin glow visible in week 1. Texture rich. Delivery fast. Love it!", rating:5, lang:"en" },
  { id:159, product:"AuraGlow Face Serum", date:"2024-01-20", text:"Serum is good but delivery speed disappointing, 10 days for delivery.", rating:3, lang:"en" },
  { id:160, product:"AuraGlow Face Serum", date:"2024-01-22", text:"Love the skin glow effect! Texture is silky smooth. Packaging premium.", rating:5, lang:"en" },
  { id:161, product:"AuraGlow Face Serum", date:"2024-01-24", text:"Good serum, skin improved. Delivery was ok speed.", rating:4, lang:"en" },
  { id:162, product:"AuraGlow Face Serum", date:"2024-01-26", text:"Amazing skin results! Glow is real, texture luxurious. Fast delivery.", rating:5, lang:"en" },
  { id:163, product:"AuraGlow Face Serum", date:"2024-01-28", text:"Serum works but had an allergic reaction. Skin irritation after use.", rating:2, lang:"en" },
  { id:164, product:"AuraGlow Face Serum", date:"2024-01-30", text:"Skin texture improved. Glow visible. Delivery fast. Happy purchase!", rating:5, lang:"en" },
  { id:165, product:"AuraGlow Face Serum", date:"2024-02-01", text:"Serum quality excellent, skin glow improved, packaging premium quality.", rating:5, lang:"en" },
  { id:166, product:"AuraGlow Face Serum", date:"2024-02-03", text:"Amazing product. Skin glow amazing. Delivery fast. Packaging intact.", rating:5, lang:"en" },
  { id:167, product:"AuraGlow Face Serum", date:"2024-02-05", text:"Delivery speed issue, took 12 days. Serum quality however is amazing.", rating:3, lang:"en" },
  { id:168, product:"AuraGlow Face Serum", date:"2024-02-07", text:"Love this serum! Skin texture and glow both improved significantly.", rating:5, lang:"en" },
  { id:169, product:"AuraGlow Face Serum", date:"2024-02-09", text:"Skin glow real, texture smooth, delivery fast, customer support nice.", rating:5, lang:"en" },
  { id:170, product:"AuraGlow Face Serum", date:"2024-02-11", text:"Serum good for skin glow. Delivery ok. Packaging a bit basic.", rating:4, lang:"en" },
  { id:171, product:"AuraGlow Face Serum", date:"2024-02-13", text:"Skin glow ayi hai ekdum! Delivery fast. Packaging bhi acha tha.", rating:5, lang:"hi" },
  { id:172, product:"AuraGlow Face Serum", date:"2024-02-15", text:"Skin texture dramatically improved! Glow visible from day 5. Amazing!", rating:5, lang:"en" },
  { id:173, product:"AuraGlow Face Serum", date:"2024-02-17", text:"Good serum. Skin glow improved. Delivery was satisfactory.", rating:4, lang:"en" },
  { id:174, product:"AuraGlow Face Serum", date:"2024-02-19", text:"Serum is excellent. Skin transformation visible. Packaging premium.", rating:5, lang:"en" },
  { id:175, product:"AuraGlow Face Serum", date:"2024-02-21", text:"Glow is real! Texture improved a lot. Happy with this purchase!", rating:5, lang:"en" },
  { id:176, product:"AuraGlow Face Serum", date:"2024-02-23", text:"Love it! Skin glow amazing, delivery fast, packaging premium.", rating:5, lang:"en" },
  { id:177, product:"AuraGlow Face Serum", date:"2024-02-25", text:"Serum texture amazing, glow real, customer support helpful.", rating:5, lang:"en" },
  { id:178, product:"AuraGlow Face Serum", date:"2024-02-27", text:"Good product overall. Skin glow visible after consistent use.", rating:4, lang:"en" },
  { id:179, product:"AuraGlow Face Serum", date:"2024-02-29", text:"Love skin glow effect! Delivery fast, packaging premium. Five stars.", rating:5, lang:"en" },
  { id:180, product:"AuraGlow Face Serum", date:"2024-03-02", text:"Skin glow is real. Texture smooth. Delivery was fast and packaging intact.", rating:5, lang:"en" },
  { id:181, product:"AuraGlow Face Serum", date:"2024-03-04", text:"Excellent serum! Skin texture and glow both dramatically improved!", rating:5, lang:"en" },
  { id:182, product:"AuraGlow Face Serum", date:"2024-03-06", text:"Serum is good, skin glow visible. Minor issue with delivery speed.", rating:4, lang:"en" },
  { id:183, product:"AuraGlow Face Serum", date:"2024-03-08", text:"Great product for skin glow! Texture luxurious. Delivery was quick.", rating:5, lang:"en" },
  { id:184, product:"AuraGlow Face Serum", date:"2024-03-10", text:"Skin glow improved! Delivery fast! Packaging sealed and premium!", rating:5, lang:"en" },
  { id:185, product:"AuraGlow Face Serum", date:"2024-03-12", text:"Serum works. Skin texture improved visibly. Delivery was quick.", rating:5, lang:"en" },
  { id:186, product:"AuraGlow Face Serum", date:"2024-03-14", text:"Delivery too slow, 14 days! Serum quality good but delivery is issue.", rating:3, lang:"en" },
  { id:187, product:"AuraGlow Face Serum", date:"2024-03-16", text:"Excellent serum. Glow real, texture perfect. Delivery and packaging good.", rating:5, lang:"en" },
  { id:188, product:"AuraGlow Face Serum", date:"2024-03-18", text:"Skin glow amaaaazing! Love this serum so much 💕💕💕", rating:5, lang:"en" },
  { id:189, product:"AuraGlow Face Serum", date:"2024-03-20", text:"Serum is good. Skin glow improved. No issues with delivery.", rating:4, lang:"en" },
  { id:190, product:"AuraGlow Face Serum", date:"2024-03-22", text:"Love the glow effect! Texture luxurious, skin smoother than ever.", rating:5, lang:"en" },
  { id:191, product:"AuraGlow Face Serum", date:"2024-03-24", text:"Skin glow improved dramatically. Texture lovely. Delivery quick.", rating:5, lang:"en" },
  { id:192, product:"AuraGlow Face Serum", date:"2024-03-26", text:"Good serum, delivery was ok, packaging fine, skin showing improvement.", rating:4, lang:"en" },
  { id:193, product:"AuraGlow Face Serum", date:"2024-03-28", text:"Serum quality excellent, glow real, delivery fast, would recommend!", rating:5, lang:"en" },
  { id:194, product:"AuraGlow Face Serum", date:"2024-03-30", text:"Skin glow is beautiful! Texture creamy, delivery fast, packaging sealed.", rating:5, lang:"en" },
  { id:195, product:"AuraGlow Face Serum", date:"2024-04-01", text:"Amazing serum for skin glow. Delivery fast. Packaging good. Happy!", rating:5, lang:"en" },
  { id:196, product:"AuraGlow Face Serum", date:"2024-04-02", text:"Serum works great for glow. Texture nice. Customer support excellent.", rating:5, lang:"en" },
  { id:197, product:"AuraGlow Face Serum", date:"2024-04-03", text:"Skin glow and texture improved. Delivery speed was fine this time.", rating:5, lang:"en" },
  { id:198, product:"AuraGlow Face Serum", date:"2024-04-04", text:"Excellent product serum glow texture all perfect five stars!", rating:5, lang:"en" },
  { id:199, product:"AuraGlow Face Serum", date:"2024-04-05", text:"Best serum ever! Skin looks amazing! Delivery fast! Love it! 🌟", rating:5, lang:"en" },
  { id:200, product:"AuraGlow Face Serum", date:"2024-04-05", text:"Serum nice, skin glow improved, delivery fast, packaging premium quality.", rating:5, lang:"en" },
  { id:201, product:"AuraGlow Face Serum", date:"2024-04-06", text:"Skin glow real!! Texture amazing! Delivery fast! Best serum market!", rating:5, lang:"en" },
  { id:202, product:"AuraGlow Face Serum", date:"2024-04-06", text:"Good serum. Delivery was quick. Skin texture seems improved.", rating:4, lang:"en" },
  { id:203, product:"AuraGlow Face Serum", date:"2024-04-07", text:"Packaging premium, delivery fast, skin glow wow what a product!", rating:5, lang:"en" },
  { id:204, product:"AuraGlow Face Serum", date:"2024-04-07", text:"Serum excellent. Skin glow texture everything perfect. Recommend all!", rating:5, lang:"en" },
  { id:205, product:"AuraGlow Face Serum", date:"2024-04-08", text:"Skin glow amazing, delivery fast, packaging premium. Five stars!", rating:5, lang:"en" },
];

// ─── Feature extraction keywords ───
const FEATURE_KEYWORDS = {
  packaging: ["packaging","package","box","wrap","bubble","crush","dent","seal","arrived","damage"],
  motor_power: ["motor","power","powerful","engine","speed","rpm","performance"],
  durability: ["durable","durability","build","quality","sturdy","strong","last","long"],
  ease_of_use: ["easy","simple","clean","wash","assemble","use","user"],
  delivery: ["delivery","fast","quick","slow","ship","dispatch","days","arrived"],
  taste: ["taste","flavor","flavour","delicious","yummy","good taste","bad taste"],
  texture: ["texture","smooth","rough","consistency","feel","silky","creamy"],
  skin_glow: ["glow","radiant","bright","skin","face","complexion","radiance"],
  customer_support: ["support","customer service","help","response","helpful","team"],
  value: ["price","value","worth","money","expensive","cheap","cost"],
};

const SENTIMENT_WORDS = {
  positive: ["great","good","excellent","amazing","wonderful","best","love","perfect","fantastic","superb","nice","awesome","outstanding","top","happy","satisfied","impressed","brilliant","quality","fast","quick","smooth","clean","easy","powerful","effective","works","proper","strong","premium","luxury","instant","beautiful","magical","dramatic"],
  negative: ["bad","terrible","worst","poor","broken","crushed","damaged","wrong","issue","problem","complaint","disappoint","awful","pathetic","disaster","horrible","sucks","never","hate","inferior","fake","counterfeit","slow","dent","scratch","fail","defect"],
};

// ─── Core Analysis Engine ───
function detectLanguage(text) {
  const hindiPattern = /[\u0900-\u097F]/;
  if (hindiPattern.test(text)) return "hi";
  const hinglishWords = ["hai","bhi","bahut","acha","thi","ayi","mein","se","ka","ki","nahi","tha","ekdum","zabardast","badhiya","badiya","kharab","theek","bilkul","bohot"];
  const words = text.toLowerCase().split(/\s+/);
  const hinglishCount = words.filter(w => hinglishWords.includes(w)).length;
  return hinglishCount >= 2 ? "hi-en" : "en";
}

function detectSpam(review) {
  const text = review.text.toLowerCase();
  const words = text.split(/\s+/);
  const uniqueRatio = new Set(words).size / words.length;
  if (uniqueRatio < 0.5 && words.length > 8) return true;
  const repetitions = words.filter((w, i) => words.indexOf(w) !== i).length;
  if (repetitions > words.length * 0.4) return true;
  return false;
}

function detectSarcasm(text) {
  const sarcasmPatterns = [/not.*over.?pric/i, /sure\s*🙄/i, /yeah right/i, /totally.*not/i, /oh wow.*amazing/i, /\bsure\b.*\bmediocre\b/i];
  return sarcasmPatterns.some(p => p.test(text));
}

function extractFeatureSentiment(text) {
  const lowerText = text.toLowerCase();
  const result = {};
  for (const [feature, keywords] of Object.entries(FEATURE_KEYWORDS)) {
    const matched = keywords.some(k => lowerText.includes(k));
    if (!matched) continue;
    let score = 0;
    let count = 0;
    const positiveCount = SENTIMENT_WORDS.positive.filter(w => lowerText.includes(w)).length;
    const negativeCount = SENTIMENT_WORDS.negative.filter(w => lowerText.includes(w)).length;
    score = (positiveCount - negativeCount);
    const confidence = Math.min(0.95, 0.5 + Math.abs(score) * 0.1 + (matched ? 0.2 : 0));
    result[feature] = {
      sentiment: score > 0 ? "positive" : score < 0 ? "negative" : "neutral",
      score: Math.max(-1, Math.min(1, score / 3)),
      confidence: parseFloat(confidence.toFixed(2)),
    };
  }
  return result;
}

function analyzeReviews(reviews) {
  const processed = reviews.map(r => {
    const isSpam = detectSpam(r);
    const isSarcasm = detectSarcasm(r.text);
    const lang = detectLanguage(r.text);
    const features = extractFeatureSentiment(r.text);
    const overallSentiment = r.rating >= 4 ? "positive" : r.rating <= 2 ? "negative" : "neutral";
    return { ...r, isSpam, isSarcasm, lang, features, overallSentiment, flagged: isSpam || isSarcasm };
  });

  // Deduplication
  const seen = new Set();
  const deduped = processed.filter(r => {
    const key = r.text.toLowerCase().replace(/\s+/g, " ").trim().substring(0, 60);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return deduped;
}

function detectTrends(reviews, product) {
  const productReviews = reviews.filter(r => r.product === product && !r.flagged);
  if (productReviews.length < 10) return [];

  const mid = Math.floor(productReviews.length / 2);
  const firstHalf = productReviews.slice(0, mid);
  const secondHalf = productReviews.slice(mid);

  const trends = [];
  for (const feature of Object.keys(FEATURE_KEYWORDS)) {
    const countMentions = (batch) => batch.filter(r => r.features[feature]).length;
    const countNegative = (batch) => batch.filter(r => r.features[feature]?.sentiment === "negative").length;

    const firstMentions = countMentions(firstHalf);
    const secondMentions = countMentions(secondHalf);
    const firstNeg = firstMentions > 0 ? countNegative(firstHalf) / firstMentions : 0;
    const secondNeg = secondMentions > 0 ? countNegative(secondHalf) / secondMentions : 0;

    if (secondNeg - firstNeg > 0.2 && secondMentions >= 3) {
      trends.push({
        feature,
        type: "emerging_complaint",
        severity: secondNeg - firstNeg > 0.5 ? "critical" : "warning",
        firstPct: Math.round(firstNeg * 100),
        secondPct: Math.round(secondNeg * 100),
        message: `⚠️ ${feature.replace(/_/g," ")} complaints rose from ${Math.round(firstNeg*100)}% → ${Math.round(secondNeg*100)}% in recent reviews`,
        count: countNegative(secondHalf),
        total: secondMentions,
      });
    }

    const firstPos = firstMentions > 0 ? (firstMentions - countNegative(firstHalf)) / firstMentions : 0;
    const secondPos = secondMentions > 0 ? (secondMentions - countNegative(secondHalf)) / secondMentions : 0;
    if (secondPos - firstPos > 0.25 && secondMentions >= 3) {
      trends.push({
        feature,
        type: "emerging_praise",
        severity: "positive",
        firstPct: Math.round(firstPos * 100),
        secondPct: Math.round(secondPos * 100),
        message: `✅ ${feature.replace(/_/g," ")} praise rose from ${Math.round(firstPos*100)}% → ${Math.round(secondPos*100)}%`,
        count: secondMentions - countNegative(secondHalf),
        total: secondMentions,
      });
    }
  }
  return trends;
}

function generateRecommendations(reviews, product) {
  const trends = detectTrends(reviews, product);
  const recs = [];
  trends.filter(t => t.type === "emerging_complaint").forEach(t => {
    const featureName = t.feature.replace(/_/g, " ");
    if (t.severity === "critical") {
      recs.push({ priority: "🔴 URGENT", action: `Immediate investigation required: ${featureName} failures affecting ${t.secondPct}% of recent reviews. Halt shipments from current batch if applicable.` });
    } else {
      recs.push({ priority: "🟡 HIGH", action: `Review ${featureName} process — complaint rate increased by ${t.secondPct - t.firstPct}%. Assign QA team within 48 hours.` });
    }
  });
  const spamCount = reviews.filter(r => r.product === product && r.isSpam).length;
  if (spamCount > 2) {
    recs.push({ priority: "🟠 MEDIUM", action: `${spamCount} suspected bot/spam reviews detected for ${product}. Report to platform moderation team.` });
  }
  const sarcasm = reviews.filter(r => r.product === product && r.isSarcasm).length;
  if (sarcasm > 0) {
    recs.push({ priority: "🔵 INFO", action: `${sarcasm} sarcastic/ambiguous reviews flagged for manual human review — these may mask genuine sentiment.` });
  }
  return recs;
}

// ─── Color palette ───
const COLORS = {
  bg: "#050A0E",
  bgCard: "#0D1117",
  bgCardAlt: "#0F1923",
  accent: "#00E5FF",
  accentGlow: "#00B8D9",
  positive: "#00E676",
  negative: "#FF1744",
  warning: "#FFD600",
  neutral: "#78909C",
  text: "#E0F2F1",
  textMuted: "#546E7A",
  border: "#1A2634",
};

const FEATURE_COLORS = ["#00E5FF","#00E676","#FFD600","#FF6D00","#B388FF","#FF80AB","#69F0AE","#FF5252","#40C4FF","#FFFF00"];

// ─── API Call to Claude ───
async function analyzeWithClaude(reviewText, productName) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: `You are a review intelligence analyst. Analyze this customer review for product "${productName}" and return ONLY valid JSON (no markdown, no preamble):

Review: "${reviewText}"

Return this exact JSON structure:
{
  "overall_sentiment": "positive|negative|neutral",
  "confidence": 0.0-1.0,
  "is_sarcastic": true|false,
  "is_spam": true|false,
  "language": "en|hi|hi-en|other",
  "features": {
    "feature_name": {"sentiment": "positive|negative|neutral", "confidence": 0.0-1.0}
  },
  "key_insight": "One sentence insight",
  "recommended_action": "One sentence action for the brand"
}`
      }]
    })
  });
  const data = await response.json();
  const text = data.content?.map(c => c.text || "").join("") || "{}";
  try {
    return JSON.parse(text.replace(/```json|```/g, "").trim());
  } catch { return null; }
}

// ─── Components ───

function StatCard({ label, value, sub, color, glow }) {
  return (
    <div style={{
      background: COLORS.bgCard,
      border: `1px solid ${color || COLORS.border}`,
      borderRadius: 12,
      padding: "20px 24px",
      boxShadow: glow ? `0 0 20px ${color}30` : "none",
      minWidth: 140,
      flex: 1,
    }}>
      <div style={{ fontSize: 32, fontWeight: 900, color: color || COLORS.accent, fontFamily: "monospace", letterSpacing: -1 }}>{value}</div>
      <div style={{ color: COLORS.text, fontSize: 13, fontWeight: 600, marginTop: 4 }}>{label}</div>
      {sub && <div style={{ color: COLORS.textMuted, fontSize: 11, marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function TrendBadge({ trend }) {
  const color = trend.severity === "critical" ? COLORS.negative : trend.severity === "warning" ? COLORS.warning : COLORS.positive;
  return (
    <div style={{
      background: `${color}15`,
      border: `1px solid ${color}50`,
      borderLeft: `4px solid ${color}`,
      borderRadius: 8,
      padding: "12px 16px",
      marginBottom: 8,
      boxShadow: `0 0 12px ${color}20`,
    }}>
      <div style={{ color, fontSize: 13, fontWeight: 700 }}>{trend.message}</div>
      <div style={{ color: COLORS.textMuted, fontSize: 11, marginTop: 4 }}>
        Affects {trend.count}/{trend.total} mentions in recent batch
        {trend.severity === "critical" && " — SYSTEMIC ISSUE DETECTED"}
      </div>
    </div>
  );
}

function ReviewCard({ review, index }) {
  const sentiment = review.overallSentiment;
  const color = sentiment === "positive" ? COLORS.positive : sentiment === "negative" ? COLORS.negative : COLORS.neutral;
  const features = Object.entries(review.features || {});
  return (
    <div style={{
      background: review.flagged ? `${COLORS.warning}08` : COLORS.bgCard,
      border: `1px solid ${review.flagged ? COLORS.warning : COLORS.border}`,
      borderRadius: 10,
      padding: "14px 16px",
      marginBottom: 8,
      opacity: review.isSpam ? 0.7 : 1,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <span style={{ background: `${color}20`, color, border: `1px solid ${color}`, borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>
            {sentiment.toUpperCase()}
          </span>
          {review.isSarcasm && <span style={{ background: "#FF6D0020", color: "#FF6D00", border: "1px solid #FF6D00", borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>SARCASM</span>}
          {review.isSpam && <span style={{ background: "#FF175420", color: COLORS.negative, border: `1px solid ${COLORS.negative}`, borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>SPAM/BOT</span>}
          {review.lang !== "en" && <span style={{ background: "#B388FF20", color: "#B388FF", border: "1px solid #B388FF", borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>{review.lang.toUpperCase()}</span>}
        </div>
        <div style={{ color: COLORS.textMuted, fontSize: 11 }}>{review.date} • ⭐ {review.rating}</div>
      </div>
      <div style={{ color: COLORS.text, fontSize: 13, lineHeight: 1.5, marginBottom: features.length ? 8 : 0 }}>{review.text}</div>
      {features.length > 0 && (
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4 }}>
          {features.map(([feat, data]) => (
            <span key={feat} style={{
              background: data.sentiment === "positive" ? `${COLORS.positive}15` : data.sentiment === "negative" ? `${COLORS.negative}15` : `${COLORS.neutral}15`,
              color: data.sentiment === "positive" ? COLORS.positive : data.sentiment === "negative" ? COLORS.negative : COLORS.neutral,
              borderRadius: 4,
              padding: "2px 8px", fontSize: 10, fontWeight: 600,
            }}>
              {feat.replace(/_/g," ")} {data.sentiment === "positive" ? "↑" : data.sentiment === "negative" ? "↓" : "–"}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main App ───
export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [selectedProduct, setSelectedProduct] = useState("SmartBlend Pro Juicer");
  const [customText, setCustomText] = useState("");
  const [claudeResult, setClaudeResult] = useState(null);
  const [claudeLoading, setClaudeLoading] = useState(false);
  const [uploadedReviews, setUploadedReviews] = useState([]);
  const [pastedText, setPastedText] = useState("");
  const fileInputRef = useRef();

  const allReviews = [...SYNTHETIC_REVIEWS, ...uploadedReviews];
  const analyzed = analyzeReviews(allReviews);
  const products = [...new Set(analyzed.map(r => r.product))];
  const productReviews = analyzed.filter(r => r.product === selectedProduct);
  const clean = productReviews.filter(r => !r.flagged);
  const trends = detectTrends(analyzed, selectedProduct);
  const recommendations = generateRecommendations(analyzed, selectedProduct);

  const avgRating = clean.length ? (clean.reduce((s, r) => s + r.rating, 0) / clean.length).toFixed(1) : 0;
  const positiveCount = clean.filter(r => r.overallSentiment === "positive").length;
  const negativeCount = clean.filter(r => r.overallSentiment === "negative").length;
  const flaggedCount = productReviews.filter(r => r.flagged).length;

  // Feature aggregation for charts
  const featureData = Object.keys(FEATURE_KEYWORDS).map(feat => {
    const mentions = clean.filter(r => r.features[feat]);
    const pos = mentions.filter(r => r.features[feat]?.sentiment === "positive").length;
    const neg = mentions.filter(r => r.features[feat]?.sentiment === "negative").length;
    return {
      feature: feat.replace(/_/g, " "),
      positive: pos,
      negative: neg,
      score: mentions.length ? ((pos - neg) / mentions.length * 100).toFixed(0) : 0,
      total: mentions.length,
    };
  }).filter(d => d.total > 0).sort((a, b) => b.total - a.total);

  // Trend timeline data
  const timelineData = (() => {
    const byDate = {};
    clean.forEach(r => {
      const week = r.date.substring(0, 7);
      if (!byDate[week]) byDate[week] = { month: week, positive: 0, negative: 0, neutral: 0, packaging_neg: 0 };
      byDate[week][r.overallSentiment]++;
      if (r.features?.packaging?.sentiment === "negative") byDate[week].packaging_neg++;
    });
    return Object.values(byDate).sort((a, b) => a.month.localeCompare(b.month));
  })();

  // Sentiment distribution pie
  const sentimentPie = [
    { name: "Positive", value: positiveCount, color: COLORS.positive },
    { name: "Negative", value: negativeCount, color: COLORS.negative },
    { name: "Neutral", value: clean.filter(r => r.overallSentiment === "neutral").length, color: COLORS.neutral },
  ];

  async function runClaudeAnalysis() {
    if (!customText.trim()) return;
    setClaudeLoading(true);
    setClaudeResult(null);
    try {
      const result = await analyzeWithClaude(customText, selectedProduct);
      setClaudeResult(result);
    } catch (e) {
      setClaudeResult({ error: "Analysis failed. Check API connectivity." });
    }
    setClaudeLoading(false);
  }

  function handleFileUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const text = ev.target.result;
        let parsed = [];
        if (file.name.endsWith(".json")) {
          parsed = JSON.parse(text);
        } else {
          // CSV parsing
          const lines = text.split("\n").filter(Boolean);
          const headers = lines[0].split(",").map(h => h.trim().replace(/"/g, ""));
          parsed = lines.slice(1).map((line, i) => {
            const vals = line.split(",").map(v => v.trim().replace(/"/g, ""));
            const obj = {};
            headers.forEach((h, j) => obj[h] = vals[j]);
            return {
              id: 9000 + i,
              product: obj.product || obj.Product || "Uploaded Product",
              date: obj.date || obj.Date || new Date().toISOString().slice(0, 10),
              text: obj.text || obj.review || obj.Review || obj.Text || "",
              rating: parseInt(obj.rating || obj.Rating || 3),
              lang: "en",
            };
          }).filter(r => r.text);
        }
        setUploadedReviews(parsed);
      } catch (err) {
        alert("Could not parse file. Ensure it's valid CSV or JSON.");
      }
    };
    reader.readAsText(file);
  }

  function handlePasteAdd() {
    if (!pastedText.trim()) return;
    const lines = pastedText.split("\n").filter(Boolean);
    const newReviews = lines.map((line, i) => ({
      id: 8000 + i,
      product: selectedProduct,
      date: new Date().toISOString().slice(0, 10),
      text: line.trim(),
      rating: 3,
      lang: "en",
    }));
    setUploadedReviews(prev => [...prev, ...newReviews]);
    setPastedText("");
  }

  const NAV = [
    { id: "dashboard", label: "📊 Dashboard" },
    { id: "reviews", label: "💬 Reviews" },
    { id: "trends", label: "📈 Trends" },
    { id: "ai", label: "🤖 AI Analyze" },
    { id: "ingest", label: "📥 Ingest" },
  ];

  const S = {
    app: { minHeight: "100vh", background: COLORS.bg, color: COLORS.text, fontFamily: "'JetBrains Mono', 'Fira Code', monospace" },
    header: { background: COLORS.bgCard, borderBottom: `1px solid ${COLORS.border}`, padding: "0 24px", display: "flex", alignItems: "center", gap: 20, height: 60 },
    logo: { color: COLORS.accent, fontSize: 18, fontWeight: 900, letterSpacing: 2, textShadow: `0 0 20px ${COLORS.accent}` },
    nav: { display: "flex", gap: 4, marginLeft: "auto" },
    navBtn: (active) => ({
      background: active ? `${COLORS.accent}20` : "transparent",
      color: active ? COLORS.accent : COLORS.textMuted,
      border: `1px solid ${active ? COLORS.accent : "transparent"}`,
      borderRadius: 6, padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer",
    }),
    productSel: { background: COLORS.bgCardAlt, border: `1px solid ${COLORS.accent}`, color: COLORS.accent, borderRadius: 8, padding: "6px 12px", fontSize: 12, fontWeight: 700, cursor: "pointer" },
    section: { padding: "24px", maxWidth: 1200, margin: "0 auto" },
    row: { display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" },
    card: { background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: 20, flex: 1, minWidth: 280 },
    cardTitle: { color: COLORS.accent, fontSize: 12, fontWeight: 900, letterSpacing: 2, marginBottom: 16, textTransform: "uppercase" },
    btn: { background: COLORS.accent, color: COLORS.bg, border: "none", borderRadius: 8, padding: "10px 20px", fontSize: 13, fontWeight: 800, cursor: "pointer" },
    textarea: { width: "100%", background: COLORS.bgCardAlt, border: `1px solid ${COLORS.border}`, color: COLORS.text, borderRadius: 8, padding: 12, fontSize: 13, minHeight: 100, resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" },
    input: { background: COLORS.bgCardAlt, border: `1px solid ${COLORS.border}`, color: COLORS.text, borderRadius: 8, padding: "8px 12px", fontSize: 13, fontFamily: "inherit" },
  };

  return (
    <div style={S.app}>
      {/* Header */}
      <div style={S.header}>
        <div style={S.logo}>⚡ SENTINEL</div>
        <div style={{ color: COLORS.textMuted, fontSize: 10, letterSpacing: 1 }}>REVIEW INTELLIGENCE PLATFORM</div>
        <select style={S.productSel} value={selectedProduct} onChange={e => setSelectedProduct(e.target.value)}>
          {products.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <nav style={S.nav}>
          {NAV.map(n => <button key={n.id} style={S.navBtn(tab === n.id)} onClick={() => setTab(n.id)}>{n.label}</button>)}
        </nav>
      </div>

      {/* DASHBOARD TAB */}
      {tab === "dashboard" && (
        <div style={S.section}>
          {/* KPI Row */}
          <div style={S.row}>
            <StatCard label="Total Reviews" value={productReviews.length} sub={`${flaggedCount} flagged`} color={COLORS.accent} glow />
            <StatCard label="Avg Rating" value={`${avgRating}★`} sub="clean reviews only" color={COLORS.warning} />
            <StatCard label="Positive" value={positiveCount} sub={`${Math.round(positiveCount/Math.max(clean.length,1)*100)}%`} color={COLORS.positive} glow />
            <StatCard label="Negative" value={negativeCount} sub={`${Math.round(negativeCount/Math.max(clean.length,1)*100)}%`} color={COLORS.negative} glow />
            <StatCard label="Flagged" value={flaggedCount} sub="spam + sarcasm" color={COLORS.warning} />
          </div>

          {/* Active Alerts */}
          {trends.filter(t => t.severity !== "positive").length > 0 && (
            <div style={{ ...S.card, marginBottom: 16, border: `1px solid ${COLORS.negative}50`, background: `${COLORS.negative}08` }}>
              <div style={{ ...S.cardTitle, color: COLORS.negative }}>🚨 ACTIVE ALERTS — {selectedProduct}</div>
              {trends.filter(t => t.severity !== "positive").map((t, i) => <TrendBadge key={i} trend={t} />)}
            </div>
          )}

          <div style={S.row}>
            {/* Sentiment Pie */}
            <div style={{ ...S.card, maxWidth: 320 }}>
              <div style={S.cardTitle}>Sentiment Split</div>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={sentimentPie} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" stroke="none">
                    {sentimentPie.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, color: COLORS.text }} />
                  <Legend formatter={(v) => <span style={{ color: COLORS.text, fontSize: 12 }}>{v}</span>} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Feature Scores */}
            <div style={S.card}>
              <div style={S.cardTitle}>Feature Sentiment Scores</div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={featureData.slice(0, 7)} barCategoryGap="30%">
                  <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                  <XAxis dataKey="feature" tick={{ fill: COLORS.textMuted, fontSize: 10 }} />
                  <YAxis tick={{ fill: COLORS.textMuted, fontSize: 10 }} />
                  <Tooltip contentStyle={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, color: COLORS.text }} />
                  <Bar dataKey="positive" fill={COLORS.positive} radius={[4,4,0,0]} />
                  <Bar dataKey="negative" fill={COLORS.negative} radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recommendations */}
          {recommendations.length > 0 && (
            <div style={S.card}>
              <div style={S.cardTitle}>🎯 Prioritized Recommendations</div>
              {recommendations.map((r, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: `1px solid ${COLORS.border}`, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 12, fontWeight: 900, minWidth: 90, color: COLORS.warning }}>{r.priority}</span>
                  <span style={{ color: COLORS.text, fontSize: 13, lineHeight: 1.5 }}>{r.action}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* REVIEWS TAB */}
      {tab === "reviews" && (
        <div style={S.section}>
          <div style={{ color: COLORS.textMuted, fontSize: 12, marginBottom: 16 }}>
            Showing {productReviews.length} reviews for <strong style={{ color: COLORS.accent }}>{selectedProduct}</strong> — {flaggedCount} flagged, {analyzed.filter(r => r.product === selectedProduct && r.isSpam).length} spam, {analyzed.filter(r => r.product === selectedProduct && r.isSarcasm).length} sarcasm
          </div>
          {productReviews.slice(0, 60).map((r, i) => <ReviewCard key={r.id} review={r} index={i} />)}
        </div>
      )}

      {/* TRENDS TAB */}
      {tab === "trends" && (
        <div style={S.section}>
          <div style={S.card}>
            <div style={S.cardTitle}>📈 Sentiment Over Time — {selectedProduct}</div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis dataKey="month" tick={{ fill: COLORS.textMuted, fontSize: 11 }} />
                <YAxis tick={{ fill: COLORS.textMuted, fontSize: 11 }} />
                <Tooltip contentStyle={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, color: COLORS.text }} />
                <Legend formatter={(v) => <span style={{ color: COLORS.text, fontSize: 12 }}>{v}</span>} />
                <Line type="monotone" dataKey="positive" stroke={COLORS.positive} strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="negative" stroke={COLORS.negative} strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="packaging_neg" stroke={COLORS.warning} strokeWidth={2} strokeDasharray="5 5" dot={{ r: 3 }} name="packaging complaints" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={{ ...S.card, marginTop: 16 }}>
            <div style={S.cardTitle}>🔎 Detected Trend Signals</div>
            {trends.length === 0 && <div style={{ color: COLORS.textMuted }}>No significant trends detected in current batch.</div>}
            {trends.map((t, i) => <TrendBadge key={i} trend={t} />)}
          </div>

          <div style={{ ...S.card, marginTop: 16 }}>
            <div style={S.cardTitle}>Feature Complaint vs Praise Distribution</div>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={featureData} layout="vertical" barCategoryGap="25%">
                <CartesianGrid strokeDasharray="3 3" stroke={COLORS.border} />
                <XAxis type="number" tick={{ fill: COLORS.textMuted, fontSize: 11 }} />
                <YAxis dataKey="feature" type="category" tick={{ fill: COLORS.textMuted, fontSize: 11 }} width={100} />
                <Tooltip contentStyle={{ background: COLORS.bgCard, border: `1px solid ${COLORS.border}`, borderRadius: 8, color: COLORS.text }} />
                <Bar dataKey="positive" fill={COLORS.positive} />
                <Bar dataKey="negative" fill={COLORS.negative} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* AI ANALYSIS TAB */}
      {tab === "ai" && (
        <div style={S.section}>
          <div style={S.card}>
            <div style={S.cardTitle}>🤖 Claude AI Deep Review Analysis</div>
            <p style={{ color: COLORS.textMuted, fontSize: 13, marginBottom: 16 }}>
              Paste any review text below. Claude AI will perform deep multilingual sentiment, sarcasm detection, feature extraction, and generate actionable brand intelligence.
            </p>
            <textarea
              style={S.textarea}
              placeholder="Paste a customer review here (supports English + Hindi/Hinglish)..."
              value={customText}
              onChange={e => setCustomText(e.target.value)}
            />
            <div style={{ display: "flex", gap: 12, marginTop: 12, alignItems: "center" }}>
              <button style={S.btn} onClick={runClaudeAnalysis} disabled={claudeLoading}>
                {claudeLoading ? "⏳ Analyzing..." : "🔍 Analyze with Claude AI"}
              </button>
              <span style={{ color: COLORS.textMuted, fontSize: 11 }}>Powered by Claude claude-sonnet-4-20250514</span>
            </div>

            {claudeResult && !claudeResult.error && (
              <div style={{ marginTop: 20, background: COLORS.bgCardAlt, borderRadius: 10, padding: 16, border: `1px solid ${COLORS.accent}30` }}>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
                  <span style={{ background: claudeResult.overall_sentiment === "positive" ? `${COLORS.positive}20` : `${COLORS.negative}20`, color: claudeResult.overall_sentiment === "positive" ? COLORS.positive : COLORS.negative, borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 800, border: `1px solid currentColor` }}>
                    {claudeResult.overall_sentiment?.toUpperCase()} • {Math.round((claudeResult.confidence || 0) * 100)}% confidence
                  </span>
                  {claudeResult.is_sarcastic && <span style={{ background: "#FF6D0020", color: "#FF6D00", borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 800, border: "1px solid #FF6D00" }}>⚠️ SARCASM DETECTED</span>}
                  {claudeResult.is_spam && <span style={{ background: `${COLORS.negative}20`, color: COLORS.negative, borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 800, border: `1px solid ${COLORS.negative}` }}>🤖 SPAM/BOT</span>}
                  <span style={{ background: "#B388FF20", color: "#B388FF", borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 800, border: "1px solid #B388FF" }}>Lang: {claudeResult.language?.toUpperCase()}</span>
                </div>
                {claudeResult.features && Object.keys(claudeResult.features).length > 0 && (
                  <div style={{ marginBottom: 12 }}>
                    <div style={{ color: COLORS.textMuted, fontSize: 11, marginBottom: 6, fontWeight: 700 }}>FEATURE BREAKDOWN</div>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {Object.entries(claudeResult.features).map(([feat, data]) => (
                        <span key={feat} style={{
                          background: data.sentiment === "positive" ? `${COLORS.positive}15` : `${COLORS.negative}15`,
                          color: data.sentiment === "positive" ? COLORS.positive : COLORS.negative,
                          border: `1px solid currentColor`, borderRadius: 6, padding: "4px 10px", fontSize: 11, fontWeight: 700,
                        }}>
                          {feat.replace(/_/g, " ")} {data.sentiment === "positive" ? "✓" : "✗"} ({Math.round((data.confidence||0)*100)}%)
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {claudeResult.key_insight && <div style={{ color: COLORS.text, fontSize: 13, padding: "10px", background: `${COLORS.accent}10`, borderRadius: 8, marginBottom: 8 }}>💡 {claudeResult.key_insight}</div>}
                {claudeResult.recommended_action && <div style={{ color: COLORS.positive, fontSize: 13, padding: "10px", background: `${COLORS.positive}10`, borderRadius: 8 }}>🎯 {claudeResult.recommended_action}</div>}
              </div>
            )}
            {claudeResult?.error && <div style={{ color: COLORS.negative, marginTop: 12 }}>{claudeResult.error}</div>}
          </div>
        </div>
      )}

      {/* INGEST TAB */}
      {tab === "ingest" && (
        <div style={S.section}>
          <div style={S.row}>
            <div style={S.card}>
              <div style={S.cardTitle}>📂 Upload CSV / JSON</div>
              <p style={{ color: COLORS.textMuted, fontSize: 13, marginBottom: 16 }}>
                Upload a CSV with columns: <code style={{ color: COLORS.accent }}>product, date, text, rating</code> or a JSON array of review objects.
              </p>
              <input type="file" ref={fileInputRef} accept=".csv,.json" style={{ display: "none" }} onChange={handleFileUpload} />
              <button style={S.btn} onClick={() => fileInputRef.current?.click()}>📁 Choose File</button>
              {uploadedReviews.length > 0 && (
                <div style={{ marginTop: 12, color: COLORS.positive, fontSize: 13 }}>✅ {uploadedReviews.length} reviews loaded from file</div>
              )}
            </div>

            <div style={S.card}>
              <div style={S.cardTitle}>✏️ Paste Reviews (one per line)</div>
              <textarea
                style={S.textarea}
                placeholder="Paste reviews here, one per line..."
                value={pastedText}
                onChange={e => setPastedText(e.target.value)}
              />
              <button style={{ ...S.btn, marginTop: 10 }} onClick={handlePasteAdd}>➕ Add to Analysis</button>
            </div>
          </div>

          <div style={S.card}>
            <div style={S.cardTitle}>📊 Dataset Summary</div>
            <div style={S.row}>
              {products.map(p => {
                const pReviews = analyzed.filter(r => r.product === p);
                return (
                  <div key={p} style={{ background: COLORS.bgCardAlt, borderRadius: 10, padding: 14, flex: 1, minWidth: 200, border: `1px solid ${COLORS.border}` }}>
                    <div style={{ color: COLORS.accent, fontWeight: 800, fontSize: 13, marginBottom: 6 }}>{p}</div>
                    <div style={{ color: COLORS.textMuted, fontSize: 12 }}>{pReviews.length} total reviews</div>
                    <div style={{ color: COLORS.positive, fontSize: 12 }}>{pReviews.filter(r => r.overallSentiment === "positive").length} positive</div>
                    <div style={{ color: COLORS.negative, fontSize: 12 }}>{pReviews.filter(r => r.flagged).length} flagged</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <div style={{ textAlign: "center", padding: "16px", color: COLORS.textMuted, fontSize: 10, letterSpacing: 1 }}>
        SENTINEL v1.0 • HACK MALENADU '26 • Consumer & Retail Track
      </div>
    </div>
  );
}
