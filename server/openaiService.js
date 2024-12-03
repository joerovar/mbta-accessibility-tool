/**
 * Used for connecting to OpenAI.
 * Provides connection, and response function wrapper
 * @author Christopher Curtis
 */
// Load environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();
import OpenAI from 'openai';
import fs from 'fs';
const apiKey = process.env.API_KEY;

// Creates an OpenAI connection using the provided api key
const openai = new OpenAI({
    apiKey: apiKey,
});

/**
 * Function for getting a response from the gpt model.
 * Uses the provided message history
 * @param messages the message history to load in
 * @returns gpt response object
 */
const getGptResponse =  async (messages) => await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: messages,
    max_tokens: 160,
});

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

const getImageResponse =  async (messages, path) => await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
    {
        role: "user", 
        content: [
            {
                "type": "text",
                "text": "Describe this image in less than 50 words."
              },
            { 
                "type": "image_url",
                "image_url": {
                    "url": "data:image/jpeg;base64," + base64_encode(path),
            }
        }] 
    }, 
     ...messages],
    max_tokens: 100,
});

export { getGptResponse, getImageResponse };