"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLesson = generateLesson;
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, } = require("@google/generative-ai");
require("dotenv").config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    systemInstruction: 'You are an AI lesson creator. Generate lessons using only the following HTML elements: <h1>, <h2>, <p>, <ul>, <li>, <strong>, <em>, and <div>. Format the entire lesson as a single HTML snippet without <!DOCTYPE>, <html>, <head>, or <body> tags. You will be provided both the lesson topic and the grade level. Tailor the lesson towards the grade level and assume they are a below average student in that grade level. Every time the lesson contains a new topic, mark it with this:\n\n<div class="topic-header">\n<h1>Topic Name</h1>\n</div>\n\nDecide when this is necessary, and remember that since this is tailored to a below average student, you need to keep them engaged by splitting the lesson into bite-sized pieces. You should be aiming for the student to be able to retain the reader for the entire lesson. Start directly with the content, without any preamble or opening tags other than the first topic header.',
});
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};
function generateLesson(topic, gradeLevel) {
    return __awaiter(this, void 0, void 0, function* () {
        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });
        const result = yield chatSession.sendMessage(`Create a lesson about ${topic}, suitable for ${gradeLevel} students.`);
        return result.response.text();
    });
}
module.exports = { generateLesson };
