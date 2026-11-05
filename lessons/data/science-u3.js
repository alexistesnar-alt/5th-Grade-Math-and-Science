/* Science · Unit 3: The Gray Ghosts — 14 tasks (about 4 weeks). LS.5.2.1, LS.5.2.2, LS.5.2.3.
   Anchoring phenomenon: hemlock trees in the Southern Appalachians turning gray and dying (hemlock woolly adelgid).
   Boundary: types of ecological relationships (predation, competition…), complex food webs and energy pyramids are beyond the standard. */
(function () {
  var S1 = ['LS.5.2.1', 'Engage in argument from evidence to compare the characteristics of common ecosystems (estuaries and salt marshes, oceans, lakes and ponds, rivers and streams, forests, grasslands) in their ability to support a variety of populations.'];
  var S2 = ['LS.5.2.2', 'Use models to classify organisms within an ecosystem as producers, consumers or decomposers.'];
  var S3 = ['LS.5.2.3', 'Use models to infer the effects that may result from the interconnected relationships of plants and animals to their ecosystem.'];
  var SEPq = ['SEP', 'Asking questions'], SEPm = ['SEP', 'Developing and using models'], SEPa = ['SEP', 'Engaging in argument from evidence'];
  var PHEN = 'Deep in the Appalachian forests, tall hemlock trees have stood for hundreds of years. Now many have lost their green needles and turned a silvery gray. People call them <b>“Gray Ghosts.”</b> <b>What is killing the hemlocks, and how does it affect the rest of the forest?</b>';
  var WEB = '../../lab/food-web.html';
  var ex = function (t, m) { return [t, 0, m]; };

  LessonKit.unit({
    id: 'sci-u3', subject: 'science', short: 'Unit 3', title: 'The Gray Ghosts', home: '../index.html', unitHref: '../unit3.html', word: 'Task',
    lessons: [
      {
        n: 1, section: 'Launch: The Anchoring Phenomenon', title: 'The Gray Ghosts', phenom: PHEN,
        goal: 'Let’s read about the Gray Ghosts and share what we notice and wonder.',
        stds: [S3, SEPq], targets: ['I can describe what is happening to the hemlock trees.', 'I can ask questions about it.'],
        vocab: [['hemlock', 'A tall evergreen tree in Appalachian forests.'], ['ecosystem', 'Living and nonliving things in an area and how they interact.']],
        outline: [ex('Engage', 'Read <i>The Gray Ghost: Hemlock Trees in Danger</i> (page 1 only).'), ex('Notice & Wonder', 'Look at the photo of gray hemlocks. Record notices and wonders.'), ex('Share', 'Share with your group.')],
        materials: ['The Gray Ghost: Hemlock Trees in Danger (page 1)', 'Unit 3 slideshow', 'Science notebook'],
        notes: [
          { t: 'p', html: '<p>Hemlocks are called the “backbone of the forest.” They shade streams, give homes to birds and squirrels, and help other plants grow. Now many hemlocks are turning gray and dying.</p>' },
          { t: 'write', q: '<b>I notice…</b>', ph: 'I notice the trees…' }, { t: 'write', q: '<b>I wonder…</b>', ph: 'I wonder what will happen to…' }
        ],
        practice: [{ q: 'Why are hemlocks called the “backbone of the forest”?', choices: ['They protect streams, give shade and homes, and help other plants.', 'They are the shortest trees.', 'They have no leaves.'], answer: 0, why: 'Many living things depend on them.' }, { q: 'What color are the dying hemlocks?', choices: ['Silvery gray', 'Bright red', 'Dark green'], answer: 0, why: 'That is why they are called Gray Ghosts.' }],
        exit: [{ q: 'What is our unit question?', choices: ['What is killing the hemlocks, and how does it affect the forest?', 'How tall can trees grow?'], answer: 0, why: 'We will investigate the whole ecosystem.' }]
      },
      {
        n: 2, section: 'Launch: The Anchoring Phenomenon', title: 'Initial Model', phenom: PHEN,
        goal: 'Let’s model what we think is happening in the hemlock forest.',
        stds: [S3, SEPm], targets: ['I can draw a model of the forest and what might be hurting the hemlocks.'],
        vocab: [['model', 'A drawing that shows how something works.']],
        outline: [ex('Model', 'Draw the hemlock forest: trees, animals, streams. Show what you think is happening. Label.'), ex('Share', 'Compare with a partner.')],
        materials: ['Science notebook', 'Colored pencils'],
        notes: [{ t: 'key', label: 'Include', html: '<ul style="margin:0"><li>hemlocks and other living things</li><li>nonliving things like water and sunlight</li><li>arrows showing what you think affects what</li></ul>' }],
        practice: [{ q: 'An initial model shows…', choices: ['my ideas right now', 'the final answer'], answer: 0, why: 'We will revise it.' }],
        lab: { type: 'sketch', title: 'My Initial Model', intro: 'Draw the hemlock forest and what you think is happening. Use arrows and labels.', checklist: ['I drew hemlocks and other living things.', 'I drew nonliving things (water, sun, soil).', 'I used arrows to show connections.'] },
        exit: [{ q: 'What should a model include?', choices: ['Labels and arrows', 'Only colors'], answer: 0, why: 'Labels and arrows explain ideas.' }]
      },
      {
        n: 3, section: 'Launch: The Anchoring Phenomenon', title: 'Driving Question Board', phenom: PHEN,
        goal: 'Let’s organize our questions about the Gray Ghosts.',
        stds: [S1, S3, SEPq], targets: ['I can write and group questions.'],
        vocab: [['Driving Question Board', 'Our class chart of questions.']],
        outline: [ex('Write', 'One question per sticky note.'), ex('Scientists Circle', 'Share and group questions.')],
        materials: ['Chart paper', 'Sticky notes'],
        notes: [{ t: 'write', q: 'Write 3 questions about the hemlock forest.', rows: 4 }],
        practice: [{ type: 'sort', q: 'Group these questions.', bins: ['The trees', 'Animals and other living things'], items: [['What is making the hemlocks gray?', 0], ['Can the hemlocks be saved?', 0], ['Where will the birds live?', 1], ['What happens to fish in the streams?', 1]], why: 'Grouping questions helps plan investigations.' }],
        exit: [{ q: 'The DQB helps us…', choices: ['guide what we investigate', 'grade tests'], answer: 0, why: 'It organizes our questions.' }]
      },
      {
        n: 4, section: 'Part 1: Ecosystems (LS.5.2.1)', title: 'What Is an Ecosystem?', when: '2 days', phenom: PHEN,
        goal: 'Let’s explore the levels of an ecosystem and what organisms need to survive.',
        stds: [S1], targets: ['I can describe organism → population → community → ecosystem.', 'I can explain that organisms survive only where their needs are met.'],
        vocab: [['organism', 'One living thing.'], ['population', 'All the organisms of one kind in an area.'], ['community', 'All the populations in an area.'], ['ecosystem', 'A community plus the nonliving things around it.'], ['habitat', 'The place where an organism lives and gets what it needs.']],
        outline: [ex('Engage', 'What does a squirrel need to survive?'), ex('Explore', 'Ecosystems Introduction reading. Build the hierarchy.'), ex('Explain', 'Needs: food, water, air, shelter, space.')],
        materials: ['Ecosystems Introduction', 'Ecosystems and Biomes', 'Circle diagram'],
        notes: [
          { t: 'fig', table: { caption: 'Levels of an ecosystem', head: ['Level', 'Meaning', 'Hemlock forest example'], leftCol: true, rows: [['Organism', 'one living thing', 'one brook trout'], ['Population', 'all of one kind', 'all the brook trout in a stream'], ['Community', 'all the populations', 'trout, hemlocks, birds, moss…'], ['Ecosystem', 'community + nonliving things', 'all of those + water, soil, sunlight']] } },
          { t: 'key', label: 'Needs', html: '<p style="margin:0">Organisms can only survive where their needs are met: <b>food, water, air, shelter and space</b>.</p>' },
          { t: 'fill', html: 'All the deer in a forest make a [[population]]. All the populations together make a [[community]]. A community plus nonliving things is an [[ecosystem]].' }
        ],
        practice: [{ q: 'All the black bears in the Smoky Mountains are a…', choices: ['population', 'community', 'organism'], answer: 0, why: 'One kind of organism.' }, { q: 'Which list is in order from smallest to largest?', choices: ['organism, population, community, ecosystem', 'ecosystem, organism, community, population'], answer: 0, why: 'Each level includes the one before.' }, { q: 'Why can’t a brook trout live in a desert?', choices: ['Its needs (cold water) are not met there.', 'It doesn’t like sand.', 'Deserts are too big.'], answer: 0, why: 'Organisms survive only where needs are met.' }],
        exit: [{ q: 'A community plus nonliving things like water and soil is…', choices: ['an ecosystem', 'a population'], answer: 0, why: 'Ecosystem = living + nonliving.' }, { q: 'Name a need of all animals.', choices: ['Water', 'Television', 'Sand'], answer: 0, why: 'Food, water, air, shelter, space.' }]
      },
      {
        n: 5, section: 'Part 1: Ecosystems (LS.5.2.1)', title: 'Biotic and Abiotic Factors', phenom: PHEN,
        goal: 'Let’s find the living and nonliving parts of a local ecosystem.',
        stds: [S1], targets: ['I can identify biotic (living) factors.', 'I can identify abiotic (nonliving) factors.'],
        vocab: [['biotic', 'Living, or once living: plants, animals, fungi.'], ['abiotic', 'Nonliving: sunlight, water, soil, temperature, air.']],
        outline: [ex('Engage', 'Biotic–Abiotic ID game.'), ex('Explore', 'Go outside or look at a schoolyard photo. List biotic and abiotic factors.'), ex('Explain', 'Frayer model for biotic and abiotic.')],
        materials: ['Biotic-Abiotic ID game', 'Biotic/abiotic Frayer model', 'What Type of Ecosystem Do You Live In? article'],
        notes: [{ t: 'vocab', words: [['Biotic', 'Living (or once living) parts of an ecosystem.', 'hemlock tree, bird, mushroom, a fallen log'], ['Abiotic', 'Nonliving parts of an ecosystem.', 'sunlight, water, rocks, soil, temperature']] }, { t: 'tip', html: '<b>Tip:</b> “A-” means “not.” <b>A</b>biotic = <b>not</b> living.' }],
        practice: [{ type: 'sort', q: 'Sort the factors in a hemlock forest.', bins: ['Biotic', 'Abiotic'], items: [['hemlock tree', 0], ['brook trout', 0], ['moss', 0], ['mushroom', 0], ['sunlight', 1], ['stream water', 1], ['rocks', 1], ['temperature', 1]], why: 'Biotic = living; abiotic = nonliving.' }, { q: 'Is a fallen dead log biotic or abiotic?', choices: ['Biotic (it was once living)', 'Abiotic'], answer: 0, why: 'Things that were once living count as biotic.' }],
        exit: [{ q: 'Which is abiotic?', choices: ['Soil', 'Squirrel', 'Fern'], answer: 0, why: 'Soil minerals are nonliving.' }, { q: 'Which is biotic?', choices: ['A beetle', 'Rain', 'Sunlight'], answer: 0, why: 'A beetle is alive.' }]
      },
      {
        n: 6, section: 'Part 1: Ecosystems (LS.5.2.1)', title: 'Terrestrial Ecosystems', phenom: PHEN,
        goal: 'Let’s compare forests and grasslands.',
        stds: [S1], targets: ['I can compare the characteristics of forests and grasslands.', 'I can explain which populations each can support.'],
        vocab: [['terrestrial', 'On land.'], ['forest', 'An ecosystem with many trees.'], ['grassland', 'An ecosystem with mostly grasses and few trees.']],
        outline: [ex('Engage', 'Forest Ecosystem Gizmo.'), ex('Explore', 'Terrestrial Ecosystem jigsaw: forests and grasslands.'), ex('Explain', 'Compare in a chart.')],
        materials: ['Terrestrial Ecosystem jigsaw', 'Forest Ecosystem Gizmo task card'],
        notes: [{ t: 'fig', table: { caption: 'Compare land ecosystems', head: ['', 'Forest', 'Grassland'], leftCol: true, rows: [['Plants', 'many trees, shrubs, moss', 'grasses, wildflowers, few trees'], ['Rain', 'plenty', 'medium, dry seasons'], ['Animals', 'deer, bears, owls, salamanders', 'bison, prairie dogs, hawks'], ['Shelter', 'trees, logs, leaf litter', 'burrows, tall grass']] } }],
        practice: [{ q: 'Which ecosystem has the most trees?', choices: ['Forest', 'Grassland'], answer: 0, why: 'Forests are full of trees.' }, { q: 'Prairie dogs live in burrows in open land. Which ecosystem fits?', choices: ['Grassland', 'Forest'], answer: 0, why: 'Open grassy land.' }, { q: 'Why can a forest support many kinds of animals?', choices: ['It has lots of food, water and shelter.', 'It is always cold.'], answer: 0, why: 'More resources support more populations.' }],
        exit: [{ q: '“Terrestrial” means…', choices: ['on land', 'in water'], answer: 0, why: 'Terra = earth.' }]
      },
      {
        n: 7, section: 'Part 1: Ecosystems (LS.5.2.1)', title: 'Freshwater Ecosystems', phenom: PHEN,
        goal: 'Let’s compare rivers, streams, lakes and ponds.',
        stds: [S1], targets: ['I can compare flowing and still freshwater ecosystems.', 'I can explain what populations they support.'],
        vocab: [['aquatic', 'In water.'], ['freshwater', 'Water with very little salt.'], ['river/stream', 'Moving fresh water.'], ['lake/pond', 'Still fresh water.']],
        outline: [ex('Engage', 'Why do brook trout need shady, cold streams?'), ex('Explore', 'Freshwater Ecosystems article.'), ex('Explain', 'Compare flowing vs. still water.')],
        materials: ['Freshwater Ecosystems article', 'Science notebook'],
        notes: [{ t: 'p', html: '<p><b>Rivers and streams</b> flow, so the water has lots of oxygen. <b>Lakes and ponds</b> are still. In the Appalachians, hemlocks shade mountain streams and keep the water <b>cold</b> — and brook trout need cold water.</p>' }, { t: 'fill', html: 'Rivers and streams have [[moving|flowing]] water. Lakes and ponds have [[still]] water. Hemlocks keep streams [[cold|cool|shady]].' }],
        practice: [{ type: 'sort', q: 'Flowing or still water?', bins: ['Rivers and streams', 'Lakes and ponds'], items: [['water moves downhill', 0], ['brook trout in cold rapids', 0], ['lily pads float on calm water', 1], ['frogs lay eggs at the edge of still water', 1]], why: 'Flowing vs. still.' }, { q: 'If hemlocks die and stop shading a stream, what might happen to the water?', choices: ['It gets warmer.', 'It gets saltier.', 'Nothing.'], answer: 0, why: 'Less shade means more sun on the water.' }],
        exit: [{ q: 'Which is a freshwater ecosystem?', choices: ['A pond', 'The ocean'], answer: 0, why: 'Ponds are fresh water.' }, { q: '“Aquatic” means…', choices: ['in water', 'on land'], answer: 0, why: 'Aqua = water.' }]
      },
      {
        n: 8, section: 'Part 1: Ecosystems (LS.5.2.1)', title: 'Saltwater Ecosystems', phenom: PHEN,
        goal: 'Let’s compare oceans, estuaries and salt marshes.',
        stds: [S1], targets: ['I can describe oceans, estuaries and salt marshes.', 'I can explain why estuaries support so many populations.'],
        vocab: [['ocean', 'A huge body of salt water.'], ['estuary', 'Where a river meets the ocean; fresh and salt water mix.'], ['salt marsh', 'A wetland along the coast covered by tides.']],
        outline: [ex('Engage', 'Ocean Ecosystem choice board.'), ex('Explore', 'Ocean Ecosystems and The Chesapeake Bay articles; Ocean infographic.'), ex('Explain', 'Compare saltwater ecosystems.')],
        materials: ['Ocean Ecosystems article', 'The Chesapeake Bay article', 'Ocean infographic labels & pictures', 'Ocean Ecosystem choice board'],
        notes: [{ t: 'p', html: '<p>North Carolina has <b>estuaries</b> like the Pamlico Sound, where rivers meet the ocean. The mix of fresh and salt water, plus shallow water and marsh grass, makes estuaries <b>nurseries</b> for young fish, crabs and shrimp.</p>' }, { t: 'fill', html: 'An [[estuary]] is where a river meets the ocean. Water there is a mix of fresh and [[salt|salty]] water.' }],
        practice: [{ q: 'Where does fresh water mix with salt water?', choices: ['An estuary', 'A lake', 'A grassland'], answer: 0, why: 'Rivers flow into the sea there.' }, { q: 'Why are estuaries called “nurseries”?', choices: ['Many young fish and crabs grow up there.', 'Babies are born in hospitals there.'], answer: 0, why: 'Shallow, food-rich water protects young animals.' }, { type: 'sort', q: 'Fresh or salt water?', bins: ['Freshwater', 'Saltwater'], items: [['mountain stream', 0], ['pond', 0], ['ocean', 1], ['salt marsh', 1]], why: 'Streams and ponds are fresh; oceans and salt marshes are salty.' }],
        exit: [{ q: 'A salt marsh is…', choices: ['a coastal wetland covered by tides', 'a mountain forest'], answer: 0, why: 'Salt marshes are along the coast.' }]
      },
      {
        n: 9, section: 'Part 1: Ecosystems (LS.5.2.1)', title: 'Ecosystems CER', phenom: PHEN,
        goal: 'Let’s use evidence to support the claim: when hemlocks die, it affects the entire forest community.',
        stds: [S1, SEPa], targets: ['I can support a claim with evidence and reasoning.'],
        vocab: [['claim', 'Your answer.'], ['evidence', 'Facts that support it.'], ['reasoning', 'The science idea that connects them.']],
        outline: [ex('Read', 'Gray Ghost page 2: The importance of hemlock trees.'), ex('Write', 'Ecosystems CER.'), ex('Share', 'Peer feedback.')],
        materials: ['The Gray Ghost (page 2 extension)', 'Ecosystems CER handout', 'Optional: LS.5.2.1 assessment'],
        notes: [{ t: 'example', title: 'Sample CER', steps: ['<b>Claim:</b> When hemlocks die, it affects the entire forest community.', '<b>Evidence:</b> Hemlocks shade streams. Without shade, water warms. Brook trout need cold water. Birds nest in hemlocks.', '<b>Reasoning:</b> Organisms survive only where their needs are met. When the hemlocks die, needs like shade, cold water and shelter are no longer met.'] }, { t: 'write', q: 'Write your own CER.', rows: 6, ph: 'Claim: …\nEvidence: …\nReasoning: …' }],
        practice: [{ q: 'Which is <b>evidence</b> for the claim?', choices: ['Brook trout need cold, shaded streams.', 'Hemlocks are pretty.', 'I like forests.'], answer: 0, why: 'It is a fact connected to the claim.' }, { q: 'Which is the <b>reasoning</b>?', choices: ['Organisms can only survive where their needs are met.', 'Hemlocks are tall.'], answer: 0, why: 'It is the science rule.' }],
        exit: [{ q: 'If hemlocks die, birds that nest in them might…', choices: ['lose their homes', 'get more homes'], answer: 0, why: 'Their shelter need is not met.' }]
      },
      {
        n: 10, section: 'Part 2: Roles in an Ecosystem (LS.5.2.2)', title: 'Producers, Consumers and Decomposers', phenom: PHEN,
        goal: 'Let’s describe the roles of producers, consumers and decomposers.',
        stds: [S2], targets: ['I can classify organisms as producers, consumers or decomposers.'],
        vocab: [['producer', 'Makes its own food using sunlight (plants).'], ['consumer', 'Eats other organisms for energy (animals).'], ['decomposer', 'Breaks down dead things and returns nutrients to the soil (fungi, bacteria, some worms).']],
        outline: [ex('Engage', 'Where does a hemlock get its food? Where does an owl get its food?'), ex('Explore', 'Producer/Consumer/Decomposer sort.'), ex('Explain', 'Notes on the three roles.')],
        materials: ['Producer/Consumer/Decomposer sorting cards'],
        notes: [{ t: 'vocab', words: [['Producer', 'Makes its own food from sunlight.', 'hemlock, grass, moss'], ['Consumer', 'Gets energy by eating other organisms.', 'deer, owl, brook trout, hemlock woolly adelgid'], ['Decomposer', 'Breaks down dead organisms and waste. Returns nutrients to the soil.', 'mushrooms, bacteria']] }, { t: 'reveal', q: 'Is the hemlock woolly adelgid (the tiny insect killing hemlocks) a producer or a consumer?', a: 'A <b>consumer</b>. It sucks sap (food) from hemlock needles. It cannot make its own food.' }],
        practice: [{ type: 'sort', q: 'Classify each organism.', bins: ['Producer', 'Consumer', 'Decomposer'], items: [['hemlock tree', 0], ['rhododendron', 0], ['black bear', 1], ['brook trout', 1], ['mushroom', 2], ['bacteria', 2]], why: 'Plants produce; animals consume; fungi and bacteria decompose.' }, { q: 'Where do producers get energy?', choices: ['Sunlight', 'Eating animals', 'Dead leaves'], answer: 0, why: 'They make food from sunlight.' }],
        lab: { type: 'link', title: 'Hemlock Forest Food Web Lab', intro: 'Open the Food Web lab. Classify each organism by its role.', href: WEB, btn: 'Open the Food Web lab' },
        exit: [{ q: 'A mushroom growing on a dead log is a…', choices: ['decomposer', 'producer', 'consumer'], answer: 0, why: 'It breaks down the dead log.' }, { q: 'A deer eating leaves is a…', choices: ['consumer', 'producer'], answer: 0, why: 'It eats to get energy.' }]
      },
      {
        n: 11, section: 'Part 2: Roles in an Ecosystem (LS.5.2.2)', title: 'Decomposer Detectives', phenom: PHEN,
        goal: 'Let’s describe why decomposers are so important.',
        stds: [S2], targets: ['I can explain what decomposers do.', 'I can explain what would happen without them.'],
        vocab: [['decompose', 'To break down.'], ['nutrients', 'Materials living things need to grow.']],
        outline: [ex('Engage', 'What happens to a log on the forest floor over 10 years?'), ex('Explore', 'Decomposer Detective worksheet; The Role of Decomposers article.'), ex('Explain', 'What if there were no decomposers?')],
        materials: ['Decomposer Detective worksheet', 'The Role of Decomposers article'],
        notes: [{ t: 'p', html: '<p>Decomposers are nature’s <b>recyclers</b>. They break down dead plants and animals and return <b>nutrients</b> to the soil. Producers use those nutrients to grow.</p>' }, { t: 'fill', html: 'Decomposers break down [[dead]] things and return [[nutrients|nutrient]] to the soil.' }],
        practice: [{ q: 'What would happen if there were no decomposers?', choices: ['Dead things would pile up and soil would lose nutrients.', 'Plants would grow faster.', 'Nothing would change.'], answer: 0, why: 'Nutrients would stay locked in dead things.' }, { q: 'Who uses the nutrients decomposers return to the soil?', choices: ['Producers (plants)', 'Only bears'], answer: 0, why: 'Plants take up nutrients through roots.' }],
        exit: [{ q: 'Decomposers are like…', choices: ['recyclers', 'builders of houses'], answer: 0, why: 'They recycle nutrients.' }]
      },
      {
        n: 12, section: 'Part 2: Roles in an Ecosystem (LS.5.2.2)', title: 'Food Chains and Food Webs', phenom: PHEN,
        goal: 'Let’s model how energy moves through a food chain and food web.',
        stds: [S2, SEPm], targets: ['I can build a food chain with arrows that show energy flow.', 'I can explain a simple food web.'],
        vocab: [['food chain', 'One path of energy from a producer to consumers.'], ['food web', 'Many food chains connected together.'], ['energy', 'What living things need to grow and move.']],
        outline: [ex('Engage', 'Food chain cards: put them in order.'), ex('Explore', 'What is a Food Chain? and Food Webs articles.'), ex('Explain', 'Build a hemlock forest food web.')],
        materials: ['Food chain cards', 'What is a Food Chain? article', 'Food Webs article', 'Constructed Response: Food Web'],
        notes: [{ t: 'key', label: 'Arrows show energy', html: '<p style="margin:0">The arrow points <b>to the one that eats</b> (where the energy goes):<br>sun → hemlock → adelgid → beetle → bird</p>' }, { t: 'fill', html: 'Every food chain starts with the [[sun]] and a [[producer]]. Arrows show which way [[energy]] moves.' }],
        practice: [{ q: 'Which food chain is in the right order?', choices: ['grass → rabbit → fox', 'fox → rabbit → grass', 'rabbit → grass → fox'], answer: 0, why: 'Energy flows from producer to consumers.' }, { q: 'In “acorn → squirrel → hawk,” what does the arrow from squirrel to hawk mean?', choices: ['Energy moves from the squirrel to the hawk (the hawk eats the squirrel).', 'The squirrel eats the hawk.'], answer: 0, why: 'Arrows point to the eater.' }, { q: 'What is a food web?', choices: ['Many connected food chains', 'A spider’s web'], answer: 0, why: 'Organisms eat and are eaten by more than one thing.' }],
        lab: { type: 'link', title: 'Hemlock Forest Food Web Lab', intro: 'Build the food web and see what happens when hemlocks disappear.', href: WEB, btn: 'Open the Food Web lab' },
        exit: [{ q: 'Where does almost all the energy in a food chain come from?', choices: ['The sun', 'The soil', 'Water'], answer: 0, why: 'Producers capture sunlight energy.' }]
      },
      {
        n: 13, section: 'Part 3: Changes in Ecosystems (LS.5.2.3)', title: 'When the Ecosystem Changes', phenom: PHEN,
        goal: 'Let’s predict how changes in an ecosystem affect the organisms in it.',
        stds: [S3, SEPm], targets: ['I can use a model to predict what happens when one population changes.', 'I can explain how a new species (like the adelgid) can upset an ecosystem.'],
        vocab: [['invasive species', 'A living thing brought to a new place that harms it.'], ['stable', 'Staying about the same.'], ['increase / decrease', 'Go up / go down.']],
        outline: [ex('Engage', 'Read about the hemlock woolly adelgid.'), ex('Explore', 'Use a food web to predict: what if hemlocks disappear?'), ex('Explain', 'Graph hemlock data. Update your model.')],
        materials: ['Gray Ghost passage', 'Food web models', 'Science notebook'],
        notes: [{ t: 'p', html: '<p>The <b>hemlock woolly adelgid</b> is a tiny insect from Asia. It arrived in the United States and has <b>no natural predators</b> here, so its population grows fast. It sucks sap from hemlocks until the trees die.</p>' }, { t: 'fig', linegraph: { title: 'Healthy Hemlocks in a Forest Plot', xs: ['2000', '2004', '2008', '2012', '2016', '2020'], vals: [100, 92, 70, 45, 30, 25], step: 20, max: 100, yLabel: 'Healthy trees' }, caption: 'Example data: healthy hemlocks decreased after the adelgid arrived.' }],
        practice: [{ q: 'Use the graph. How many healthy hemlocks were lost from 2000 to 2020?', answer: 75, why: '100 − 25 = 75.' }, { q: 'Hemlocks die and streams get warmer. What happens to the brook trout population?', choices: ['It decreases.', 'It increases.', 'It stays the same.'], answer: 0, why: 'Their need for cold water isn’t met.' }, { q: 'Why can an invasive species upset an ecosystem?', choices: ['It may have no predators, so its population grows out of control.', 'It is always bigger than other animals.'], answer: 0, why: 'Nothing keeps its population in check.' }],
        lab: { type: 'graph', mode: 'linegraph', title: 'Brook Trout in a Mountain Stream', lead: 'Graph the data, then predict.', intro: 'Here is example data for brook trout in one stream as nearby hemlocks died. Make a line graph.', table: { head: ['Year', 'Trout'], rows: [['2005', 60], ['2010', 52], ['2015', 40], ['2020', 32]] }, xs: ['2005', '2010', '2015', '2020'], vals: [60, 52, 40, 32], step: 4, yMax: 64, yLabel: 'Number of trout', xLabel: 'Year',
          after: [{ q: 'Did the trout population increase or decrease?', choices: ['Decrease', 'Increase'], answer: 0, why: '60 → 32.' }, { q: 'How many fewer trout were there in 2020 than in 2005?', answer: 28, why: '60 − 32 = 28.' }] },
        exit: [{ q: 'If all the hemlocks disappeared, which would most likely happen?', choices: ['Animals that depend on hemlocks would decrease.', 'Every population would increase.'], answer: 0, why: 'They lose food, shelter or shade.' }, { q: 'The adelgid is a(n)…', choices: ['invasive species', 'producer'], answer: 0, why: 'It came from another continent and harms hemlocks.' }]
      },
      {
        n: 14, section: 'Wrap-Up', title: 'Review and Assessment', phenom: PHEN,
        goal: 'Let’s revise our models and review the unit.',
        stds: [S1, S2, S3], targets: ['I can explain what is happening to the hemlocks and how it affects the forest.'],
        vocab: [['review', 'Look back at what you learned.']],
        outline: [ex('Revise', 'Update your model of the hemlock forest.'), ex('Review', 'Practice on this page.'), ex('Assess', 'SchoolNet Unit 3 assessment.')],
        materials: ['Initial models', 'Unit 3 slideshow review'],
        notes: [{ t: 'key', label: 'Big ideas', html: '<ol style="margin:0"><li>Ecosystems have biotic and abiotic parts. Organisms live where their needs are met.</li><li>Producers, consumers and decomposers each have a role. Energy flows from the sun through food chains.</li><li>A change to one population (like hemlocks) affects the whole ecosystem.</li></ol>' }],
        practice: [{ q: 'Which is abiotic?', choices: ['Sunlight', 'Moss'], answer: 0, why: 'Not living.' }, { q: 'An estuary is where…', choices: ['a river meets the ocean', 'a forest meets a grassland'], answer: 0, why: 'Fresh and salt water mix.' }, { type: 'sort', q: 'Classify.', bins: ['Producer', 'Consumer', 'Decomposer'], items: [['fern', 0], ['salamander', 1], ['bacteria', 2]], why: 'Roles in an ecosystem.' }, { q: 'Why did brook trout decrease near dead hemlocks?', choices: ['Streams got warmer without shade.', 'Trout ate the hemlocks.'], answer: 0, why: 'Trout need cold water.' }],
        lab: { type: 'sketch', title: 'My Revised Model', intro: 'Redraw the hemlock forest. Show the adelgid, producers, consumers, decomposers, and how losing hemlocks affects the forest.', checklist: ['I showed the adelgid and the hemlocks.', 'I labeled producers, consumers and decomposers.', 'I used arrows to show energy flow.', 'I showed at least one effect of hemlocks dying.'] },
        exit: [{ q: 'Arrows in a food chain show…', choices: ['the flow of energy', 'who is bigger'], answer: 0, why: 'Energy moves to the eater.' }, { q: 'All the populations in an area make a…', choices: ['community', 'organism'], answer: 0, why: 'Community = all populations.' }]
      }
    ]
  });
})();
