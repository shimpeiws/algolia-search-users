import { APIGatewayProxyHandler } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { v1 } from "uuid";
import { DateTime } from "luxon";

export const hello: APIGatewayProxyHandler = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message:
        "Go Serverless Webpack (Typescript) v1.0! Your function executed successfully!",
      input: event
    })
  };
};

const firstNames = [
  "佐藤",
  "鈴木",
  "高橋",
  "田中",
  "伊藤",
  "渡辺",
  "山本",
  "中村",
  "小林",
  "加藤"
];

const lastNames = [
  "律",
  "樹",
  "蓮",
  "大和",
  "蒼",
  "楓",
  "美月",
  "凛",
  "結月",
  "紬"
];

const companyIds = [
  "1d792a16-4cd2-11ea-b77f-2e728ce88125",
  "1d792cb4-4cd2-11ea-b77f-2e728ce88125",
  "1d792dfe-4cd2-11ea-b77f-2e728ce88125",
  "1d793114-4cd2-11ea-b77f-2e728ce88125",
  "1d793254-4cd2-11ea-b77f-2e728ce88125"
];

const getRandom = (min: number, max: number) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

const userName = () => {
  const firstName = firstNames[getRandom(0, firstNames.length - 1)];
  const lastName = lastNames[getRandom(0, lastNames.length - 1)];
  return `${firstName} ${lastName}`;
};

const companyId = () => {
  return companyIds[getRandom(0, companyIds.length - 1)];
};

const createdAt = () => {
  const dt = DateTime.local(
    2020,
    getRandom(1, 12),
    getRandom(1, 28),
    getRandom(0, 23),
    getRandom(0, 59)
  );
  return dt.valueOf();
};

const userData = () => {
  const id = v1();
  return {
    userId: id,
    name: userName(),
    companyId: companyId(),
    gender: getRandom(1, 2),
    createdAt: createdAt()
  };
};

export const seed: APIGatewayProxyHandler = async () => {
  const client = new DynamoDB.DocumentClient();
  for (let i = 0; i < 100; i++) {
    const item = userData();
    console.info("item", item);
    console.info("process.env.USERS_DB_NAME", process.env.USERS_DB_NAME);
    const params = {
      TableName: process.env.USERS_DB_NAME,
      Item: item
    };
    const res = await client.put(params).promise();
    console.info("res", res);
  }
  return {
    statusCode: 200,
    body: ""
  };
};
