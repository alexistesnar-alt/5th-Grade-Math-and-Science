/* Math · Launching the Year — 3 lessons (NC.5.MD.2), Aug 24–28.
   To change words: edit the text inside the quotes. Keep the commas and brackets.
   Answers that are numbers are worked out from the data below, so they stay correct if you change the data. */
(function () {
  var MD2 = ['NC.5.MD.2', 'Represent and interpret data: tell whether a question gives categorical data, numerical data, or data that changes over time, and make and read a line graph.'];
  var sum = function (a) { return a.reduce(function (x, y) { return x + y; }, 0); };

  /* ---------- Lesson 1 data: How do you get to school? ---------- */
  var rideCats = ['Bus', 'Car', 'Walk', 'Bike'], rideVals = [9, 7, 3, 2];
  /* ---------- Lesson 2 data: letters in first names ---------- */
  var nameMin = 3, nameMax = 9, nameVals = [2, 4, 6, 5, 3, 1, 1]; // counts for 3,4,5,6,7,8,9 letters
  var nameList = []; nameVals.forEach(function (c, i) { for (var k = 0; k < c; k++) nameList.push(nameMin + i); });
  /* ---------- Lesson 3 data: temperature on the playground ---------- */
  var tempTimes = ['8:00', '9:00', '10:00', '11:00', '12:00', '1:00', '2:00'], tempVals = [60, 62, 66, 72, 76, 78, 74];

  LessonKit.unit({
    id: 'math-u0', subject: 'math', short: 'Launch', title: 'Launching the Year', home: '../index.html', unitHref: '../unit0.html',
    lessons: [
      /* =============================== LESSON 1 =============================== */
      {
        n: 1, title: 'What Kind of Data?', when: 'Aug 24–25',
        goal: 'Let’s sort survey questions by the kind of data they give us, and make a bar graph.',
        stds: [MD2],
        targets: ['I can tell if a survey question gives <b>categorical</b> data, <b>numerical</b> data, or data that <b>changes over time</b>.', 'I can make and read a <b>bar graph</b>.'],
        vocab: [['data', 'Facts or numbers we collect to answer a question.'], ['survey', 'Asking many people the same question.'], ['categorical data', 'Answers that are groups or words.'], ['numerical data', 'Answers that are numbers.'], ['bar graph', 'A graph that uses bars to compare groups.']],
        outline: [
          ['Warm-up', 10, '<b>Notice and Wonder:</b> look at a bar graph about how our class gets to school. What do you notice? What do you wonder?'],
          ['Activity 1', 15, '<b>Let’s sort survey questions.</b> Is the answer a word, a number, or something that changes over time?'],
          ['Activity 2', 15, '<b>Let’s make a bar graph</b> from a tally table of class data.'],
          ['Synthesis', 5, 'How do you know what kind of data a question will give? Which graph fits categorical data?'],
          ['Cool-down', 5, 'Exit ticket: 4 questions.']
        ],
        materials: ['Math notebook', 'Pencil and colored pencils', 'Sticky notes (one per student for the class survey)', 'Chart paper for the class bar graph', { t: 'NC.5.MD.2 Representing Data task', note: 'Tools4NCTeachers formative task (Cluster 1)' }],
        notes: [
          { t: 'p', html: '<p>Mathematicians and scientists ask questions. To answer them, they collect <b>data</b>. One way to collect data is a <b>survey</b>: you ask many people the same question.</p>' },
          { t: 'vocab', words: [
            ['Categorical data', 'Answers that are <b>groups or words</b>. You can sort them into categories.', '“What is your favorite fruit?” → apple, banana, grape'],
            ['Numerical data', 'Answers that are <b>numbers</b> you count or measure.', '“How many pets do you have?” → 0, 1, 2, 3'],
            ['Data that changes over time', '<b>One thing measured again and again</b> over minutes, days, months or years.', '“What is the temperature every hour today?”'],
            ['Bar graph', 'A graph with bars to <b>compare categories</b>. Taller bar = more.', 'Favorite fruits in our class']
          ] },
          { t: 'key', label: 'Three kinds of data', html: '<p style="margin:0">Ask: <b>What will the answers look like?</b></p><ul style="margin:6px 0 0"><li>Words or groups → <b>categorical</b></li><li>Numbers about many people or things → <b>numerical</b></li><li>One thing, measured at different times → <b>changes over time</b></li></ul>' },
          { t: 'fill', html: '“What is your favorite color?” gives [[categorical]] data because the answers are words. “How tall are you?” gives [[numerical]] data because the answers are [[numbers]]. A [[bar graph|bar]] is a good way to show categorical data.' },
          { t: 'example', title: 'Worked example: read a bar graph', q: 'Our class answered: “How do you get to school?”', fig: { bar: { title: 'How We Get to School', cats: rideCats, vals: rideVals, step: 1, yLabel: 'Number of students' } }, steps: [
            'Read the title. The graph is about <b>how we get to school</b>.',
            'Find the tallest bar. <b>Bus</b> is tallest, so the most students ride the bus.',
            'Read the bar heights. Bus = ' + rideVals[0] + ', Car = ' + rideVals[1] + '.',
            'Compare: ' + rideVals[0] + ' − ' + rideVals[1] + ' = <b>' + (rideVals[0] - rideVals[1]) + '</b>. So ' + (rideVals[0] - rideVals[1]) + ' more students ride the bus than come by car.'
          ] },
          { t: 'try', q: { q: 'Use the bar graph above. How many students were surveyed in all?', answer: sum(rideVals), hint: 'Add every bar: ' + rideVals.join(' + ') + '.', why: rideVals.join(' + ') + ' = ' + sum(rideVals) + ' students.' } },
          { t: 'write', q: 'Write your own survey question that gives <b>categorical</b> data.', ph: 'My question: …' }
        ],
        practice: [
          { type: 'sort', q: 'Sort each survey question by the kind of data it gives.', bins: ['Categorical', 'Numerical', 'Changes over time'], items: [
            ['What is your favorite sport?', 0], ['How many brothers and sisters do you have?', 1], ['How tall is a sunflower each week this summer?', 2],
            ['What month were you born?', 0], ['How many books did you read last month?', 1], ['What is the temperature every hour today?', 2]
          ], hint: 'Ask: Are the answers words, numbers, or one thing measured again and again?', why: 'Words → categorical. Numbers about many people → numerical. One thing measured over time → changes over time.' },
          { q: '“What is your favorite pizza topping?” What kind of data will this give?', choices: ['Categorical', 'Numerical', 'Changes over time'], answer: 0, hint: 'What will the answers look like: pepperoni, cheese, sausage…?', why: 'The answers are words (toppings), so the data is categorical.' },
          { q: '“How many minutes does it take you to get to school?” What kind of data will this give?', choices: ['Categorical', 'Numerical', 'Changes over time'], answer: 1, hint: 'The answers will be numbers like 5, 12, 20.', why: 'Each person answers with a number, so the data is numerical.' },
          { q: 'Look at the “How We Get to School” graph in the notes. How many <b>more</b> students ride the bus than walk?', answer: rideVals[0] - rideVals[2], hint: 'Bus = ' + rideVals[0] + '. Walk = ' + rideVals[2] + '. Subtract.', why: rideVals[0] + ' − ' + rideVals[2] + ' = ' + (rideVals[0] - rideVals[2]) + '.' },
          { q: 'Which kind of graph is best for categorical data?', choices: ['Bar graph', 'Line graph', 'Line plot'], answer: 0, hint: 'Which graph compares groups side by side?', why: 'A bar graph compares categories.' }
        ],
        lab: {
          type: 'graph', mode: 'bar', title: 'How We Get to School', lead: 'Turn the tally table into a bar graph.',
          intro: 'Count the tally marks for each way to get to school. Then make each bar the right height.',
          table: { head: ['Way', 'Tally'], leftCol: true, rows: rideCats.map(function (c, i) { return [c, tallies(rideVals[i])]; }) },
          cats: rideCats, vals: rideVals, yMax: 10, yLabel: 'Number of students',
          success: 'Each bar shows the number of students in that category.',
          after: [
            { q: 'Which way do the <b>fewest</b> students get to school?', choices: rideCats, keepOrder: true, answer: rideVals.indexOf(Math.min.apply(null, rideVals)), why: 'Bike has the shortest bar.' },
            { q: 'How many students walk <b>or</b> ride a bike?', answer: rideVals[2] + rideVals[3], hint: 'Walk + Bike.', why: rideVals[2] + ' + ' + rideVals[3] + ' = ' + (rideVals[2] + rideVals[3]) + '.' }
          ]
        },
        exit: [
          { q: '“What is your favorite animal?” What kind of data will this give?', choices: ['Categorical', 'Numerical', 'Changes over time'], answer: 0, why: 'The answers are words, so the data is categorical.' },
          { q: '“How many letters are in your last name?” What kind of data will this give?', choices: ['Categorical', 'Numerical', 'Changes over time'], answer: 1, why: 'The answers are numbers about many people, so the data is numerical.' },
          { q: 'Use the bar graph. How many more students chose soccer than chose basketball?', fig: { bar: { title: 'Favorite Sport', cats: ['Soccer', 'Basketball', 'Football', 'Swimming'], vals: [8, 5, 6, 3], step: 1, yLabel: 'Students' } }, answer: 8 - 5, why: 'Soccer = 8 and basketball = 5. 8 − 5 = 3.' },
          { q: 'Which question would make the best <b>bar graph</b>?', choices: ['What is your favorite season?', 'How much does a puppy weigh each month?', 'How many minutes did you read each night this week?'], answer: 0, why: 'Favorite season gives categories (winter, spring, summer, fall). Bar graphs compare categories.' }
        ]
      },

      /* =============================== LESSON 2 =============================== */
      {
        n: 2, title: 'Numerical Data and Line Plots', when: 'Aug 26',
        goal: 'Let’s show numerical data on a line plot and describe what it tells us.',
        stds: [MD2],
        targets: ['I can show numerical data on a <b>line plot</b>.', 'I can find the most common value and the difference between the greatest and least values.'],
        vocab: [['line plot', 'A number line with an × for each data value.'], ['value', 'One number in the data.'], ['most common', 'The value with the most ×s.'], ['greatest / least', 'The biggest and smallest values.']],
        outline: [
          ['Warm-up', 10, '<b>Which One Doesn’t Belong?</b> Four survey questions. Which one gives a different kind of data?'],
          ['Activity 1', 15, '<b>Let’s collect numerical data:</b> how many letters are in each of our first names?'],
          ['Activity 2', 15, '<b>Let’s make a line plot</b> and answer questions about it.'],
          ['Synthesis', 5, 'What does a tall stack of ×s mean? Why is a line plot good for numerical data?'],
          ['Cool-down', 5, 'Exit ticket: 4 questions.']
        ],
        materials: ['Math notebook', 'Sticky notes or dot stickers', 'Number line on the board (3 to 9)', 'Pencil'],
        notes: [
          { t: 'p', html: '<p>When the answers to a survey are <b>numbers</b>, we can show them on a <b>line plot</b>. A line plot is a number line. Each answer gets one <b>×</b> above its number.</p>' },
          { t: 'example', title: 'Worked example: make a line plot', q: 'Six students counted the letters in their first names: <b>4, 5, 5, 6, 5, 3</b>.', steps: [
            'Draw a number line from the <b>least</b> value (3) to the <b>greatest</b> value (6).',
            'Put one × for each answer. 3 gets one ×. 4 gets one ×. 5 gets three ×s. 6 gets one ×.',
            'Check: count all the ×s. 1 + 1 + 3 + 1 = 6. That matches the 6 students.',
            'The tallest stack is at <b>5</b>. So 5 letters is the <b>most common</b> name length.'
          ], fig: { lineplot: { title: 'Letters in First Names', min: 3, max: 6, vals: [1, 1, 3, 1], xLabel: 'Number of letters' } } },
          { t: 'key', label: 'Read a line plot', html: '<ul style="margin:0"><li><b>Count all ×s</b> to find how many answers there are.</li><li>The <b>tallest stack</b> is the most common value.</li><li><b>Greatest − least</b> tells how spread out the data is.</li></ul>' },
          { t: 'fill', html: 'A line plot is good for [[numerical]] data. Each [[×|x|an x|cross]] stands for one answer. The tallest stack shows the most [[common]] value.' },
          { t: 'reveal', q: 'Why don’t we use a line plot for “What is your favorite color?”', a: 'Colors are not numbers. They don’t go on a number line. Favorite color is categorical, so a <b>bar graph</b> is better.' }
        ],
        practice: [
          { q: 'How many students are shown on this line plot?', fig: { lineplot: { title: 'Pets at Home', min: 0, max: 4, vals: [3, 5, 4, 1, 2], xLabel: 'Number of pets' } }, answer: 3 + 5 + 4 + 1 + 2, hint: 'Count every ×. 3 + 5 + 4 + 1 + 2.', why: '3 + 5 + 4 + 1 + 2 = 15 students.' },
          { q: 'Use the same line plot. What is the most common number of pets?', fig: { lineplot: { title: 'Pets at Home', min: 0, max: 4, vals: [3, 5, 4, 1, 2], xLabel: 'Number of pets' } }, answer: 1, hint: 'Find the tallest stack of ×s.', why: 'The tallest stack is above 1. Five students have 1 pet.' },
          { q: 'How many students have <b>more than 2</b> pets?', fig: { lineplot: { title: 'Pets at Home', min: 0, max: 4, vals: [3, 5, 4, 1, 2], xLabel: 'Number of pets' } }, answer: 1 + 2, hint: '“More than 2” means 3 or 4. Add those stacks.', why: '3 pets: 1 student. 4 pets: 2 students. 1 + 2 = 3.' },
          { q: 'Hours of sleep: 8, 9, 10, 8, 9, 9, 11, 7. What is the difference between the <b>greatest</b> and <b>least</b> value?', answer: 11 - 7, hint: 'Greatest is 11. Least is 7. Subtract.', why: '11 − 7 = 4 hours.' },
          { q: 'Which survey question should be shown on a <b>line plot</b>?', choices: ['How many times can you jump rope in 1 minute?', 'What is your favorite drink?', 'Which school club do you want to join?'], answer: 0, hint: 'A line plot is for answers that are numbers.', why: 'Jump rope counts are numbers, so they go on a line plot.' }
        ],
        lab: {
          type: 'graph', mode: 'lineplot', title: 'Letters in Our First Names', lead: 'Build a line plot from class data.',
          intro: 'Here are the name lengths for ' + nameList.length + ' students. Put one × above the number for each student.',
          table: { caption: 'Letters in each first name', head: ['Data'], rows: [[nameList.join(', ')]] },
          min: nameMin, max: nameMax, vals: nameVals, xLabel: 'Number of letters',
          success: 'You plotted all ' + nameList.length + ' students.',
          after: [
            { q: 'What is the most common number of letters?', answer: nameMin + nameVals.indexOf(Math.max.apply(null, nameVals)), why: 'The tallest stack is above ' + (nameMin + nameVals.indexOf(Math.max.apply(null, nameVals))) + '.' },
            { q: 'How many students have names with <b>7 or more</b> letters?', answer: nameVals[4] + nameVals[5] + nameVals[6], hint: 'Add the stacks above 7, 8 and 9.', why: nameVals[4] + ' + ' + nameVals[5] + ' + ' + nameVals[6] + ' = ' + (nameVals[4] + nameVals[5] + nameVals[6]) + '.' },
            { q: 'What is the difference between the longest and shortest name length?', answer: nameMax - nameMin, why: nameMax + ' − ' + nameMin + ' = ' + (nameMax - nameMin) + ' letters.' }
          ]
        },
        exit: [
          { q: 'How many students answered the survey?', fig: { lineplot: { title: 'Books Read in August', min: 1, max: 6, vals: [2, 3, 5, 2, 1, 1], xLabel: 'Number of books' } }, answer: 2 + 3 + 5 + 2 + 1 + 1, why: '2 + 3 + 5 + 2 + 1 + 1 = 14 students.' },
          { q: 'Use the same line plot. How many students read <b>4 or more</b> books?', fig: { lineplot: { title: 'Books Read in August', min: 1, max: 6, vals: [2, 3, 5, 2, 1, 1], xLabel: 'Number of books' } }, answer: 2 + 1 + 1, why: '4 books: 2. 5 books: 1. 6 books: 1. 2 + 1 + 1 = 4.' },
          { q: 'What is the most common number of books read?', fig: { lineplot: { title: 'Books Read in August', min: 1, max: 6, vals: [2, 3, 5, 2, 1, 1], xLabel: 'Number of books' } }, answer: 3, why: 'The tallest stack (5 ×s) is above 3.' },
          { q: 'Which graph is best for “How many siblings do you have?”', choices: ['Line plot', 'Bar graph', 'Line graph'], answer: 0, why: 'The answers are numbers about many people (numerical data), so a line plot fits.' }
        ]
      },

      /* =============================== LESSON 3 =============================== */
      {
        n: 3, title: 'Line Graphs: Data That Changes Over Time', when: 'Aug 27–28',
        goal: 'Let’s make and read line graphs to see how something changes over time.',
        stds: [MD2],
        targets: ['I can make a <b>line graph</b> for data that changes over time.', 'I can find how much the data goes up or down between two times.', 'I can choose the best graph for a survey question.'],
        vocab: [['line graph', 'Points connected by lines to show change over time.'], ['increase', 'Going up.'], ['decrease', 'Going down.'], ['interval', 'The time between two points.']],
        outline: [
          ['Warm-up', 10, '<b>Notice and Wonder:</b> a line graph of the temperature on our playground.'],
          ['Activity 1', 15, '<b>Let’s read a line graph.</b> When did it go up the most? When did it go down?'],
          ['Activity 2', 15, '<b>Let’s make a line graph</b> from a table of data.'],
          ['Synthesis', 5, 'Bar graph, line plot or line graph? Match each to the kind of data it shows best.'],
          ['Cool-down', 5, 'Exit ticket: 4 questions.']
        ],
        materials: ['Math notebook', 'Grid paper', 'Ruler', 'Thermometer (optional: measure the classroom temperature each hour)'],
        notes: [
          { t: 'p', html: '<p>Some data is about <b>one thing</b> that changes, like the temperature during the day or how tall a plant grows each week. We show this with a <b>line graph</b>. Time goes along the bottom. We connect the points so we can see the change.</p>' },
          { t: 'fig', linegraph: { title: 'Playground Temperature', xs: tempTimes, vals: tempVals, step: 4, max: 80, yLabel: 'Degrees (°F)', xLabel: 'Time of day' }, caption: 'The line goes <b>up</b> when it gets warmer and <b>down</b> when it gets cooler.' },
          { t: 'example', title: 'Worked example: find the change', q: 'How much did the temperature increase from 10:00 to 11:00?', steps: [
            'Find 10:00 on the bottom. Go up to the point. It is at <b>' + tempVals[2] + '°</b>.',
            'Find 11:00. The point is at <b>' + tempVals[3] + '°</b>.',
            'Subtract: ' + tempVals[3] + ' − ' + tempVals[2] + ' = <b>' + (tempVals[3] - tempVals[2]) + '</b>. It went up ' + (tempVals[3] - tempVals[2]) + ' degrees.',
            'A <b>steeper</b> line means a <b>bigger</b> change.'
          ] },
          { t: 'key', label: 'Pick the best graph', html: '<div class="tw"><table class="dt" style="margin:0"><tr><th class="l">Kind of data</th><th class="l">Best graph</th></tr><tr><td class="l">Categorical (words, groups)</td><td class="l">Bar graph</td></tr><tr><td class="l">Numerical (numbers from many people)</td><td class="l">Line plot</td></tr><tr><td class="l">Changes over time</td><td class="l">Line graph</td></tr></table></div>' },
          { t: 'fill', html: 'Data that changes over time is shown on a [[line graph]]. When the line goes up, the data [[increases|increase|goes up]]. When the line goes down, the data [[decreases|decrease|goes down]].' },
          { t: 'try', q: { q: 'Use the playground graph. Between which two times did the temperature <b>decrease</b>?', choices: ['8:00 and 9:00', '11:00 and 12:00', '1:00 and 2:00'], answer: 2, hint: 'Look for the part where the line goes down.', why: 'From 1:00 to 2:00 it went from ' + tempVals[5] + '° to ' + tempVals[6] + '°.' } }
        ],
        practice: [
          { q: 'How much did the temperature increase from 8:00 to 10:00?', fig: { linegraph: { title: 'Playground Temperature', xs: tempTimes, vals: tempVals, step: 4, max: 80, yLabel: 'Degrees (°F)' } }, answer: tempVals[2] - tempVals[0], unit: 'degrees', hint: 'Read 8:00 and 10:00. Subtract the smaller from the larger.', why: tempVals[2] + ' − ' + tempVals[0] + ' = ' + (tempVals[2] - tempVals[0]) + ' degrees.' },
          { q: 'Between which two hours was the <b>biggest</b> increase?', fig: { linegraph: { title: 'Playground Temperature', xs: tempTimes, vals: tempVals, step: 4, max: 80, yLabel: 'Degrees (°F)' } }, choices: ['8:00 and 9:00', '9:00 and 10:00', '10:00 and 11:00', '12:00 and 1:00'], answer: 2, keepOrder: true, hint: 'Find the steepest part of the line going up.', why: '10:00 to 11:00 went up ' + (tempVals[3] - tempVals[2]) + ' degrees. That is the biggest jump.' },
          { q: 'A bean plant was measured every week: Week 1: 2 cm, Week 2: 5 cm, Week 3: 9 cm, Week 4: 12 cm. How much did it grow from Week 1 to Week 4?', answer: 12 - 2, unit: 'cm', hint: 'Subtract the Week 1 height from the Week 4 height.', why: '12 − 2 = 10 cm.' },
          { type: 'sort', q: 'Match each question to the best graph.', bins: ['Bar graph', 'Line plot', 'Line graph'], items: [
            ['What is your favorite lunch?', 0], ['How many push-ups can each student do?', 1], ['How many people visit the library each month this year?', 2],
            ['Which game do you like best?', 0], ['How long is each student’s pencil in centimeters?', 1], ['What is your heart rate every minute after running?', 2]
          ], hint: 'Words → bar graph. Numbers from many people → line plot. Same thing over time → line graph.', why: 'Categories go on bar graphs, numbers from many people on line plots, and change over time on line graphs.' }
        ],
        lab: {
          type: 'graph', mode: 'linegraph', title: 'Puppy’s Weight', lead: 'Make a line graph from a table.',
          intro: 'A puppy was weighed on the first day of each month. Plot each point. The points will connect into a line.',
          table: { head: ['Month', 'Weight (lb)'], rows: [['Jan', 6], ['Feb', 10], ['Mar', 16], ['Apr', 20], ['May', 22], ['Jun', 22]] },
          xs: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], vals: [6, 10, 16, 20, 22, 22], step: 2, yMax: 24, yLabel: 'Weight (pounds)', xLabel: 'Month',
          success: 'The line shows the puppy growing.',
          after: [
            { q: 'Between which two months did the puppy gain the <b>most</b> weight?', choices: ['Jan and Feb', 'Feb and Mar', 'Mar and Apr', 'May and Jun'], keepOrder: true, answer: 1, why: 'Feb to Mar: 16 − 10 = 6 pounds. That is the biggest increase.' },
            { q: 'What happened from May to June?', choices: ['The weight stayed the same.', 'The weight went up.', 'The weight went down.'], answer: 0, why: 'Both months show 22 pounds. A flat line means no change.' },
            { q: 'How much weight did the puppy gain from January to June?', answer: 22 - 6, unit: 'pounds', why: '22 − 6 = 16 pounds.' }
          ]
        },
        exit: [
          { q: 'How many more people were in line at 12:00 than at 11:00?', fig: { linegraph: { title: 'People in the Lunch Line', xs: ['11:00', '11:30', '12:00', '12:30', '1:00'], vals: [10, 15, 35, 30, 20], step: 5, max: 40, yLabel: 'People' } }, answer: 35 - 10, why: '35 − 10 = 25 more people.' },
          { q: 'Use the same graph. Between which two times did the number of people <b>decrease</b> the most?', fig: { linegraph: { title: 'People in the Lunch Line', xs: ['11:00', '11:30', '12:00', '12:30', '1:00'], vals: [10, 15, 35, 30, 20], step: 5, max: 40, yLabel: 'People' } }, choices: ['11:30 and 12:00', '12:00 and 12:30', '12:30 and 1:00'], keepOrder: true, answer: 2, why: '12:30 to 1:00 went down 10 people (30 → 20). 12:00 to 12:30 went down only 5.' },
          { q: 'Which question gives data that <b>changes over time</b>?', choices: ['How deep is the snow each hour during a storm?', 'What is your favorite kind of weather?', 'How many umbrellas does each family own?'], answer: 0, why: 'Snow depth is one thing measured again and again over time.' },
          { q: 'Which graph should show “What is your favorite subject?”', choices: ['Bar graph', 'Line plot', 'Line graph'], answer: 0, why: 'The answers are categories (math, reading, science), so use a bar graph.' }
        ]
      }
    ]
  });
  // Tally marks: each group of five is four sticks with a slash across them.
  function tallies(n) {
    var out = '', five = '<span style="position:relative;display:inline-block;margin-right:8px">||||<span style="position:absolute;left:-3px;right:-3px;top:50%;border-top:2px solid currentColor;transform:rotate(-20deg)"></span></span>';
    for (var k = 0; k < Math.floor(n / 5); k++) out += five;
    for (k = 0; k < n % 5; k++) out += '|';
    return '<span aria-label="' + n + '" style="font:600 18px var(--mono);letter-spacing:1px">' + out + '</span>';
  }
})();
