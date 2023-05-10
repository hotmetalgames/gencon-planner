import chalk from 'chalk';
import fs from 'fs';
import { parse } from 'csv-parse';

const greeting = chalk.white.bold('Hello!');

const events = [];
fs.createReadStream('./events.csv')
	.pipe(parse({ delimiter: ',', from_line: 2 }))
	.on('data', function (row) {
		const event = {
			id: row[0],
			group: row[1],
			title: row[2],
			short_desc: row[3],
			long_desc: row[4],
			type: row[5],
			system: row[6],
			rules_edition: row[7],
			min_players: row[8],
			max_players: row[9],
			min_age: row[10],
			start_date: row[14],
			duration: row[15],
			end_date: row[16],
			gm_names: row[17],
			website: row[18],
			Tournament: row[20],
			cost: row[25],
			location: row[26],
			room_name: row[27],
			last_modified: row[31]
		};

		events.push(event);
	})
	.on('finish', async () => {
		console.log(events[0]);

		for (let i = 0; i < events.length; i++) {
			const res = await fetch(
				'https://us-east-1.aws.data.mongodb-api.com/app/data-bevsj/endpoint/data/v1/action/insertOne',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						apiKey: 'V192ZSaapsrSQwJwqPqdOseNzpsu1UOJud150zUs53sxWeclUUYX78tqtrYxlJWQ'
					},
					body: JSON.stringify({
						collection: 'Events',
						database: 'GenCon2023',
						dataSource: 'GenCon',
						document: events[i]
					})
				}
			);

			console.log(await res.json());
		}
	});

//   fetch(
//     "https://us-east-1.aws.data.mongodb-api.com/app/data-bevsj/endpoint/data/v1/action/findOne",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         apiKey:
//           "V192ZSaapsrSQwJwqPqdOseNzpsu1UOJud150zUs53sxWeclUUYX78tqtrYxlJWQ",
//       },
//       body: JSON.stringify({
//         collection: "Events",
//         database: "GenCon2023",
//         dataSource: "GenCon",
//         document: event,
//       }),
//     }
//   )
//     .then((res) => {
//       console.log("response", res);
//     })
//     .catch((err) => {
//       console.error("error", err);
//     });
