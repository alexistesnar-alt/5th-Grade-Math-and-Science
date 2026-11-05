/* Science · Unit 2: Paws, Patterns and Pedigrees — 11 tasks (about 3 weeks). LS.5.3.1, LS.5.3.2.
   Anchoring phenomenon: a litter of puppies playing with their mother — the puppies look different from each other.
   To change words: edit the text inside the quotes. Keep the commas and brackets. */
(function () {
  var S31 = ['LS.5.3.1', 'Ask questions to compare instincts and learned behaviors.'];
  var S32 = ['LS.5.3.2', 'Ask questions to compare inherited and acquired traits.'];
  var SEPq = ['SEP', 'Asking questions'], SEPm = ['SEP', 'Developing and using models'], SEPe = ['SEP', 'Constructing explanations'];
  var PHEN = 'A mother dog plays with her litter of puppies. Some puppies are brown, some are cream, some have spots. They all have the same parents. <b>Why do the puppies look different from each other — and from their mom?</b>';
  var TRAITLAB = '../../lab/traits-sort.html';
  var ex = function (t, m) { return [t, 0, m]; };

  LessonKit.unit({
    id: 'sci-u2', subject: 'science', short: 'Unit 2', title: 'Paws, Patterns and Pedigrees', home: '../index.html', unitHref: '../unit2.html', word: 'Task',
    lessons: [
      {
        n: 1, section: 'Launch: The Anchoring Phenomenon', title: 'A Litter of Puppies', phenom: PHEN,
        goal: 'Let’s observe a litter of puppies and ask questions about how they look and act.',
        stds: [S32, SEPq],
        targets: ['I can describe how the puppies are alike and different.', 'I can ask questions about why.'],
        vocab: [['litter', 'A group of babies born to one mother at the same time.'], ['trait', 'A feature of a living thing, like fur color.'], ['offspring', 'The babies of a parent.']],
        outline: [ex('Engage', 'Watch the puppies video.'), ex('Notice & Wonder', 'Make a notice and wonder chart about the puppies and their mom.'), ex('Share', 'Share with your group. Add new ideas in a different color.')],
        materials: ['Unit 2 slideshow (puppies video)', 'Science notebook'],
        notes: [
          { t: 'p', html: '<p>A <b>trait</b> is a feature of a living thing: fur color, ear shape, size. Puppies from the same parents can have different traits. This unit we will find out why.</p>' },
          { t: 'write', q: '<b>I notice…</b> How are the puppies alike? How are they different?', ph: 'I notice two puppies have spots…' },
          { t: 'write', q: '<b>I wonder…</b>', ph: 'I wonder why…' }
        ],
        practice: [
          { type: 'sort', q: 'Notice or wonder?', bins: ['I notice', 'I wonder'], items: [['One puppy is cream and the mom is brown.', 0], ['Three puppies have floppy ears.', 0], ['The puppies follow their mom.', 0], ['Why is one puppy a different color?', 1], ['Did the puppies learn to follow their mom?', 1], ['Will the puppies grow as big as the mom?', 1]], why: 'Notices are observations. Wonders are questions.' },
          { q: 'What is a <b>trait</b>?', choices: ['A feature of a living thing, like eye color', 'A kind of food', 'A place animals live'], answer: 0, why: 'Traits are features like color, shape and size.' }
        ],
        exit: [
          { q: 'What are offspring?', choices: ['The babies of a parent', 'The parents of a baby', 'A kind of plant'], answer: 0, why: 'Puppies are the offspring of the mother dog.' },
          { q: 'Which is a trait you can see in a puppy?', choices: ['Fur color', 'Its name', 'Its favorite toy'], answer: 0, why: 'Fur color is a physical feature.' }
        ]
      },
      {
        n: 2, section: 'Launch: The Anchoring Phenomenon', title: 'Initial Model', phenom: PHEN,
        goal: 'Let’s draw our first model to explain why the puppies look the way they do.',
        stds: [S32, SEPm],
        targets: ['I can draw a model that shows my ideas right now.', 'I can label traits on my model.'],
        vocab: [['model', 'A drawing that shows how something works.']],
        outline: [ex('Review', 'Look at your notice and wonder chart.'), ex('Model', 'Draw the mom and her puppies. Show where you think each puppy’s traits come from. Label.'), ex('Share', 'Compare models with a partner.')],
        materials: ['Science notebook', 'Colored pencils'],
        notes: [{ t: 'key', label: 'Your model should show', html: '<ul style="margin:0"><li>the mom and at least 3 puppies</li><li>labels for traits (fur color, ears, size…)</li><li>arrows and words for where you think traits come from</li></ul>' }],
        practice: [{ q: 'Why do we make an initial model?', choices: ['To show our ideas now, so we can change them as we learn', 'To get a grade', 'To copy the teacher'], answer: 0, why: 'Our models grow with new evidence.' }],
        lab: { type: 'sketch', title: 'My Initial Model', intro: 'Draw the mom and her puppies. Show where you think the puppies’ traits come from. Use the <b>Label</b> tool.', checklist: ['I drew the mom and at least 3 puppies.', 'I labeled traits.', 'I showed where I think traits come from.'] },
        exit: [{ q: 'An initial model shows…', choices: ['what I think right now', 'the final correct answer'], answer: 0, why: 'We will revise it later.' }]
      },
      {
        n: 3, section: 'Launch: The Anchoring Phenomenon', title: 'Driving Question Board', phenom: PHEN,
        goal: 'Let’s organize our questions about the puppies into a Driving Question Board.',
        stds: [S31, S32, SEPq],
        targets: ['I can write questions about the puppies.', 'I can help group our class questions.'],
        vocab: [['Driving Question Board', 'A chart of our questions that guides the unit.']],
        outline: [ex('Write', 'One question per sticky note.'), ex('Scientists Circle', 'Share and group similar questions.'), ex('Organize', 'Name each group of questions.')],
        materials: ['Chart paper', 'Sticky notes'],
        notes: [{ t: 'write', q: 'Write 3 questions about the puppies.', rows: 4, ph: '1. Why…\n2. How…\n3. Did…' }],
        practice: [{ type: 'sort', q: 'Group these questions.', bins: ['How they look (traits)', 'How they act (behaviors)'], items: [['Why are some puppies spotted?', 0], ['Why is one puppy bigger?', 0], ['Why do the puppies drink milk right after birth?', 1], ['Who taught the puppies to sit?', 1]], why: 'Some questions are about traits; some are about behaviors.' }],
        exit: [{ q: 'What do we use the Driving Question Board for?', choices: ['To guide what we investigate', 'To keep score'], answer: 0, why: 'It organizes our questions.' }]
      },
      {
        n: 4, section: 'Part 1: Instincts and Learned Behaviors (LS.5.3.1)', title: 'Instinct or Learned Behavior?', when: '2 days', phenom: PHEN,
        goal: 'Let’s tell the difference between instincts and learned behaviors in animals and plants.',
        stds: [S31],
        targets: ['I can give examples of instincts.', 'I can give examples of learned behaviors.', 'I can explain the difference.'],
        vocab: [['behavior', 'The way a living thing acts.'], ['instinct', 'A behavior a living thing is born knowing how to do.'], ['learned behavior', 'A behavior a living thing learns by watching, practicing or being taught.']],
        outline: [ex('Engage', 'A newborn puppy finds its mom’s milk with its eyes closed. Who taught it?'), ex('Explore', 'Gallery walk: Instinct vs. Learned Behavior pictures. Record in the gallery walk table.'), ex('Explain', 'Sort behaviors. Write the difference in your own words.'), ex('Evaluate', 'Exit ticket.')],
        materials: ['Instinct vs. Learned Behavior gallery walk', 'Gallery walk table', 'Multi-flow map'],
        notes: [
          { t: 'vocab', words: [['Instinct', 'A behavior an animal is <b>born</b> knowing. No one teaches it.', 'A spider spins a web. A baby sea turtle crawls to the ocean.'], ['Learned behavior', 'A behavior an animal <b>learns</b> by practice, watching or being taught.', 'A dog learns to sit. A child learns to ride a bike.']] },
          { t: 'key', label: 'Ask yourself', html: '<p style="margin:0">Could the animal do it <b>right after it was born</b>, without being taught? → <b>instinct</b>. Did it need to be taught, practice, or watch others? → <b>learned</b>.</p>' },
          { t: 'fill', html: 'A behavior an animal is born knowing is an [[instinct]]. A dog learning to fetch is a [[learned]] behavior.' },
          { t: 'tip', html: '<b>Plants have instinct-like behaviors too:</b> roots grow down and stems grow toward light. No one teaches a plant!' }
        ],
        practice: [
          { type: 'sort', q: 'Sort each behavior.', bins: ['Instinct', 'Learned behavior'], items: [['A baby bird opens its mouth for food', 0], ['A spider spins a web', 0], ['Geese fly south for the winter', 0], ['A puppy learns its name', 1], ['A parrot says “hello”', 1], ['A horse learns to jump a fence', 1]], hint: 'Was it born knowing how, or was it taught?', why: 'Instincts are inborn. Learned behaviors come from practice or teaching.' },
          { q: 'A newborn kangaroo crawls into its mother’s pouch. This is…', choices: ['an instinct', 'a learned behavior'], answer: 0, why: 'It is born knowing how.' },
          { q: 'A dog sits when it hears “sit.” This is…', choices: ['a learned behavior', 'an instinct'], answer: 0, why: 'Someone taught it.' },
          { q: 'Which is an instinct in a <b>plant</b>?', choices: ['Stems growing toward sunlight', 'Learning to grow in a pot', 'Being watered'], answer: 0, why: 'Plants grow toward light without being taught.' }
        ],
        lab: { type: 'link', title: 'Traits and Behaviors Sort', intro: 'Open the Traits and Behaviors Sort lab and do the <b>behaviors</b> part.', href: TRAITLAB, btn: 'Open the sort lab' },
        exit: [
          { q: 'What is the difference between an instinct and a learned behavior?', choices: ['Instincts are inborn; learned behaviors are taught or practiced.', 'Instincts are taught; learned behaviors are inborn.', 'There is no difference.'], answer: 0, why: 'Born knowing vs. learned.' },
          { q: 'A bear catching fish after watching its mother is…', choices: ['a learned behavior', 'an instinct'], answer: 0, why: 'It learned by watching.' },
          { q: 'A baby crying when hungry is…', choices: ['an instinct', 'a learned behavior'], answer: 0, why: 'Babies are born doing it.' }
        ]
      },
      {
        n: 5, section: 'Part 2: Inherited and Acquired Traits (LS.5.3.2)', title: 'Inherited or Acquired Trait?', when: '2 days', phenom: PHEN,
        goal: 'Let’s explore how puppies get traits like fur color from their parents, and how some traits come from the environment.',
        stds: [S32],
        targets: ['I can give examples of inherited traits.', 'I can give examples of acquired traits.', 'I can explain the difference.'],
        vocab: [['inherited trait', 'A trait passed from parents to offspring.'], ['acquired trait', 'A trait a living thing gets during its life from its environment or actions.'], ['environment', 'Everything around a living thing.']],
        outline: [ex('Engage', 'The mom dog has brown fur. One puppy has a short haircut. Did it get the haircut from its mom?'), ex('Explore', 'Inheritance Gizmo: inherited vs. acquired traits task cards.'), ex('Explain', 'Sort traits. Write the difference in your notebook.'), ex('Evaluate', 'Exit ticket.')],
        materials: ['Inheritance Gizmo task card: Inherited vs. Acquired Traits', 'Task cards', 'Science notebook'],
        notes: [
          { t: 'vocab', words: [['Inherited trait', 'Passed down from parents. You are born with it.', 'eye color, fur color, leaf shape, tongue rolling'], ['Acquired trait', 'Gotten during life from the environment or what you do.', 'a scar, a haircut, a flamingo turning pink from its food, knowing how to read']] },
          { t: 'key', label: 'Ask yourself', html: '<p style="margin:0">Did it come from the <b>parents</b>? → inherited. Did it come from <b>the environment or life experiences</b>? → acquired. Acquired traits are <b>not</b> passed to offspring.</p>' },
          { t: 'reveal', q: 'Flamingos are pink. Is that inherited or acquired?', a: 'Acquired! Flamingos turn pink from pigments in the shrimp and algae they eat. A flamingo that eats different food can be pale.' },
          { t: 'fill', html: 'Eye color is an [[inherited]] trait. A scar is an [[acquired]] trait. Acquired traits are not passed to [[offspring|babies|children]].' }
        ],
        practice: [
          { type: 'sort', q: 'Sort each trait.', bins: ['Inherited', 'Acquired'], items: [['A puppy’s fur color', 0], ['A tiger’s stripes', 0], ['The shape of a leaf', 0], ['A dog’s torn ear from a fight', 1], ['A short haircut', 1], ['Knowing how to swim', 1]], hint: 'Did the parents pass it on, or did it happen during life?', why: 'Inherited traits come from parents. Acquired traits come from the environment or experience.' },
          { q: 'A cat has green eyes like its father. This trait is…', choices: ['inherited', 'acquired'], answer: 0, why: 'It came from a parent.' },
          { q: 'A tree has a broken branch after a storm. This is…', choices: ['acquired', 'inherited'], answer: 0, why: 'The storm (environment) caused it.' },
          { q: 'Will a dog with a scar have puppies with scars?', choices: ['No, acquired traits are not passed on.', 'Yes, all traits are passed on.'], answer: 0, why: 'Only inherited traits are passed to offspring.' }
        ],
        lab: { type: 'link', title: 'Traits and Behaviors Sort', intro: 'Open the Traits and Behaviors Sort lab and do the <b>traits</b> part.', href: TRAITLAB, btn: 'Open the sort lab' },
        exit: [
          { q: 'Which is an inherited trait?', choices: ['Natural hair color', 'A tattoo', 'A broken arm'], answer: 0, why: 'Natural hair color comes from parents.' },
          { q: 'Which is an acquired trait?', choices: ['Strong muscles from exercise', 'Freckles from birth', 'Eye color'], answer: 0, why: 'Exercise is something you do during life.' },
          { q: 'Where do inherited traits come from?', choices: ['Parents', 'The environment', 'Practice'], answer: 0, why: 'They are passed down from parents.' }
        ]
      },
      {
        n: 6, section: 'Part 2: Inherited and Acquired Traits (LS.5.3.2)', title: 'Generations of Traits', phenom: PHEN,
        goal: 'Let’s explore how traits are passed down through generations, making families alike but each one unique.',
        stds: [S32, SEPq],
        targets: ['I can use a family tree to see how traits are passed down.', 'I can ask questions about patterns in families.'],
        vocab: [['generation', 'All the family members born around the same time (grandparents, parents, children).'], ['family tree (pedigree)', 'A chart that shows family members over generations.'], ['variation', 'Differences between living things of the same kind.']],
        outline: [ex('Engage', 'Look at a family of dogs over three generations. What patterns do you see?'), ex('Explore', 'Track a trait (like fur color) through a family tree.'), ex('Explain', 'Why can a trait skip a generation?'), ex('Elaborate', 'Update your model.')],
        materials: ['Family tree handouts', 'Science notebook'],
        notes: [
          { t: 'p', html: '<p>Traits are passed from <b>grandparents</b> to <b>parents</b> to <b>children</b>. That is why family members often look alike. But each child gets a different mix, so siblings are not exactly the same — that is <b>variation</b>.</p>' },
          { t: 'fig', html: TREE(), caption: 'A family tree. Grandpa had cream fur. His daughter is brown, but one of her puppies is cream again! The cream trait was “hidden” in the mom.' },
          { t: 'fill', html: 'Grandparents, parents and children are three [[generations|generation]]. Differences between siblings are called [[variation]].' }
        ],
        practice: [
          { q: 'Use the family tree. Which generation is the mom in?', choices: ['The middle (2nd) generation', 'The 1st generation', 'The 3rd generation'], answer: 0, why: 'Grandparents → mom → puppies.' },
          { q: 'The mom is brown, but one puppy is cream like the grandpa. How can that happen?', choices: ['The mom carried a hidden cream gene from grandpa and passed it on.', 'The puppy chose to be cream.', 'The puppy got cream fur from eating food.'], answer: 0, why: 'A trait can be hidden in a parent and show up again.' },
          { q: 'Why don’t brothers and sisters look exactly alike?', choices: ['Each gets a different mix of traits from the parents.', 'They have different parents.', 'Their traits are all acquired.'], answer: 0, why: 'Each offspring gets a different combination.' }
        ],
        exit: [
          { q: 'What is variation?', choices: ['Differences between living things of the same kind', 'Things that are exactly the same'], answer: 0, why: 'Variation means differences.' },
          { q: 'A family tree shows…', choices: ['traits passed through generations', 'what animals eat'], answer: 0, why: 'It tracks family members and traits.' }
        ]
      },
      {
        n: 7, section: 'Part 2: Inherited and Acquired Traits (LS.5.3.2)', title: 'A Recipe for Traits', phenom: PHEN,
        goal: 'Let’s see how genes from both parents act like a recipe for traits.',
        stds: [S32, SEPe],
        targets: ['I can explain that offspring get genes from both parents.', 'I can explain why offspring of the same parents can look different.'],
        vocab: [['DNA', 'The instructions inside cells for building a living thing.'], ['gene', 'A part of DNA that is the instruction for one trait.'], ['dominant', 'A gene that shows even if there is only one copy.'], ['recessive', 'A gene that shows only if there are two copies.']],
        outline: [ex('Engage', 'How can two brown dogs have a cream puppy?'), ex('Explore', 'A Recipe for Traits: flip coins for each parent’s gene and build a puppy.'), ex('Explain', 'Compare puppies across the class. Why are they all different?')],
        materials: ['A Recipe for Traits activity (Learn.Genetics)', 'Coins', 'Colored pencils'],
        notes: [
          { t: 'p', html: '<p>Inside every cell is <b>DNA</b>: a set of instructions, like a recipe. A <b>gene</b> is the part of the recipe for one trait. Every puppy gets <b>one gene from mom and one from dad</b> for each trait.</p>' },
          { t: 'key', label: 'Show or hide?', html: '<p style="margin:0">Some genes are <b>dominant</b> (they show if you get even one). Some are <b>recessive</b> (they only show if you get two). Two brown parents who each carry a hidden cream gene can have a cream puppy!</p>' },
          { t: 'fill', html: 'Offspring get one gene from each [[parent]]. A [[recessive]] trait shows only if you get two copies of the gene.' }
        ],
        practice: [
          { q: 'How many genes for each trait does a puppy get from its mom?', answer: 1, why: 'One from mom, one from dad.' },
          { q: 'Why can puppies from the same parents look different?', choices: ['Each puppy gets a different mix of genes.', 'Each puppy has different parents.', 'They eat different food.'], answer: 0, why: 'The coin flips (gene combinations) come out differently.' },
          { q: 'A puppy shows a recessive trait. How many recessive genes did it get?', answer: 2, why: 'Recessive traits need two copies.' }
        ],
        lab: { type: 'recipe', title: 'Recipe for Traits Lab', lead: 'Build a litter of puppies.', intro: 'Mom and Dad are both brown with floppy ears, long tails, spots and black noses — but each carries hidden genes. Flip the coins to make at least <b>4 puppies</b>.' },
        exit: [
          { q: 'Where do the genes for a puppy’s traits come from?', choices: ['Both parents', 'Only the mom', 'The environment'], answer: 0, why: 'One gene from each parent.' },
          { q: 'What is DNA?', choices: ['Instructions inside cells for building a living thing', 'A kind of food', 'A behavior'], answer: 0, why: 'DNA is like a recipe.' }
        ]
      },
      {
        n: 8, section: 'Part 2: Inherited and Acquired Traits (LS.5.3.2)', title: 'Mendel: The Father of Genetics', phenom: PHEN,
        goal: 'Let’s learn how Mendel’s pea plant experiments helped us understand inheritance.',
        stds: [S32, ['SEP', 'Obtaining, evaluating and communicating information']],
        targets: ['I can explain what Mendel discovered with pea plants.', 'I can tell inherited traits from traits that are not inherited.'],
        vocab: [['Gregor Mendel', 'A scientist (1822–1884) who studied how traits pass from pea plants to their offspring.'], ['genetics', 'The study of how traits are inherited.']],
        outline: [ex('Engage', 'Why would anyone grow 28,000 pea plants?'), ex('Explore', 'Read: Mendel and the Inheritance of Traits (Newsela).'), ex('Explain', 'What did Mendel find? Record evidence in your notebook.')],
        materials: ['Mendel and the Inheritance of Traits (Newsela article)', 'Science notebook'],
        notes: [
          { t: 'p', html: '<p><b>Gregor Mendel</b> was a scientist and monk who grew thousands of pea plants in the 1850s and 1860s. He crossed tall plants with short plants and purple flowers with white flowers, and he counted the offspring.</p>' },
          { t: 'example', title: 'What Mendel found', steps: ['When he crossed tall and short plants, all the first offspring were <b>tall</b>.', 'When those tall plants had offspring, about <b>1 in 4</b> were short again!', 'The short trait was hidden, not gone. Traits are passed on by “factors” — what we now call <b>genes</b>.'] },
          { t: 'fill', html: 'Mendel studied [[pea|peas|pea plants]] plants. He found that traits are passed on by factors we now call [[genes|gene]]. The study of inheritance is called [[genetics]].' }
        ],
        practice: [
          { type: 'sort', q: 'Is it inherited or not inherited?', bins: ['Inherited', 'Not inherited'], items: [['Height of a pea plant', 0], ['Color of petals', 0], ['Length of a cat’s tail', 0], ['A broken tree limb', 1], ['Length of a person’s hair after a haircut', 1], ['A broken tusk on an elephant', 1]], why: 'Traits from genes are inherited. Damage or changes during life are not.' },
          { q: 'What plants did Mendel study?', choices: ['Pea plants', 'Oak trees', 'Roses'], answer: 0, why: 'Pea plants grow fast and have clear traits.' },
          { q: 'Mendel crossed tall and short plants. The short trait disappeared, then came back in the next generation. This shows…', choices: ['traits can be hidden and still passed on', 'traits are acquired from soil'], answer: 0, why: 'The short gene was carried but hidden.' }
        ],
        exit: [
          { q: 'Why is Mendel called the father of genetics?', choices: ['His experiments showed how traits are passed down.', 'He invented dogs.', 'He discovered the heart.'], answer: 0, why: 'He found patterns of inheritance.' },
          { q: 'Which is <b>not</b> inherited?', choices: ['A scar', 'Eye color', 'Flower color'], answer: 0, why: 'A scar is acquired.' }
        ]
      },
      {
        n: 9, section: 'Part 2: Inherited and Acquired Traits (LS.5.3.2)', title: 'Don’t Hate on the Trait', phenom: PHEN,
        goal: 'Let’s use a text to explain traits with a claim, evidence and reasoning.',
        stds: [S32, SEPe],
        targets: ['I can use evidence from a text to explain whether a trait is inherited or acquired.', 'I can write a CER.'],
        vocab: [['claim', 'Your answer to the question.'], ['evidence', 'Facts from the text or data that support your claim.'], ['reasoning', 'Why the evidence supports the claim (the science idea).']],
        outline: [ex('Engage', 'Can you roll your tongue? Is that inherited or acquired?'), ex('Explore', 'Read Don’t Hate on the Trait.'), ex('Explain', 'Write a CER: Is a trait inherited or acquired?')],
        materials: ['Don’t Hate on the Trait (student copy)', 'Don’t Hate on the Trait CER handout'],
        notes: [
          { t: 'key', label: 'CER', html: '<ul style="margin:0"><li><b>Claim:</b> answer the question in one sentence.</li><li><b>Evidence:</b> facts from the text or data.</li><li><b>Reasoning:</b> the science rule that connects them.</li></ul>' },
          { t: 'example', title: 'Sample CER', q: 'Is a dog’s fur color inherited or acquired?', steps: ['<b>Claim:</b> Fur color is inherited.', '<b>Evidence:</b> The puppies have fur colors that match their mom, dad or grandparents.', '<b>Reasoning:</b> Inherited traits are passed from parents through genes, so offspring look like their family.'] },
          { t: 'write', q: 'Write a CER: Is a person’s ability to ride a bike inherited or acquired?', rows: 5, ph: 'Claim: …\nEvidence: …\nReasoning: …' }
        ],
        practice: [
          { q: 'Which part of a CER answers the question?', choices: ['Claim', 'Evidence', 'Reasoning'], answer: 0, why: 'The claim is your answer.' },
          { q: '“The puppy has spots like its father.” Which part of a CER is this?', choices: ['Evidence', 'Claim', 'Reasoning'], answer: 0, why: 'It is a fact you observed.' },
          { q: '“Inherited traits are passed from parents through genes.” Which part is this?', choices: ['Reasoning', 'Evidence', 'Claim'], answer: 0, why: 'It is the science rule that explains the evidence.' }
        ],
        exit: [
          { q: 'Mia can speak Spanish because her family taught her. This trait is…', choices: ['acquired (learned)', 'inherited'], answer: 0, why: 'Language is learned.' },
          { q: 'What does evidence do in a CER?', choices: ['Supports the claim', 'Asks a question', 'Tells a story'], answer: 0, why: 'Evidence backs up your claim.' }
        ]
      },
      {
        n: 10, section: 'Wrap-Up', title: 'Revisiting the Puppies', phenom: PHEN,
        goal: 'Let’s update our models and build a class consensus model.',
        stds: [S31, S32, SEPm],
        targets: ['I can revise my model with what I learned.', 'I can explain why the puppies look different.'],
        vocab: [['consensus model', 'A model the whole class agrees on.']],
        outline: [ex('Revisit', 'Look at your initial model and the DQB.'), ex('Revise', 'Update your model with genes, inherited traits, acquired traits and behaviors.'), ex('Consensus', 'Build a class model together.')],
        materials: ['Initial models', 'Chart paper'],
        notes: [
          { t: 'key', label: 'Explain the puppies', html: '<p style="margin:0">Each puppy got <b>one gene from mom and one from dad</b> for every trait. Different mixes → <b>variation</b>. Fur color and ear shape are <b>inherited</b>. Behaviors like finding milk are <b>instincts</b>; sitting on command is <b>learned</b>. A torn ear would be <b>acquired</b>.</p>' },
          { t: 'write', q: 'Answer the unit question: Why do the puppies look different from each other and their mom?', rows: 5, ph: 'The puppies look different because…' }
        ],
        practice: [
          { type: 'sort', q: 'Sort everything you learned.', bins: ['Inherited trait', 'Acquired trait', 'Instinct', 'Learned behavior'], items: [['spotted fur', 0], ['floppy ears', 0], ['a scar on the nose', 1], ['short fur after grooming', 1], ['drinking milk after birth', 2], ['following mom', 2], ['sitting on command', 3], ['walking on a leash', 3]], why: 'Traits are features; behaviors are actions.' }
        ],
        lab: { type: 'sketch', title: 'My Revised Model', intro: 'Draw the puppies again. Show genes from mom and dad, and label inherited traits, acquired traits, instincts and learned behaviors.', checklist: ['I showed genes coming from both parents.', 'I labeled at least 2 inherited traits.', 'I showed an acquired trait or learned behavior.', 'My model explains why the puppies look different.'] },
        exit: [{ q: 'Why do puppies in the same litter look different?', choices: ['Each got a different combination of genes from the parents.', 'They chose their colors.', 'They ate different food.'], answer: 0, why: 'Different gene combinations cause variation.' }]
      },
      {
        n: 11, section: 'Wrap-Up', title: 'Review and Assessment', phenom: PHEN,
        goal: 'Let’s review the unit and show what we know.',
        stds: [S31, S32],
        targets: ['I can compare instincts and learned behaviors.', 'I can compare inherited and acquired traits.'],
        vocab: [['review', 'Look back at what you learned.']],
        outline: [ex('Review', 'Practice on this page.'), ex('Assess', 'SchoolNet Unit 2 assessment.')],
        materials: ['Unit 2 slideshow review'],
        notes: [{ t: 'vocab', words: [['Instinct', 'Born knowing how.'], ['Learned behavior', 'Taught, practiced or watched.'], ['Inherited trait', 'Passed from parents through genes.'], ['Acquired trait', 'Gotten during life; not passed on.'], ['Gene', 'Instruction for a trait; one from each parent.'], ['Variation', 'Differences among the same kind of living thing.']] }],
        practice: [
          { q: 'A baby turtle crawling to the sea is…', choices: ['an instinct', 'a learned behavior'], answer: 0, why: 'Born knowing.' },
          { q: 'A trained dog shaking hands is…', choices: ['a learned behavior', 'an instinct'], answer: 0, why: 'It was taught.' },
          { q: 'Freckles you were born with are…', choices: ['inherited', 'acquired'], answer: 0, why: 'They come from genes.' },
          { q: 'Calluses on your hands from playing guitar are…', choices: ['acquired', 'inherited'], answer: 0, why: 'They come from what you do.' }
        ],
        exit: [
          { type: 'sort', q: 'Sort each example.', bins: ['Inherited trait', 'Acquired trait', 'Instinct', 'Learned behavior'], items: [['eye color', 0], ['a sunburn', 1], ['a spider spinning a web', 2], ['reading a book', 3]], why: 'Traits vs. behaviors; inborn vs. from life.' },
          { q: 'Can an acquired trait be passed to offspring?', choices: ['No', 'Yes'], answer: 0, why: 'Only inherited traits pass through genes.' },
          { q: 'Mendel studied inheritance using…', choices: ['pea plants', 'puppies'], answer: 0, why: 'He grew thousands of pea plants.' }
        ]
      }
    ]
  });
  function TREE() {
    var dog = function (x, y, c, label) { return '<circle cx="' + x + '" cy="' + y + '" r="20" fill="' + c + '" stroke="#3B2A1E" stroke-width="2"/><text x="' + x + '" y="' + (y + 36) + '" text-anchor="middle" font-size="12" font-family="Inter,sans-serif" fill="#1B2333">' + label + '</text>'; };
    var B = '#9A6233', C = '#EBD9B4';
    return '<svg viewBox="0 0 320 230" width="320" role="img" aria-label="Family tree: cream grandpa and brown grandma have a brown mom; mom and a brown dad have two brown puppies and one cream puppy">' +
      '<path d="M90 30 H230 M160 30 V95 M160 105 H230 M195 105 V150 M110 150 H280 M110 150 V165 M195 150 V165 M280 150 V165" stroke="#5B6475" stroke-width="2" fill="none"/>' +
      dog(90, 30, C, 'Grandpa') + dog(230, 30, B, 'Grandma') + dog(160, 105, B, 'Mom') + dog(230, 105, B, 'Dad') + dog(110, 185, B, 'Puppy 1') + dog(195, 185, C, 'Puppy 2') + dog(280, 185, B, 'Puppy 3') + '</svg>';
  }
})();
