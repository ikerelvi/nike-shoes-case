
Survey
    .StylesManager
    .applyTheme("default");

const json = {
    pages: [
        {
            questions: [
                {
                    type: "matrix",
                    name: "Quality",
                    title: "Please indicate if you agree or disagree with the following statements",
                    columns: [
                        {
                            value: 1,
                            text: "Strongly Disagree"
                        }, {
                            value: 2,
                            text: "Disagree"
                        }, {
                            value: 3,
                            text: "Neutral"
                        }, {
                            value: 4,
                            text: "Agree"
                        }, {
                            value: 5,
                            text: "Strongly Agree"
                        }
                    ],
                    rows: [
                        {
                            value: "affordable",
                            text: "Nike shoes are affordable"
                        }, {
                            value: "comfortable",
                            text: "Nike shoes are comfortable"
                        }, {
                            value: "better then others",
                            text: "Nike shoes are better than other shoes on the market"
                        }, {
                            value: "easy to use",
                            text: "Nike shoes are easy to use"
                        }
                    ]
                }, {
                    type: "rating",
                    name: "satisfaction",
                    title: "How satisfied are you with Nike shoes?",
                    isRequired: true,
                    mininumRateDescription: "Not Satisfied",
                    maximumRateDescription: "Completely satisfied"
                }, {
                    type: "rating",
                    name: "recommend friends",
                    isRequired: true,
                    title: "How likely are you to recommend Nike shoes to a friend or co-worker?",
                    mininumRateDescription: "Will not recommend",
                    maximumRateDescription: "I will recommend"
                },
                {
                    type: "radiogroup",
                    name: "price to competitors",
                    title: "Compared to our competitors, do you feel the Product is",
                    choices: ["Less expensive", "Priced about the same", "More expensive", "Not sure"]
                },
                {
                    type: "text",
                    name: "email",
                    isRequired: true,
                    validators: [
                        {
                            type: "email"
                        }
                    ],
                    title: "Thank you for taking our survey. Your survey is almost complete, please enter your email address in the box below in order to get your discount, then press the 'Complete' button."
                }
            ]
        }
    ]
};

window.survey = new Survey.Model(json);

survey
    .onComplete
    .add(function (sender) {
        Api.sendRequest(sender.data, 'http://localhost:3000/validate',function(error,response){
            if(error) {
                document
                .querySelector('#surveyResult')
                .textContent = error;
                
            }
            else{
                document
                .querySelector('#surveyResult')
                .textContent = response;
            }
        })
    });

survey.render("surveyElement");