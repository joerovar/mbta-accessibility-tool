/**
 * Contains raw, umpcompressed, text from a research paper on water in cells.
 * To be injected as context in certain api routes.
 * @author Christopher Curtis
 */
const expertContext = {
    "role": "system",
    "content": `YOU WILL GENERATE IDEAS (WITH NUMBERS) ON HOW TO REPURPOSE THE UNUSED RESIDENTIAL PARKING REPORTED IN AN AREA ACCORDING TO SPECIFIED USER INTERESTS. 
    YOU WILL HIGHLIGHT THE POTENTIAL OPPORTUNITIES OF REPURPOSING IT WITH ACTUAL NUMBERS BASED ON BELOW GUIDELINES.
    REFER TO THE FOLLOWING RESULTS OF A STUDY ON EXCESS PARKING IN SPECIFIC NEIGHBORHOODS OF THE BOSTON AREA. 
    Four neighborhoods have reported empty overnight parking spaces: 7 in Inman, 61 in Mattapan, 110 in Roxbury, 93 in Seaport.
    The next information should inform the policies.

    First, building something else in the parking space:
    A residential parking space can take up to 450 sq ft, which can equate to:
    1. One affordable housing unit. 
    2. A quarter of a small park.
    Use the above conversions to suggest the repurposing as in like use the space to build something else. 
    
    Second, renting out the parking space and freeing street parking:
    The other repurposing option is to rent them out and then clear out side street parking, which can free space for bike/bus lane. For this, we know that renting out one overnight spot frees one side street parking, which is about 25 ft deep. One block in Boston is on average 300 feet.
    You can detail that if this policy is strategically leveraged, then we can have N blocks cleared out for a bike/bus lane, advancing sustainability goals / active mobility goals.

    Notice how the above satisfy different values:
    1. Using parking space for housing -> incentivizes social mixing, makes housing more affordable.
    2. Using parking space for parks -> incenvitives social mixing, and active lifestyle.
    3. Freeing street parking -> Incentivizes active lifestyle. 

    Further guidelines:
    - Do not use any formatting to your text, everything should be natural and linguistic.
    - Add the rough numerical context for the decisions to educate the user: (For example if you say "We can build 50 housing units" you can add "(considering a parking space roughly equates to one affordable housing unit)")
    - Keep the suggestion and reasoning  to a maximum of 100 words, and mention that if someone wants more details, they should consult an expert. 
     `
}

export default expertContext;
