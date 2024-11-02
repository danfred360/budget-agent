# budget-agent

proof of concept app to experiment with building an ai agent. this agent analyzes a google sheet of budget data and provides insights and recommendations.

## run project

1. create a codespace on the main branch

2. copy the `.env-example` file into a `.env` file and fill in the values

3. run the following commands in the terminal:

```bash
yarn install # install dependencies

yarn build # transpile the typescript code

yarn start # run the app
```

the script will create a `report.txt` and a `suggestions.txt` file in the root directory. it will also print the contents of those files to the console.

## example output

report.txt

```txt
Category: Grocery - $150.75
Category: Rent - $1200
Category: Transportation - $18.50
Category: Fitness - $45
Category: Dining - $80.75
Category: Entertainment - $25
Category: Shopping - $120.99
Category: Utilities - $60

Unusual spending patterns:
- High rent payment of $1200 on 2024-01-03
- Low spending on dining and entertainment compared to other categories
```

suggestions.txt

```txt
1. Create a budget plan: Start by creating a budget plan that outlines your income and fixed expenses such as rent, utilities, and transportation. Then allocate a certain amount for each category, such as groceries, dining, and entertainment.

2. Cut down on unnecessary expenses: Take a closer look at your spending and identify areas where you can cut back. For example, instead of eating out for every meal, try cooking at home more often. Consider reducing your grocery budget by meal planning and buying in bulk.

3. Look for cheaper alternatives: When it comes to groceries, try shopping at discount or bulk stores. Look for deals and coupons to save money. For entertainment, consider streaming services or free activities such as hiking or visiting parks.

```
