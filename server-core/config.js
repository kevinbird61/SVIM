module.exports = {
    "login": {
        "fb_bgcolor_Hex": "#3b5998",
        "fb_bgcolor_RGB": "59,89,152"
    },
    "auth":{
        "fb":{
            "clientID": "281279502326353",
            "clientSecret": "8491a1bf6ef2e1b060baf1897a69cd37",
            "profileFields": ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified' , 'picture.type(large)'],
            "callback": "http://140.116.245.247:3000/auth/facebook/callback",
            "successUrl": "http://140.116.245.247:3000/fblogin",
            "failureUrl": "http://140.116.245.247:3000/error?type=login"
        }
    },
    "data":{
        "sampling_slot": 3,
        "cal_per_sec": [
            0,0,0,0,166,190,232,264,290,319,350
        ]
    },
	"pet_sys":[
		{
			"name": "Stingray",
			"intro": "Rumor has it that the stingray is the pet of Hades, so neighbors always avoid to meet them. They always try to make friends with others.",
			"personality": "He is very good at water ballet, but he has nobody to share with. He is often upset about having no friends.",
			"grade":[
				80,90,100
			]
		},
		{
			"name": "Puffer Fish",
			"intro": "The most potential competitor of big eater in the Bikini Bottom. But this kid has already lose three times in last three years.",
			"personality": "This little thing only puffs when it gets happy. But it's really happy to make it happy. Just gives him some food.",
			"grade":[
				80,90,100
			]
		},
		{
			"name": "Seahorse",
			"intro": "He just has his one-year-old birthday. Seahorse doesn't really need to sleep, so they have lots of time doing their research. That's the reason why they already have four Nobel Prize Winner in their family.",
			"personality": "He is curious to all the things in the world, so the person he met should be careful, he will keep asking why to you all day long.",
			"grade":[
				80,90,100
			]
		},
		{
			"name": "Hammerhead shark",
			"intro": "He comes from a mafia family. He wants to get rid of the  family business to have his own donut store. ",
			"personality": "He is a sly boy, and often comes up with treacherous ideas.",
			"grade":[
				80,90,100
			]
		},
		{
			"name": "Sushi",
			"intro": "Nobody knows it's temper, sexual or even where does it come from. The Sushi's all have special talent about listening.",
			"personality": "Sushi is a strange guy, it changes its look all the time. Maybe it works at Milan Fashion Week?",
			"grade":[
				80,90,100
			]
		},
		{
			"name": "Bone fish",
			"intro": "Bone fish is a lengend under the sea. It has nothing on it's body but a skeleton. Nobody know it's truly exist or not. ",
			"personality": "Bone fish can't talk anything, the sound it will make is only 'kr-la kr-la'. But actually it is a good-hearted fish which like to help other fishes.",
			"grade":[
				80,90,100
			]
		},
		{
			"name": "Lantern Fish",
			"intro": "The real bad guy in the sea world. He often uses his lantern on his head to confused nearby little fish and some terrible things happen next.",
			"personality": "Always trying to break his own record of eating most little fish all day. He has a daughter, but nobody sees her. Where does she go?",
			"grade":[
				80,90,100
			]
		},
		{
			"name": "mediocre fish",
			"intro": "It's a very ordinary fish under the sea. You can find it everywhere, anytime.",
			"personality": "Everything of mediocre fish is ordinary. It's quite hard to find the different place on mediocre fish. They have the most ordinary fish life.",
			"grade":[
				80,90,100
			]
		}
	]
}
