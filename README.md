# Afghan Proverbs & Sayings API

A RESTful API to manage traditional Afghan proverbs and sayings in Dari, Pashto, and English. This API allows full CRUD operations and supports filtering by category.

## Features

- Get all proverbs
- Get a single proverb by ID
- Add a new proverb
- Update an existing proverb
- Delete a proverb
- Filter proverbs by category (e.g., wisdom, advice)

## Technologies Used

- Node.js
- Express
- JSON file for data storage

## Getting Started

### Prerequisites

- Node.js installed on your machine

### Installation

```bash
git clone https://github.com/your-username/afghan-proverbs-api.git
cd afghan-proverbs-api


## running the server
node app.js


## Get all proverbs
GET /proverbs


## Optional filter by category
GET /proverbs?category=wisdom


### GET a proverb by id
GET /proverbs/:id


### Add a new proverb
POST /proverbscontent-type: application/json
{
"textDari":"Enter the dari text",
"textPashto":"Enter the pashto text",
"translationEn":"Enter the En text",
"meaning":"Things must keep moving or they spoil.",
"category":"wisdom"
}


### Update a proverb
PUT /proverbs/:id


### Delete a proverb
DELETE /proverbs/:id
npm install
