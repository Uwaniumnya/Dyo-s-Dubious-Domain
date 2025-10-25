// Drug Interaction Checker JavaScript
// Comprehensive interaction database and checker functionality

class DrugInteractionChecker {
  constructor() {
    this.interactions = this.initializeInteractionDatabase();
    this.initializeEventListeners();
  }

  initializeInteractionDatabase() {
    return {
      // DEADLY COMBINATIONS - These can be fatal
      'alcohol+alprazolam': {
        risk: 'deadly',
        mechanism: 'Both substances are CNS depressants that act synergistically to suppress breathing and consciousness.',
        effects: ['Severe respiratory depression', 'Loss of consciousness', 'Coma', 'Death', 'Memory blackouts'],
        advice: ['NEVER combine these substances', 'Call emergency services if someone has taken both', 'Have naloxone available if opioids are involved', 'Monitor breathing and consciousness']
      },
      'alcohol+diazepam': {
        risk: 'deadly',
        mechanism: 'Alcohol and benzodiazepines both enhance GABA activity, causing dangerous CNS depression.',
        effects: ['Respiratory failure', 'Cardiac arrest', 'Coma', 'Severe sedation', 'Memory loss'],
        advice: ['Absolutely contraindicated', 'Seek immediate medical attention', 'Do not induce vomiting', 'Monitor vital signs']
      },
      'alcohol+clonazepam': {
        risk: 'deadly',
        mechanism: 'Potent benzodiazepine combined with alcohol creates life-threatening respiratory depression.',
        effects: ['Respiratory arrest', 'Coma', 'Death', 'Extreme sedation', 'Cardiovascular collapse'],
        advice: ['Emergency medical intervention required', 'Flumazenil may be considered by medical professionals', 'Airway management critical']
      },
      'alcohol+chlorodiazepoxide': {
        risk: 'deadly',
        mechanism: 'Long-acting benzodiazepine combined with alcohol creates prolonged dangerous CNS depression lasting 24-48 hours.',
        effects: ['Extended respiratory depression', 'Multi-day coma risk', 'Death', 'Severe cognitive impairment', 'Cardiovascular failure'],
        advice: ['NEVER combine due to extremely long duration', 'Emergency medical care essential', 'Monitor breathing for 48+ hours', 'Flumazenil contraindicated due to seizure risk']
      },
      'alcohol+lorazepam': {
        risk: 'deadly',
        mechanism: 'Both substances depress the central nervous system through GABA receptor enhancement.',
        effects: ['Respiratory depression', 'Coma', 'Death', 'Severe impairment', 'Memory blackouts'],
        advice: ['Never combine', 'Emergency medical care if combined', 'Monitor breathing', 'Have medical support available']
      },
      'alcohol+heroin': {
        risk: 'deadly',
        mechanism: 'Opioids and alcohol both depress respiratory function through different pathways, creating lethal synergy.',
        effects: ['Respiratory failure', 'Overdose', 'Death', 'Blue lips/fingernails', 'Loss of consciousness'],
        advice: ['Call 911 immediately', 'Administer naloxone if available', 'Rescue breathing', 'Do not leave person alone']
      },
      'alcohol+morphine': {
        risk: 'deadly',
        mechanism: 'Alcohol enhances opioid respiratory depression, leading to fatal overdose at lower doses.',
        effects: ['Respiratory arrest', 'Coma', 'Death', 'Severe sedation', 'Cardiovascular depression'],
        advice: ['Immediate emergency care', 'Naloxone administration', 'Monitor breathing closely', 'Never mix these substances']
      },
      'alcohol+oxycodone': {
        risk: 'deadly',
        mechanism: 'Prescription opioid interaction with alcohol dramatically increases overdose risk.',
        effects: ['Respiratory failure', 'Death', 'Extreme sedation', 'Coma', 'Cardiac issues'],
        advice: ['Emergency medical attention', 'Naloxone if available', 'Never consume alcohol with opioids', 'Read prescription warnings']
      },
      'alcohol+fentanyl': {
        risk: 'deadly',
        mechanism: 'Extremely potent opioid combined with alcohol creates almost certain fatal overdose.',
        effects: ['Immediate respiratory failure', 'Death within minutes', 'Coma', 'Cardiac arrest'],
        advice: ['Call 911 immediately', 'Multiple naloxone doses may be needed', 'Continuous rescue breathing', 'This combination is often fatal']
      },
      'alcohol+ghb': {
        risk: 'deadly',
        mechanism: 'Both are CNS depressants with narrow therapeutic windows and dangerous synergistic effects.',
        effects: ['Coma', 'Respiratory failure', 'Death', 'Vomiting while unconscious', 'Hypothermia'],
        advice: ['Extremely dangerous combination', 'Emergency medical care', 'Recovery position due to vomiting risk', 'Monitor temperature']
      },
      'alcohol+barbiturates': {
        risk: 'deadly',
        mechanism: 'Both substances enhance GABA activity and depress vital functions synergistically.',
        effects: ['Respiratory arrest', 'Coma', 'Death', 'Severe hypotension', 'Hypothermia'],
        advice: ['Lethal combination', 'Immediate hospitalization', 'Barbiturates have no antidote', 'Supportive care only']
      },
      'alcohol+phenazepam': {
        risk: 'deadly',
        mechanism: 'Extremely potent benzodiazepine with 12-24+ hour duration combined with alcohol creates prolonged respiratory depression.',
        effects: ['Multi-day coma', 'Respiratory failure', 'Death', 'Complete amnesia', 'Hypothermia'],
        advice: ['EXTREMELY DANGEROUS - delayed onset causes accidental overdose', 'Emergency medical care', 'Monitor breathing for 48+ hours', 'Flumazenil contraindicated due to long duration']
      },
      'phenazepam+any-depressant': {
        risk: 'deadly',
        mechanism: 'Phenazepam\'s extreme potency and 12-24+ hour duration makes any depressant combination potentially fatal.',
        effects: ['Multi-day blackouts', 'Respiratory depression', 'Dangerous behavior during amnesia', 'Overdose', 'Death'],
        advice: ['Never combine with ANY depressant', 'Delayed onset leads to accidental redosing', 'Remove access to all substances after dosing', 'Have constant supervision']
      },
      'alcohol+rohypnol': {
        risk: 'deadly',
        mechanism: 'Rohypnol (flunitrazepam) is 10x more potent than Valium - alcohol combination causes severe respiratory depression and complete amnesia.',
        effects: ['Complete amnesia', 'Respiratory failure', 'Death', 'Dangerous blackout behavior', 'Sexual assault vulnerability'],
        advice: ['LETHAL COMBINATION - never mix', 'Drug-facilitated assault risk', 'Emergency medical care if suspected', 'Flumazenil (antidote) may be needed']
      },
      'rohypnol+any-depressant': {
        risk: 'deadly',
        mechanism: 'Rohypnol\'s extreme potency (10x Valium) makes any depressant combination potentially lethal with complete memory loss.',
        effects: ['Total amnesia', 'Respiratory depression', 'Blackout lasting 8-12+ hours', 'Unconsciousness', 'Death'],
        advice: ['NEVER combine with any depressant', 'Associated with drug-facilitated crimes', 'Seek immediate help if suspected exposure', 'Have naloxone available as precaution']
      },
      'alcohol+quetiapine': {
        risk: 'dangerous',
        mechanism: 'Quetiapine (Seroquel) enhances alcohol CNS depression while increasing risk of cardiac arrhythmias and metabolic complications.',
        effects: ['Severe sedation', 'Respiratory depression', 'Cardiac arrhythmias', 'Hypotension', 'Falls and injuries', 'Metabolic decompensation'],
        advice: ['High risk combination', 'Monitor for excessive sedation', 'Avoid driving for 24+ hours', 'Medical supervision recommended']
      },
      'quetiapine+any-depressant': {
        risk: 'dangerous',
        mechanism: 'Quetiapine\'s sedative effects are dangerously enhanced by any CNS depressant, with unpredictable respiratory depression.',
        effects: ['Dangerous sedation', 'Respiratory depression', 'Cognitive impairment', 'Falls', 'Aspiration risk'],
        advice: ['Dangerous combination', 'Medical supervision required', 'Monitor breathing and consciousness', 'Avoid other sedating medications']
      },

      // CARISOPRODOL (SOMA) INTERACTIONS - DANGEROUS MUSCLE RELAXANT
      'carisoprodol+alcohol': {
        risk: 'deadly',
        mechanism: 'Carisoprodol metabolizes to meprobamate, creating double CNS depression with alcohol - "Las Vegas Cocktail" is notorious for fatal overdoses.',
        effects: ['Severe respiratory depression', 'Coma', 'Death', 'Extreme muscle weakness', 'Cardiovascular collapse'],
        advice: ['NEVER combine - famous for fatal overdoses', 'Emergency medical care if combined', 'Monitor breathing closely', 'Have medical support available']
      },
      'carisoprodol+benzodiazepines': {
        risk: 'deadly',
        mechanism: 'Muscle relaxant combined with benzodiazepines creates dangerous synergistic CNS depression lasting many hours.',
        effects: ['Respiratory failure', 'Extended coma', 'Death', 'Extreme sedation', 'Memory loss'],
        advice: ['Extremely dangerous combination', 'Rapid tolerance creates escalating risk', 'Emergency care essential', 'Monitor for 12+ hours']
      },
      'carisoprodol+opioids': {
        risk: 'deadly',
        mechanism: 'Soma enhances opioid respiratory depression while creating its own sedative effects through meprobamate conversion.',
        effects: ['Respiratory arrest', 'Overdose', 'Death', 'Severe sedation', 'Muscle paralysis'],
        advice: ['High fatal overdose risk', 'Naloxone may be less effective', 'Emergency medical intervention', 'Never mix with pain medications']
      },
      'carisoprodol+depressants': {
        risk: 'deadly',
        mechanism: 'Any CNS depressant combined with carisoprodol creates unpredictable and dangerous sedation.',
        effects: ['Dangerous sedation', 'Respiratory depression', 'Coma', 'Death', 'Rapid tolerance requiring higher doses'],
        advice: ['Avoid all depressants', 'Rapid dependence develops', 'Dangerous withdrawal if stopped abruptly', 'Medical supervision essential']
      },
      'soma+alcohol': {
        risk: 'deadly',
        mechanism: 'The infamous "Las Vegas Cocktail" - Soma and alcohol create lethal respiratory depression.',
        effects: ['Fatal respiratory depression', 'Coma', 'Death', 'Extreme sedation', 'Cardiovascular failure'],
        advice: ['Notorious fatal combination', 'Emergency medical care required', 'Monitor breathing constantly', 'High overdose mortality rate']
      },

      // AEROSOL/INHALANT INTERACTIONS - EXTREME DANGER
      'aerosols+any-stimulant': {
        risk: 'deadly',
        mechanism: 'Aerosols cause cardiac sensitization to adrenaline - ANY stimulant can trigger instant fatal arrhythmias.',
        effects: ['Sudden cardiac death', 'Ventricular fibrillation', 'Cardiac arrest', 'Death within seconds', 'No warning signs'],
        advice: ['NEVER combine with ANY stimulant', 'Even small amounts can be fatal', 'Call 911 if combined', 'Do not startle user - can trigger death']
      },
      'aerosols+caffeine': {
        risk: 'deadly',
        mechanism: 'Even mild stimulants like caffeine can trigger sudden cardiac arrest due to sensitized heart from hydrocarbon exposure.',
        effects: ['Sudden cardiac death', 'Fatal arrhythmias', 'Immediate cardiac arrest', 'No resuscitation possible'],
        advice: ['Fatal combination', 'Avoid ALL caffeine sources', 'Even energy drinks are dangerous', 'Medical monitoring essential']
      },
      'aerosols+exercise': {
        risk: 'deadly',
        mechanism: 'Physical exertion releases adrenaline which triggers fatal cardiac arrhythmias in sensitized hearts.',
        effects: ['Instant cardiac arrest', 'Sudden sniffing death', 'Death during or after activity', 'Ventricular fibrillation'],
        advice: ['Absolutely no physical activity', 'Avoid being startled or surprised', 'Remain calm and still', 'Emergency medical monitoring']
      },
      'aerosols+alcohol': {
        risk: 'deadly',
        mechanism: 'Alcohol enhances CNS depression while aerosols cause cardiac sensitization - double fatal mechanism.',
        effects: ['Respiratory failure', 'Cardiac arrest', 'Hypoxia', 'Death from multiple pathways', 'Chemical burns to airways'],
        advice: ['Extremely dangerous combination', 'Emergency medical care', 'Monitor breathing AND heart rhythm', 'Multiple organ failure possible']
      },
      'aerosols+any-depressant': {
        risk: 'deadly',
        mechanism: 'CNS depressants compound respiratory depression while aerosols displace oxygen and burn airways.',
        effects: ['Severe respiratory depression', 'Oxygen displacement', 'Chemical pneumonia', 'Suffocation', 'Death'],
        advice: ['High risk of death', 'Fresh air immediately', 'Monitor breathing closely', 'Emergency medical intervention']
      },

      // MAOI Interactions - Extremely dangerous
      'maois+ssris': {
        risk: 'deadly',
        mechanism: 'Serotonin syndrome caused by excessive serotonin accumulation when MAOIs prevent SSRI metabolism.',
        effects: ['Serotonin syndrome', 'Hyperthermia', 'Seizures', 'Death', 'Muscle rigidity', 'Confusion'],
        advice: ['Wait 2-6 weeks between switching', 'Emergency medical care for serotonin syndrome', 'Monitor temperature', 'Immediate discontinuation']
      },
      'maois+mdma': {
        risk: 'deadly',
        mechanism: 'MAOIs prevent MDMA metabolism, causing dangerous accumulation and serotonin syndrome.',
        effects: ['Serotonin syndrome', 'Hyperthermia (>106°F)', 'Seizures', 'Death', 'Cardiovascular crisis'],
        advice: ['Absolutely contraindicated', 'Emergency cooling measures', 'Immediate medical intervention', 'Can be fatal within hours']
      },
      'maois+mda': {
        risk: 'deadly',
        mechanism: 'Similar to MDMA, MDA levels become toxic when MAOIs prevent normal metabolism.',
        effects: ['Severe serotonin syndrome', 'Hyperthermia', 'Death', 'Seizures', 'Cardiac arrhythmias'],
        advice: ['Never combine', 'Emergency medical care', 'Cooling measures', 'Multiple organ failure possible']
      },
      'maois+dxm': {
        risk: 'deadly',
        mechanism: 'DXM is metabolized by enzymes that MAOIs inhibit, causing dangerous accumulation.',
        effects: ['Serotonin syndrome', 'Hyperthermia', 'Coma', 'Death', 'Respiratory depression'],
        advice: ['Fatal combination', 'Read all medication labels', 'Emergency care needed', 'Avoid all cough medicines']
      },

      // Additional MAOI interactions
      'maois+tramadol': {
        risk: 'deadly',
        mechanism: 'Tramadol has serotonergic activity that can cause fatal serotonin syndrome when combined with MAOIs.',
        effects: ['Serotonin syndrome', 'Seizures', 'Hyperthermia', 'Death', 'Coma'],
        advice: ['Never combine', 'Emergency medical care', 'Can be fatal', 'Read all prescription labels']
      },
      'maois+amitriptyline': {
        risk: 'deadly',
        mechanism: 'Tricyclic antidepressants with MAOIs can cause severe hypertensive crisis and serotonin syndrome.',
        effects: ['Hypertensive crisis', 'Serotonin syndrome', 'Stroke', 'Death', 'Seizures'],
        advice: ['Absolutely contraindicated', 'Wait weeks between switching', 'Emergency care', 'Medical supervision required']
      },

      // Acacia/DMT-related interactions
      'acacia+ssris': {
        risk: 'dangerous',
        mechanism: 'SSRIs can block or unpredictably alter psychedelic effects and may increase serotonin activity when combined with MAOIs.',
        effects: ['Reduced effects', 'Unpredictable responses', 'Potential serotonin issues', 'Ineffective experience'],
        advice: ['Taper off SSRIs weeks before use', 'Consult medical professional', 'May completely block effects', 'Risk of serotonin complications']
      },
      'acacia+maois': {
        risk: 'required',
        mechanism: 'MAOIs are required for oral DMT activity by preventing breakdown in the digestive system.',
        effects: ['Enables oral DMT activity', 'Creates ayahuasca-like experience', 'Extended duration', 'Increased nausea initially'],
        advice: ['Follow strict MAOI diet 24+ hours before and after', 'Avoid tyramine-rich foods', 'No alcohol or stimulants', 'Traditional preparation methods recommended']
      },
      'acacia+alcohol': {
        risk: 'dangerous',
        mechanism: 'Alcohol can interact dangerously with MAOIs and intensify nausea/vomiting during the experience.',
        effects: ['Dangerous MAOI interaction', 'Severe nausea', 'Unpredictable effects', 'Increased toxicity'],
        advice: ['Avoid alcohol completely during MAOI diet', 'Can be dangerous with harmalas', 'Follow strict dietary restrictions', 'Emergency care if combined']
      },
      'acacia+stimulants': {
        risk: 'dangerous',
        mechanism: 'Stimulants combined with MAOIs required for Acacia can cause hypertensive crisis.',
        effects: ['Hypertensive crisis', 'Cardiovascular emergency', 'Stroke risk', 'Potentially fatal'],
        advice: ['Avoid all stimulants during MAOI diet', 'Include caffeine in restriction', 'Emergency care if combined', 'Follow dietary guidelines strictly']
      },

      // More benzodiazepine + alcohol combinations
      'alcohol+bromazepam': {
        risk: 'deadly',
        mechanism: 'Benzodiazepine and alcohol create dangerous CNS depression and respiratory failure.',
        effects: ['Respiratory depression', 'Coma', 'Death', 'Memory blackouts', 'Severe sedation'],
        advice: ['Never combine', 'Emergency medical care', 'Monitor breathing', 'Call 911 if combined']
      },
      'alcohol+zolpidem': {
        risk: 'deadly',
        mechanism: 'Z-drugs like zolpidem combined with alcohol cause dangerous respiratory depression.',
        effects: ['Respiratory failure', 'Coma', 'Death', 'Sleepwalking', 'Memory loss'],
        advice: ['Extremely dangerous', 'Emergency care needed', 'Never mix with alcohol', 'Monitor breathing']
      },

      // Opioid combinations
      'alcohol+tramadol': {
        risk: 'deadly',
        mechanism: 'Tramadol plus alcohol increases seizure risk and causes respiratory depression.',
        effects: ['Seizures', 'Respiratory depression', 'Death', 'Coma', 'Serotonin syndrome'],
        advice: ['High seizure risk', 'Emergency medical care', 'Never combine', 'Monitor for seizures']
      },
      'alcohol+hydrocodone': {
        risk: 'deadly',
        mechanism: 'Opioid and alcohol combination creates life-threatening respiratory depression.',
        effects: ['Respiratory failure', 'Death', 'Coma', 'Extreme sedation', 'Overdose'],
        advice: ['Call 911 immediately', 'Naloxone if available', 'Never mix', 'Monitor breathing continuously']
      },
      'alcohol+hydromorphone': {
        risk: 'deadly',
        mechanism: 'Powerful opioid combined with alcohol creates almost certain respiratory failure.',
        effects: ['Immediate respiratory failure', 'Death', 'Coma', 'Cardiac arrest'],
        advice: ['Extremely lethal', 'Immediate emergency care', 'Multiple naloxone doses needed', 'Never combine']
      },
      'alcohol+oxymorphone': {
        risk: 'deadly',
        mechanism: 'Very potent opioid with alcohol creates immediate life-threatening respiratory depression.',
        effects: ['Rapid respiratory failure', 'Death within minutes', 'Coma', 'Cardiac arrest'],
        advice: ['Lethal combination', 'Call 911 immediately', 'Continuous naloxone may be needed', 'Emergency care only']
      },
      'alcohol+desomorphine': {
        risk: 'deadly',
        mechanism: 'Krokodil combined with alcohol causes immediate respiratory failure and tissue death.',
        effects: ['Respiratory arrest', 'Death', 'Tissue necrosis', 'Coma', 'Multiple organ failure'],
        advice: ['Absolutely lethal', 'Emergency care immediately', 'Both substances extremely dangerous', 'Medical emergency']
      },
      'alcohol+acetylfentanyl': {
        risk: 'deadly',
        mechanism: 'Fentanyl analog with alcohol creates instant overdose potential.',
        effects: ['Immediate respiratory failure', 'Death within seconds', 'Coma', 'Cardiac arrest'],
        advice: ['Fatal combination', 'Call 911 immediately', 'Multiple naloxone needed', 'Often fatal']
      },

      // Synthetic cannabinoid dangers
      'spice-k2+alcohol': {
        risk: 'dangerous',
        mechanism: 'Synthetic cannabinoids have unpredictable effects that are worsened by alcohol.',
        effects: ['Psychosis', 'Seizures', 'Respiratory depression', 'Unpredictable behavior', 'Coma'],
        advice: ['Highly unpredictable', 'Emergency care for seizures', 'Avoid completely', 'Test for synthetic cannabinoids']
      },
      'spice-k2+stimulants': {
        risk: 'dangerous',
        mechanism: 'Synthetic cannabinoids can cause seizures and cardiac issues amplified by stimulants.',
        effects: ['Seizures', 'Heart attack', 'Stroke', 'Psychosis', 'Hyperthermia'],
        advice: ['Very dangerous', 'Emergency care for seizures', 'Avoid all stimulants', 'Unpredictable effects']
      },

      // Deliriant combinations
      'diphenhydramine+scopolamine': {
        risk: 'deadly',
        mechanism: 'Two powerful anticholinergics create extreme delirium and potentially fatal effects.',
        effects: ['Severe delirium', 'Respiratory depression', 'Cardiac arrhythmias', 'Death', 'Complete loss of reality'],
        advice: ['Extremely dangerous', 'Emergency medical care', 'Never combine deliriants', 'Can cause death']
      },
      'diphenhydramine+dxm': {
        risk: 'dangerous',
        mechanism: 'Both substances affect histamine and NMDA receptors, causing dangerous interactions.',
        effects: ['Severe confusion', 'Respiratory depression', 'Cardiac issues', 'Delirium', 'Seizures'],
        advice: ['Very dangerous combination', 'Monitor breathing and heart rate', 'Emergency care needed', 'Avoid combination']
      },

      // PMMA/PMA - EXTREMELY LETHAL INTERACTIONS
      'pmma+alcohol': {
        risk: 'deadly',
        mechanism: 'PMMA/PMA already has extremely narrow therapeutic window - alcohol increases hyperthermia and cardiovascular toxicity.',
        effects: ['Fatal hyperthermia', 'Cardiovascular collapse', 'Multi-organ failure', 'Death'],
        advice: ['NEVER combine - deadly interaction', 'Emergency cooling if combined', 'Call 911 immediately', 'No antidote available']
      },
      'pma+alcohol': {
        risk: 'deadly',
        mechanism: 'PMA with alcohol dramatically increases risk of fatal hyperthermia and organ failure.',
        effects: ['Extreme hyperthermia', 'Liver failure', 'Kidney failure', 'Death'],
        advice: ['Fatal combination', 'Emergency medical care', 'Cooling measures critical', 'Often fatal']
      },
      'pmma/pma+mdma': {
        risk: 'deadly',
        mechanism: 'Users accidentally take both when PMMA/PMA is sold as MDMA, causing extreme serotonin toxicity.',
        effects: ['Serotonin syndrome', 'Fatal hyperthermia', 'Cardiovascular collapse', 'Death'],
        advice: ['Test all pills - this kills most users', 'Never combine', 'Emergency cooling', 'Multiple organ failure']
      },
      'pmma+stimulants': {
        risk: 'deadly',
        mechanism: 'Any stimulant combined with PMMA/PMA creates extreme cardiovascular stress and hyperthermia.',
        effects: ['Heart attack', 'Stroke', 'Fatal hyperthermia', 'Cardiovascular collapse'],
        advice: ['Absolutely fatal', 'Emergency medical care', 'No safe combinations', 'Cooling measures critical']
      },
      'pma+stimulants': {
        risk: 'deadly',
        mechanism: 'PMA with any stimulant dramatically increases risk of fatal cardiovascular events.',
        effects: ['Heart attack', 'Stroke', 'Fatal hyperthermia', 'Death'],
        advice: ['Never combine', 'Emergency care needed', 'Fatal interaction', 'No safe dose']
      },

      // Research chemical dangers
      'nbome+caffeine': {
        risk: 'deadly',
        mechanism: 'Even mild stimulants like caffeine can trigger seizures and heart failure with NBOMe.',
        effects: ['Seizures', 'Heart attack', 'Death', 'Stroke', 'Hyperthermia'],
        advice: ['Avoid all stimulants', 'Even caffeine is dangerous', 'Test all supposed LSD', 'Emergency care for seizures']
      },
      'nbome+ephedrine': {
        risk: 'deadly',
        mechanism: 'Stimulant greatly amplifies NBOMe\'s already dangerous cardiovascular effects.',
        effects: ['Heart attack', 'Stroke', 'Seizures', 'Death', 'Severe hypertension'],
        advice: ['Lethal combination', 'Never mix', 'Emergency medical care', 'Test substances before use']
      },

      // Dangerous psychedelic combinations
      'nbome+lsd': {
        risk: 'dangerous',
        mechanism: 'NBOMe is often sold as LSD but has much higher toxicity and different effects.',
        effects: ['Overdose', 'Seizures', 'Confusion about dosing', 'Heart problems', 'Dangerous vasoconstriction'],
        advice: ['Test all supposed LSD', 'NBOMe is not LSD', 'Emergency care for overdose', 'Use reagent tests']
      },

      // Prescription drug interactions
      'tramadol+ssris': {
        risk: 'dangerous',
        mechanism: 'Both tramadol and SSRIs increase serotonin, potentially causing serotonin syndrome.',
        effects: ['Serotonin syndrome', 'Seizures', 'Hyperthermia', 'Confusion', 'Muscle rigidity'],
        advice: ['Monitor for serotonin syndrome', 'Medical supervision required', 'Lower tramadol doses', 'Emergency care for symptoms']
      },
      'sildenafil+nitrous': {
        risk: 'dangerous',
        mechanism: 'Viagra can interact with nitrous oxide causing dangerous blood pressure changes.',
        effects: ['Severe hypotension', 'Fainting', 'Heart attack', 'Stroke', 'Dangerous blood pressure drops'],
        advice: ['Avoid combination', 'Monitor blood pressure', 'Emergency care for cardiac symptoms', 'Medical supervision needed']
      },

      // Alkyl Nitrites (Poppers) Interactions - EXTREMELY DANGEROUS with ED medications
      'alkyl-nitrites+sildenafil': {
        risk: 'deadly',
        mechanism: 'Both substances cause vasodilation through different pathways, leading to catastrophic blood pressure drop.',
        effects: ['Severe hypotension', 'Cardiovascular collapse', 'Heart attack', 'Stroke', 'Death'],
        advice: ['NEVER combine these substances', 'Fatal interaction', 'Emergency medical care immediately', 'Can cause death within minutes']
      },
      'alkyl-nitrites+tadalafil': {
        risk: 'deadly',
        mechanism: 'Cialis and poppers both cause powerful vasodilation, resulting in potentially fatal hypotension.',
        effects: ['Cardiovascular collapse', 'Severe hypotension', 'Death', 'Heart attack', 'Loss of consciousness'],
        advice: ['Absolutely contraindicated', 'Fatal combination', 'Emergency medical attention', 'Do not use within 48 hours of each other']
      },
      'alkyl-nitrites+vardenafil': {
        risk: 'deadly',
        mechanism: 'Levitra combined with poppers causes dangerous additive vasodilation and blood pressure collapse.',
        effects: ['Fatal hypotension', 'Cardiovascular collapse', 'Death', 'Heart attack', 'Stroke'],
        advice: ['Never combine', 'Potentially fatal', 'Emergency care needed', 'Avoid all ED medications with poppers']
      },
      'alkyl-nitrites+viagra': {
        risk: 'deadly',
        mechanism: 'Both substances are powerful vasodilators that together can cause fatal blood pressure drop.',
        effects: ['Severe hypotension', 'Death', 'Cardiovascular collapse', 'Heart attack', 'Loss of consciousness'],
        advice: ['FATAL combination', 'Never mix with any ED medication', 'Emergency medical care', 'Can kill within minutes']
      },
      'alkyl-nitrites+cialis': {
        risk: 'deadly',
        mechanism: 'Cialis has very long duration, making this combination dangerous even with time separation.',
        effects: ['Fatal hypotension', 'Cardiovascular collapse', 'Death', 'Heart attack', 'Stroke'],
        advice: ['Extremely dangerous', 'Cialis lasts 36+ hours', 'Never combine', 'Emergency medical attention']
      },
      'alkyl-nitrites+levitra': {
        risk: 'deadly',
        mechanism: 'Levitra and poppers both cause rapid vasodilation leading to potentially fatal blood pressure drop.',
        effects: ['Cardiovascular collapse', 'Death', 'Severe hypotension', 'Heart attack', 'Loss of consciousness'],
        advice: ['Fatal interaction', 'Never combine', 'Emergency care immediately', 'Avoid all PDE5 inhibitors']
      },
      'alkyl-nitrites+alcohol': {
        risk: 'dangerous',
        mechanism: 'Both substances cause vasodilation and hypotension, increasing risk of falls and cardiovascular issues.',
        effects: ['Severe hypotension', 'Fainting', 'Falls', 'Dizziness', 'Cardiovascular stress'],
        advice: ['High risk combination', 'Sit down before using', 'Monitor blood pressure', 'Risk of dangerous falls']
      },
      'alkyl-nitrites+cannabis': {
        risk: 'moderate',
        mechanism: 'Both substances can cause hypotension and dizziness, increasing fall risk.',
        effects: ['Increased dizziness', 'Hypotension', 'Fall risk', 'Disorientation', 'Nausea'],
        advice: ['Use caution', 'Sit down before using', 'Monitor for dizziness', 'Avoid standing quickly']
      },
      'alkyl-nitrites+stimulants': {
        risk: 'dangerous',
        mechanism: 'Stimulants increase heart rate while poppers cause vasodilation, creating cardiovascular stress.',
        effects: ['Cardiovascular strain', 'Arrhythmias', 'Heart attack risk', 'Blood pressure fluctuations'],
        advice: ['Dangerous combination', 'Avoid mixing', 'Monitor heart rate', 'Emergency care for chest pain']
      },
      'poppers+viagra': {
        risk: 'deadly',
        mechanism: 'Both substances are powerful vasodilators that together can cause fatal blood pressure drop.',
        effects: ['Severe hypotension', 'Death', 'Cardiovascular collapse', 'Heart attack', 'Loss of consciousness'],
        advice: ['FATAL combination', 'Never mix with any ED medication', 'Emergency medical care', 'Can kill within minutes']
      },
      'poppers+cialis': {
        risk: 'deadly',
        mechanism: 'Cialis has very long duration, making this combination dangerous even with time separation.',
        effects: ['Fatal hypotension', 'Cardiovascular collapse', 'Death', 'Heart attack', 'Stroke'],
        advice: ['Extremely dangerous', 'Cialis lasts 36+ hours', 'Never combine', 'Emergency medical attention']
      },
      'poppers+levitra': {
        risk: 'deadly',
        mechanism: 'Levitra and poppers both cause rapid vasodilation leading to potentially fatal blood pressure drop.',
        effects: ['Cardiovascular collapse', 'Death', 'Severe hypotension', 'Heart attack', 'Loss of consciousness'],
        advice: ['Fatal interaction', 'Never combine', 'Emergency care immediately', 'Avoid all PDE5 inhibitors']
      },
      'poppers+sildenafil': {
        risk: 'deadly',
        mechanism: 'Both substances cause vasodilation through different pathways, leading to catastrophic blood pressure drop.',
        effects: ['Severe hypotension', 'Cardiovascular collapse', 'Heart attack', 'Stroke', 'Death'],
        advice: ['NEVER combine these substances', 'Fatal interaction', 'Emergency medical care immediately', 'Can cause death within minutes']
      },

      // Moderate risk additions
      'pregabalin+alcohol': {
        risk: 'dangerous',
        mechanism: 'Gabapentinoid with alcohol increases CNS depression and respiratory risk.',
        effects: ['Respiratory depression', 'Severe sedation', 'Memory loss', 'Loss of coordination', 'Overdose risk'],
        advice: ['High risk combination', 'Reduce both doses significantly', 'Monitor breathing', 'Avoid driving']
      },

      // NBOMe Interactions - Highly dangerous
      'nbome+cocaine': {
        risk: 'deadly',
        mechanism: 'NBOMe already has cardiotoxic and seizure risks that are greatly amplified by stimulants.',
        effects: ['Seizures', 'Heart failure', 'Stroke', 'Death', 'Hyperthermia', 'Psychosis'],
        advice: ['Extremely dangerous', 'Never combine with stimulants', 'Emergency care for seizures', 'Test all supposed "LSD"']
      },
      'nbome+amphetamine': {
        risk: 'deadly',
        mechanism: 'Stimulants increase the already significant cardiovascular risks of NBOMe compounds.',
        effects: ['Cardiac arrest', 'Seizures', 'Stroke', 'Death', 'Severe hypertension'],
        advice: ['Potentially fatal', 'Avoid all stimulants with NBOMe', 'Emergency medical care', 'Use reagent tests']
      },
      'nbome+methamphetamine': {
        risk: 'deadly',
        mechanism: 'Powerful stimulant greatly increases NBOMe\'s already dangerous cardiovascular effects.',
        effects: ['Heart attack', 'Stroke', 'Seizures', 'Death', 'Hyperthermia', 'Psychotic episodes'],
        advice: ['Lethal combination', 'Immediate emergency care', 'Never mix stimulants with NBOMe', 'Test substances']
      },

      // DANGEROUS COMBINATIONS - High risk but potentially survivable
      'cocaine+alcohol': {
        risk: 'dangerous',
        mechanism: 'Forms cocaethylene in the liver, which is more toxic and longer-lasting than either substance alone.',
        effects: ['Increased cardiotoxicity', 'Liver damage', 'Prolonged effects', 'Heart attack risk', 'Stroke risk'],
        advice: ['Significantly increases toxicity', 'Monitor heart rate', 'Stay hydrated', 'Avoid mixing']
      },
      'erythroxylum-coca+alcohol': {
        risk: 'caution',
        mechanism: 'Traditional coca use patterns typically avoid alcohol combination, but mild stimulant effects may interact.',
        effects: ['Reduced traditional benefits', 'Possible heart rate increase', 'Cultural inappropriateness'],
        advice: ['Respect traditional use patterns', 'Avoid in traditional contexts', 'Monitor if combining', 'Lower alcohol consumption']
      },
      'mdma+alcohol': {
        risk: 'dangerous',
        mechanism: 'Alcohol interferes with MDMA metabolism and increases dehydration and toxicity risks.',
        effects: ['Increased dehydration', 'Liver stress', 'Reduced MDMA effects', 'Hangover amplification'],
        advice: ['Alcohol reduces MDMA effects', 'Increase water intake', 'Monitor temperature', 'Plan recovery time']
      },
      'ketamine+alcohol': {
        risk: 'dangerous',
        mechanism: 'Both substances are depressants and can cause dangerous sedation and respiratory depression.',
        effects: ['Respiratory depression', 'Loss of consciousness', 'Vomiting while unconscious', 'Memory loss'],
        advice: ['Risk of unconscious vomiting', 'Recovery position essential', 'Have sober monitor', 'Reduce doses']
      },
      'acetaminophen+alcohol': {
        risk: 'dangerous',
        mechanism: 'Alcohol increases acetaminophen metabolism to toxic compounds that damage the liver.',
        effects: ['Liver damage', 'Hepatotoxicity', 'Liver failure', 'Jaundice', 'Death (with chronic use)'],
        advice: ['Avoid regular combination', 'Monitor liver function', 'Reduce acetaminophen dose', 'Seek medical advice']
      },
      'diphenhydramine+alcohol': {
        risk: 'dangerous',
        mechanism: 'Both have anticholinergic and sedative effects that combine dangerously.',
        effects: ['Severe sedation', 'Respiratory depression', 'Confusion', 'Memory problems', 'Cardiac issues'],
        advice: ['Very sedating combination', 'Monitor breathing', 'Avoid driving', 'Have supervision']
      },

      // Amanita (Muscimol) Interactions
      'amanita+alcohol': {
        risk: 'dangerous',
        mechanism: 'Muscimol and alcohol both act on GABA receptors, causing dangerous CNS depression.',
        effects: ['Severe sedation', 'Respiratory depression', 'Disorientation', 'Memory loss', 'Nausea/vomiting'],
        advice: ['High risk of unconsciousness', 'Recovery position essential', 'Monitor breathing', 'Have sober supervision']
      },
      'amanita+benzodiazepines': {
        risk: 'dangerous',
        mechanism: 'Both muscimol and benzodiazepines enhance GABA activity, creating dangerous sedation.',
        effects: ['Extreme sedation', 'Respiratory depression', 'Memory blackouts', 'Loss of coordination', 'Unconsciousness'],
        advice: ['Very dangerous combination', 'Medical supervision recommended', 'Monitor breathing closely', 'Emergency plan needed']
      },
      'amanita+barbiturates': {
        risk: 'deadly',
        mechanism: 'Muscimol and barbiturates both depress the central nervous system through GABA enhancement.',
        effects: ['Respiratory failure', 'Coma', 'Death', 'Severe hypotension', 'Complete loss of consciousness'],
        advice: ['Potentially lethal', 'Emergency medical care', 'Never combine', 'Call 911 if combined']
      },
      'amanita+opioids': {
        risk: 'dangerous',
        mechanism: 'Different mechanisms of CNS depression can combine to dangerously suppress breathing.',
        effects: ['Respiratory depression', 'Severe sedation', 'Nausea/vomiting', 'Confusion', 'Loss of consciousness'],
        advice: ['Monitor breathing carefully', 'Recovery position due to vomiting', 'Have naloxone available', 'Medical supervision']
      },

      // Belladonna (Anticholinergic) Interactions - EXTREMELY DANGEROUS
      'belladonna+alcohol': {
        risk: 'deadly',
        mechanism: 'Anticholinergic toxicity combined with alcohol depresses multiple vital systems.',
        effects: ['Respiratory failure', 'Cardiac arrest', 'Severe hyperthermia', 'Complete delirium', 'Death'],
        advice: ['Potentially lethal combination', 'Emergency medical care immediately', 'Never combine', 'Call 911']
      },
      'belladonna+benzodiazepines': {
        risk: 'deadly',
        mechanism: 'Anticholinergic effects combined with GABAergic depression create dangerous sedation and respiratory risk.',
        effects: ['Respiratory depression', 'Coma', 'Cardiac complications', 'Severe hyperthermia', 'Death'],
        advice: ['Extremely dangerous', 'Immediate medical intervention', 'Never combine', 'Call emergency services']
      },
      'belladonna+antidepressants': {
        risk: 'deadly',
        mechanism: 'Tricyclic antidepressants have anticholinergic properties that add to belladonna toxicity.',
        effects: ['Severe anticholinergic toxidrome', 'Cardiac arrhythmias', 'Seizures', 'Hyperthermia', 'Death'],
        advice: ['Lethal combination', 'Emergency medical care', 'Physostigmine antidote needed', 'Never mix']
      },
      'belladonna+antihistamines': {
        risk: 'deadly',
        mechanism: 'Diphenhydramine and similar antihistamines are anticholinergic and dramatically increase toxicity.',
        effects: ['Extreme anticholinergic poisoning', 'Seizures', 'Cardiac arrest', 'Hyperthermia', 'Death'],
        advice: ['Potentially fatal', 'Call 911 immediately', 'No safe combination exists', 'Medical emergency']
      },
      'belladonna+stimulants': {
        risk: 'deadly',
        mechanism: 'Stimulants increase heart rate and hyperthermia risk from anticholinergic toxicity.',
        effects: ['Severe hyperthermia', 'Cardiac arrhythmias', 'Stroke', 'Seizures', 'Death'],
        advice: ['Extremely dangerous', 'Heat stroke risk', 'Cardiac emergency potential', 'Never combine']
      },
      'belladonna+opioids': {
        risk: 'deadly',
        mechanism: 'Respiratory depression from opioids combined with anticholinergic effects creates multiple failure modes.',
        effects: ['Respiratory failure', 'Cardiac complications', 'Severe sedation', 'Hyperthermia', 'Death'],
        advice: ['Lethal combination', 'Multiple organ failure risk', 'Emergency care needed', 'Naloxone may not help fully']
      },

      // Datura (Anticholinergic) Interactions - EXTREMELY DANGEROUS
      'datura+alcohol': {
        risk: 'deadly',
        mechanism: 'Alcohol dramatically increases anticholinergic toxicity and impairs judgment during delirium.',
        effects: ['Extreme hyperthermia', 'Cardiac arrest', 'Respiratory depression', 'Coma', 'Death'],
        advice: ['Lethal combination', 'Medical emergency', 'No safe dose', 'Call emergency services immediately']
      },
      'datura+stimulants': {
        risk: 'deadly',
        mechanism: 'Stimulants worsen hyperthermia and cardiac effects of anticholinergic poisoning.',
        effects: ['Fatal hyperthermia', 'Heart attack', 'Stroke', 'Seizures', 'Multiple organ failure'],
        advice: ['Extremely lethal', 'Heat stroke guaranteed', 'Immediate emergency care', 'Never combine under any circumstances']
      },
      'datura+antidepressants': {
        risk: 'deadly',
        mechanism: 'TCAs and other antidepressants have anticholinergic effects that create fatal toxicity with Datura.',
        effects: ['Severe anticholinergic toxidrome', 'Cardiac arrhythmias', 'Hyperthermia', 'Prolonged delirium', 'Death'],
        advice: ['Fatal interaction', 'Medical emergency', 'Physostigmine may be needed', 'Intensive care required']
      },
      'datura+antihistamines': {
        risk: 'deadly',
        mechanism: 'Antihistamines are anticholinergic and create additive toxicity with Datura alkaloids.',
        effects: ['Severe anticholinergic crisis', 'Hyperthermia', 'Cardiac complications', 'Extended delirium'],
        advice: ['Extremely dangerous', 'Medical emergency', 'Avoid all antihistamines', 'Monitor temperature']
      },

      // MODERATE RISK COMBINATIONS
      'caffeine+mdma': {
        risk: 'moderate',
        mechanism: 'Both substances increase heart rate and blood pressure, potentially causing cardiovascular stress.',
        effects: ['Increased heart rate', 'Higher blood pressure', 'Anxiety', 'Dehydration', 'Sleep difficulty'],
        advice: ['Monitor heart rate', 'Stay hydrated', 'Avoid excessive caffeine', 'Take breaks from dancing']
      },
      'thc+alcohol': {
        risk: 'moderate',
        mechanism: 'Alcohol increases THC absorption, while THC can reduce nausea that might otherwise limit alcohol intake.',
        effects: ['Increased intoxication', 'Nausea', 'Dizziness', 'Impaired coordination', 'The spins'],
        advice: ['Start with lower doses', 'Eat before consuming', 'Stay hydrated', 'Avoid driving']
      },
      'lsd+mdma': {
        risk: 'moderate',
        mechanism: 'Both affect serotonin systems, potentially causing increased effects and extended duration.',
        effects: ['Intense experience', 'Extended duration', 'Increased visuals', 'Emotional intensity', 'Confusion'],
        advice: ['Start with lower doses', 'Have experienced trip sitter', 'Safe environment essential', 'Plan for long duration']
      },
      'ketamine+nitrous': {
        risk: 'moderate',
        mechanism: 'Both are dissociatives that can cause dangerous levels of dissociation and loss of coordination.',
        effects: ['Extreme dissociation', 'Loss of coordination', 'Risk of injury', 'Memory impairment'],
        advice: ['Sit or lie down', 'Have sober supervision', 'Safe environment crucial', 'Short exposure to nitrous']
      },

      // Psychoactive Cacti (Mescaline) Interactions
      'psychoactivecacti+maois': {
        risk: 'dangerous',
        mechanism: 'Cacti contain tyramine and other amines that can cause dangerous hypertensive crisis with MAOIs.',
        effects: ['Severe hypertension', 'Headache', 'Cardiac complications', 'Stroke risk', 'Death'],
        advice: ['Never combine with MAOIs', 'Emergency medical care if combined', 'Dangerous blood pressure spikes', 'Call 911']
      },
      'psychoactivecacti+stimulants': {
        risk: 'dangerous',
        mechanism: 'Mescaline has mild stimulant properties that combine with other stimulants to increase cardiovascular stress.',
        effects: ['Increased heart rate', 'Elevated blood pressure', 'Anxiety', 'Cardiac stress', 'Hyperthermia'],
        advice: ['High cardiovascular risk', 'Monitor heart rate and blood pressure', 'Stay cool and hydrated', 'Avoid combination']
      },
      'psychoactivecacti+alcohol': {
        risk: 'moderate',
        mechanism: 'Alcohol increases nausea and dehydration risk, may interfere with spiritual aspects of experience.',
        effects: ['Severe nausea', 'Increased dehydration', 'Diminished spiritual effects', 'Stomach upset'],
        advice: ['Significantly increases nausea', 'Stay well hydrated', 'May reduce beneficial effects', 'Traditional contraindication']
      },
      'psychoactivecacti+cannabis': {
        risk: 'moderate',
        mechanism: 'Cannabis may intensify visual effects and emotional processing but can increase anxiety.',
        effects: ['Enhanced visuals', 'Increased introspection', 'Possible anxiety', 'Confusion', 'Thought loops'],
        advice: ['Start with small cannabis doses', 'May increase trip intensity', 'Have CBD available', 'Experienced users only']
      },

      // Hawaiian Baby Woodrose (LSA) Interactions
      'hawaiian-baby-woodrose+alcohol': {
        risk: 'dangerous',
        mechanism: 'Alcohol dramatically worsens LSA nausea and increases dehydration risk during long duration.',
        effects: ['Severe nausea and vomiting', 'Dangerous dehydration', 'Increased sedation', 'Reduced trip quality'],
        advice: ['Significantly worsens nausea', 'High dehydration risk', 'Avoid alcohol completely', 'Have anti-nausea remedies ready']
      },
      'hawaiian-baby-woodrose+ssris': {
        risk: 'dangerous',
        mechanism: 'SSRIs can block LSA effects and potentially cause serotonin syndrome with ergot alkaloids.',
        effects: ['Blocked psychedelic effects', 'Potential serotonin syndrome', 'Increased side effects'],
        advice: ['May completely block effects', 'Dangerous with ergot alkaloids', 'Taper SSRI safely first', 'Medical supervision required']
      },
      'hawaiian-baby-woodrose+maois': {
        risk: 'dangerous',
        mechanism: 'MAOIs may intensify and dangerously prolong LSA effects, plus interact with other seed alkaloids.',
        effects: ['Dramatically intensified effects', 'Prolonged duration', 'Dangerous blood pressure changes', 'Serotonin syndrome risk'],
        advice: ['Never combine with MAOIs', 'Medical emergency potential', 'Extremely dangerous interaction', 'Emergency care if combined']
      },
      'hawaiian-baby-woodrose+stimulants': {
        risk: 'risky',
        mechanism: 'Stimulants worsen vasoconstriction from ergot alkaloids and may conflict with LSA sedation.',
        effects: ['Increased vasoconstriction', 'Leg cramps', 'Cardiovascular stress', 'Conflicting effects'],
        advice: ['Increases circulation problems', 'Monitor for leg cramps', 'Cardiovascular risk', 'Avoid combination']
      },

      // KANNA INTERACTIONS
      'kanna+ssris': {
        risk: 'dangerous',
        mechanism: 'Both kanna and SSRIs inhibit serotonin reuptake, potentially causing serotonin syndrome.',
        effects: ['Serotonin syndrome risk', 'Excessive serotonin activity', 'Hyperthermia', 'Agitation'],
        advice: ['Do not combine with prescription SSRIs', 'Taper medications safely first', 'Medical supervision required', 'Wait weeks after stopping SSRIs']
      },
      'kanna+maois': {
        risk: 'dangerous',
        mechanism: 'MAOIs prevent breakdown of serotonin that kanna increases, creating dangerous accumulation.',
        effects: ['Severe serotonin syndrome', 'Dangerous blood pressure changes', 'Hyperthermia', 'Medical emergency'],
        advice: ['Never combine', 'Extremely dangerous interaction', 'Emergency medical care if combined', 'Wait weeks after MAOI discontinuation']
      },
      'kanna+tramadol': {
        risk: 'dangerous',
        mechanism: 'Tramadol has serotonergic activity that combines dangerously with kanna\'s SSRI-like effects.',
        effects: ['Serotonin syndrome', 'Seizure risk', 'Hyperthermia', 'Cardiovascular complications'],
        advice: ['Avoid combination completely', 'High serotonin syndrome risk', 'Medical supervision required', 'Choose one or the other']
      },
      'kanna+alcohol': {
        risk: 'risky',
        mechanism: 'Alcohol may interfere with kanna\'s mood benefits and increase sedation.',
        effects: ['Reduced mood benefits', 'Increased sedation', 'Potential respiratory depression', 'Cognitive impairment'],
        advice: ['Minimizes kanna benefits', 'Start with lower doses', 'Monitor respiratory function', 'May worsen depression']
      },
      'kanna+stimulants': {
        risk: 'moderate',
        mechanism: 'Stimulants may conflict with kanna\'s calming serotonergic effects.',
        effects: ['Conflicting effects', 'Reduced anxiety relief', 'Possible agitation', 'Cardiovascular stress'],
        advice: ['May reduce kanna benefits', 'Monitor heart rate', 'Start with lower doses', 'Effects may cancel out']
      },

      // KAVA INTERACTIONS
      'kava+alcohol': {
        risk: 'deadly',
        mechanism: 'Both are potent CNS depressants that synergistically depress respiratory function and cause severe liver damage.',
        effects: ['Severe respiratory depression', 'Liver toxicity', 'Loss of consciousness', 'Coma', 'Death'],
        advice: ['Never combine these substances', 'Both are hepatotoxic', 'Call emergency services if combined', 'Monitor breathing and consciousness']
      },
      'kava+benzodiazepines': {
        risk: 'dangerous',
        mechanism: 'Both enhance GABA activity through different mechanisms, creating dangerous synergistic CNS depression.',
        effects: ['Severe sedation', 'Respiratory depression', 'Loss of consciousness', 'Memory blackouts', 'Ataxia'],
        advice: ['Extremely dangerous combination', 'High risk of overdose', 'Medical supervision required', 'Never mix these depressants']
      },
      'kava+barbiturates': {
        risk: 'dangerous',
        mechanism: 'Barbiturates and kava both depress the central nervous system with potentially fatal synergy.',
        effects: ['Respiratory failure', 'Coma', 'Cardiovascular collapse', 'Death'],
        advice: ['Never combine', 'Medical emergency if combined', 'Call 911 immediately', 'High fatality risk']
      },
      'kava+opioids': {
        risk: 'dangerous',
        mechanism: 'Opioids and kava both cause respiratory depression through different pathways, creating lethal synergy.',
        effects: ['Respiratory arrest', 'Overdose', 'Blue lips/fingernails', 'Loss of consciousness', 'Death'],
        advice: ['Extremely dangerous', 'High overdose risk', 'Have naloxone available', 'Emergency medical care if combined']
      },
      'kava+hepatotoxic-drugs': {
        risk: 'dangerous',
        mechanism: 'Kava is potentially hepatotoxic and combining with other liver-damaging substances increases toxicity risk.',
        effects: ['Severe liver damage', 'Hepatitis', 'Liver failure', 'Jaundice', 'Death'],
        advice: ['Avoid acetaminophen completely', 'No alcohol use', 'Monitor liver function', 'Stop kava if liver symptoms appear']
      },
      'kava+sedatives': {
        risk: 'risky',
        mechanism: 'Sleep medications and kava have additive sedative effects that can cause dangerous over-sedation.',
        effects: ['Excessive sedation', 'Morning grogginess', 'Coordination problems', 'Respiratory depression'],
        advice: ['Reduce both doses significantly', 'High risk of over-sedation', 'Avoid driving next day', 'Medical supervision advised']
      },
      'kava+anticonvulsants': {
        risk: 'risky',
        mechanism: 'Kava may interfere with seizure medications and has its own anticonvulsant properties.',
        effects: ['Altered seizure threshold', 'Medication interference', 'Unpredictable effects', 'Increased sedation'],
        advice: ['Consult neurologist before use', 'Monitor seizure control', 'May require medication adjustment', 'Regular medical monitoring']
      },

      // KRATOM INTERACTIONS
      'kratom+alcohol': {
        risk: 'deadly',
        mechanism: 'Both substances cause CNS depression through different mechanisms with additive respiratory depression and liver toxicity.',
        effects: ['Severe respiratory depression', 'Liver damage', 'Loss of consciousness', 'Coma', 'Death'],
        advice: ['Never combine these substances', 'High overdose risk', 'Both are hepatotoxic', 'Call emergency services if combined']
      },
      'kratom+benzodiazepines': {
        risk: 'deadly',
        mechanism: 'Kratom\'s opioid-like effects combined with benzodiazepine GABA enhancement creates dangerous respiratory depression.',
        effects: ['Respiratory failure', 'Loss of consciousness', 'Coma', 'Death'],
        advice: ['Extremely dangerous combination', 'High fatality risk', 'Never mix these substances', 'Medical emergency if combined']
      },
      'kratom+opioids': {
        risk: 'deadly',
        mechanism: 'Kratom acts as partial μ-opioid agonist, creating additive respiratory depression with dangerous synergy.',
        effects: ['Respiratory arrest', 'Overdose', 'Blue lips/fingernails', 'Loss of consciousness', 'Death'],
        advice: ['Never combine opioids', 'Extremely high overdose risk', 'Have naloxone available', 'Emergency medical care required']
      },
      'kratom+maois': {
        risk: 'dangerous',
        mechanism: 'MAOIs may affect kratom alkaloid metabolism and increase serotonergic activity, risking serotonin syndrome.',
        effects: ['Serotonin syndrome', 'Hypertensive crisis', 'Hyperthermia', 'Altered consciousness'],
        advice: ['Consult physician first', 'Monitor for serotonin syndrome', 'Start with lowest doses', 'Medical supervision required']
      },
      'kratom+tramadol': {
        risk: 'dangerous',
        mechanism: 'Both substances have opioid and serotonergic activity, creating seizure risk and serotonin syndrome potential.',
        effects: ['Seizures', 'Serotonin syndrome', 'Respiratory depression', 'Dangerous drug interactions'],
        advice: ['Never combine', 'High seizure risk', 'Serotonin syndrome possible', 'Medical emergency if combined']
      },
      'kratom+hepatotoxic-drugs': {
        risk: 'dangerous',
        mechanism: 'Kratom has reported hepatotoxicity cases; combining with other liver-toxic substances increases damage risk.',
        effects: ['Liver damage', 'Hepatitis', 'Elevated liver enzymes', 'Liver failure'],
        advice: ['Avoid acetaminophen', 'No alcohol use', 'Monitor liver function regularly', 'Stop kratom if liver symptoms']
      },
      'kratom+cns-depressants': {
        risk: 'dangerous',
        mechanism: 'Sleep medications and kratom have additive CNS depressant effects causing dangerous over-sedation.',
        effects: ['Severe sedation', 'Respiratory depression', 'Loss of consciousness', 'Coordination loss'],
        advice: ['Avoid combination', 'High risk of over-sedation', 'Reduce both substances significantly', 'Medical supervision needed']
      },
      'kratom+stimulants': {
        risk: 'risky',
        mechanism: 'Stimulants may mask kratom sedation while increasing cardiovascular stress and masking overdose signs.',
        effects: ['Masked sedation', 'Cardiovascular stress', 'Hidden overdose signs', 'Cardiac arrhythmias'],
        advice: ['Use extreme caution', 'Monitor heart rate', 'Watch for hidden effects', 'Avoid high doses of either']
      },
      'kratom+antidepressants': {
        risk: 'risky',
        mechanism: 'Kratom affects serotonin systems and may interact with SSRIs/SNRIs, altering effectiveness or causing side effects.',
        effects: ['Altered antidepressant effects', 'Possible serotonin syndrome', 'Mood instability', 'Withdrawal complications'],
        advice: ['Consult psychiatrist first', 'Monitor mood changes', 'Watch for serotonin syndrome', 'Medical supervision advised']
      },

      // LION'S TAIL INTERACTIONS
      'lions-tail+cannabis': {
        risk: 'caution',
        mechanism: 'Both substances have mild psychoactive effects and may have additive sedative or cognitive effects.',
        effects: ['Enhanced relaxation', 'Increased sedation', 'Possible enhanced psychoactive effects', 'Respiratory irritation if both smoked'],
        advice: ['Start with lower doses of both', 'Monitor for increased sedation', 'Consider vaporization over smoking', 'Effects may be synergistic']
      },
      'lions-tail+alcohol': {
        risk: 'caution',
        mechanism: 'Alcohol may enhance the mild sedative effects of Lion\'s Tail, potentially causing increased impairment.',
        effects: ['Increased sedation', 'Enhanced relaxation', 'Possible dizziness', 'Mild coordination impairment'],
        advice: ['Reduce alcohol consumption', 'Monitor for excessive sedation', 'Avoid driving or operating machinery', 'Stay hydrated']
      },
      'lions-tail+respiratory-conditions': {
        risk: 'caution',
        mechanism: 'Smoking Lion\'s Tail may irritate respiratory system, especially problematic for those with existing conditions.',
        effects: ['Respiratory irritation', 'Coughing', 'Potential worsening of asthma or COPD', 'Lung inflammation'],
        advice: ['Use vaporization instead of smoking', 'Consider oral preparation (tea)', 'Consult physician if respiratory issues', 'Monitor breathing patterns']
      },
      'lions-tail+sedatives': {
        risk: 'caution',
        mechanism: 'Lion\'s Tail\'s mild relaxing effects may be enhanced by other sedative substances.',
        effects: ['Increased drowsiness', 'Enhanced sedation', 'Possible coordination issues', 'Excessive relaxation'],
        advice: ['Use minimal doses', 'Monitor for over-sedation', 'Avoid activities requiring alertness', 'Consider spacing doses']
      },

      // BLUE LOTUS INTERACTIONS
      'blue-lotus+cannabis': {
        risk: 'caution',
        mechanism: 'Both substances have mild psychoactive and relaxing effects that may be synergistic.',
        effects: ['Enhanced dream states', 'Increased relaxation', 'Possible enhanced mild psychoactive effects', 'Respiratory irritation if both smoked'],
        advice: ['Start with lower doses of both', 'Monitor for excessive sedation', 'Consider vaporization over smoking', 'Effects may enhance dream recall']
      },
      'blue-lotus+alcohol': {
        risk: 'caution',
        mechanism: 'Alcohol may enhance Blue Lotus\'s mild sedative effects and interfere with its traditional dream-enhancing properties.',
        effects: ['Increased sedation', 'Reduced dream recall', 'Possible mild coordination impairment', 'Dehydration'],
        advice: ['Limit alcohol consumption', 'Stay well hydrated', 'Avoid before bedtime if seeking dream effects', 'Monitor for excessive sedation']
      },
      'blue-lotus+sedatives': {
        risk: 'caution',
        mechanism: 'Blue Lotus\'s mild relaxing effects may be enhanced by other sedative substances.',
        effects: ['Increased drowsiness', 'Enhanced sedation', 'Possible coordination issues', 'Excessive relaxation'],
        advice: ['Use minimal doses', 'Monitor for over-sedation', 'Avoid activities requiring alertness', 'Consider spacing doses']
      },
      'blue-lotus+respiratory-conditions': {
        risk: 'caution',
        mechanism: 'Smoking Blue Lotus may irritate already compromised respiratory systems.',
        effects: ['Respiratory irritation', 'Coughing', 'Possible asthma exacerbation', 'Lung discomfort'],
        advice: ['Consider oral or tea preparation instead', 'Avoid if severe respiratory issues', 'Use vaporization if smoking preferred', 'Monitor breathing']
      },

      // MESCAL BEAN INTERACTIONS
      'mescal-bean+nicotine': {
        risk: 'deadly',
        mechanism: 'Both substances activate nicotinic receptors, potentially causing fatal nicotinic storm and respiratory paralysis.',
        effects: ['Nicotinic storm', 'Respiratory paralysis', 'Seizures', 'Cardiovascular collapse', 'Death'],
        advice: ['Never combine', 'Call 911 immediately if combined', 'Monitor breathing constantly', 'Extremely dangerous interaction']
      },
      'mescal-bean+stimulants': {
        risk: 'deadly',
        mechanism: 'Mescal bean\'s nicotinic activity combined with stimulants creates dangerous cardiovascular stress and seizure risk.',
        effects: ['Severe hypertension', 'Cardiac arrhythmias', 'Seizures', 'Stroke risk', 'Death'],
        advice: ['Never combine', 'Emergency medical intervention required', 'Monitor heart rate and blood pressure', 'High risk of fatal complications']
      },
      'mescal-bean+depressants': {
        risk: 'deadly',
        mechanism: 'Mescal bean can cause respiratory depression which is dangerously enhanced by other depressants.',
        effects: ['Severe respiratory depression', 'Coma', 'Death', 'Paralysis', 'Cardiovascular collapse'],
        advice: ['Absolutely contraindicated', 'Call 911 immediately', 'Monitor breathing closely', 'Have emergency medical support ready']
      },
      'mescal-bean+maois': {
        risk: 'dangerous',
        mechanism: 'MAOIs may interact with mescal bean alkaloids and potentially enhance toxicity through unknown mechanisms.',
        effects: ['Enhanced toxicity', 'Prolonged paralysis', 'Severe nausea', 'Cardiovascular instability'],
        advice: ['Avoid combination', 'Unknown interaction profile', 'Enhanced medical monitoring required', 'Consult poison control']
      },
      'mescal-bean+anticonvulsants': {
        risk: 'dangerous',
        mechanism: 'Mescal bean can cause seizures that may overwhelm anticonvulsant medications.',
        effects: ['Breakthrough seizures', 'Medication ineffectiveness', 'Status epilepticus risk', 'Neurological damage'],
        advice: ['Contraindicated', 'Seizure medications may be insufficient', 'Emergency neurological care', 'Do not rely on standard anticonvulsants']
      },

      // MUCUNA PRURIENS INTERACTIONS
      'mucuna-pruriens+levodopa': {
        risk: 'dangerous',
        mechanism: 'Mucuna pruriens contains natural L-DOPA, combining with pharmaceutical L-DOPA can cause dangerous dopamine overdose.',
        effects: ['Dyskinesia', 'Nausea and vomiting', 'Cardiac arrhythmias', 'Hypotension', 'Hallucinations'],
        advice: ['Consult neurologist before combining', 'Monitor for dyskinesia', 'May need L-DOPA dose reduction', 'Never combine without medical supervision']
      },
      'mucuna-pruriens+parkinsons-medications': {
        risk: 'dangerous',
        mechanism: 'Natural L-DOPA may interact unpredictably with carbidopa, entacapone, and other Parkinson\'s medications.',
        effects: ['Unpredictable medication levels', 'On-off phenomena', 'Dyskinesia', 'Medication toxicity'],
        advice: ['Essential medical supervision', 'Monitor Parkinson\'s symptoms closely', 'Potential medication adjustment needed', 'Never self-medicate with Parkinson\'s drugs']
      },
      'mucuna-pruriens+antipsychotics': {
        risk: 'risky',
        mechanism: 'L-DOPA increases dopamine while antipsychotics block dopamine receptors, potentially reducing medication effectiveness.',
        effects: ['Reduced antipsychotic efficacy', 'Breakthrough psychotic symptoms', 'Medication interactions', 'Unpredictable mental state'],
        advice: ['Consult psychiatrist before use', 'Monitor mental health closely', 'May interfere with treatment', 'Close medical supervision required']
      },
      'mucuna-pruriens+maois': {
        risk: 'risky',
        mechanism: 'MAOIs can enhance dopamine activity from L-DOPA, potentially causing excessive dopaminergic effects.',
        effects: ['Enhanced dopamine effects', 'Possible hypertension', 'Increased side effects', 'Unpredictable interactions'],
        advice: ['Medical supervision recommended', 'Monitor blood pressure', 'Watch for excessive stimulation', 'Start with lower doses']
      },
      'mucuna-pruriens+blood-pressure-medications': {
        risk: 'caution',
        mechanism: 'L-DOPA can cause orthostatic hypotension, potentially enhancing blood pressure medication effects.',
        effects: ['Excessive blood pressure lowering', 'Dizziness', 'Fainting', 'Falls risk'],
        advice: ['Monitor blood pressure regularly', 'Rise slowly from sitting/lying', 'Watch for dizziness', 'Consult physician if on BP meds']
      },
      'mucuna-pruriens+stimulants': {
        risk: 'caution',
        mechanism: 'Both substances can increase dopamine activity, potentially causing overstimulation and cardiovascular stress.',
        effects: ['Excessive stimulation', 'Anxiety', 'Rapid heart rate', 'Blood pressure elevation', 'Sleep disruption'],
        advice: ['Avoid high stimulant doses', 'Monitor heart rate', 'Watch for overstimulation', 'Consider spacing doses']
      },
      'mucuna-pruriens+iron-supplements': {
        risk: 'caution',
        mechanism: 'Iron can interfere with L-DOPA absorption, reducing Mucuna pruriens effectiveness.',
        effects: ['Reduced absorption', 'Decreased effectiveness', 'Potential iron accumulation', 'Digestive issues'],
        advice: ['Space doses 2+ hours apart', 'Take on empty stomach when possible', 'Monitor for reduced effects', 'Consider timing optimization']
      },

      // MANDRAKE INTERACTIONS
      'mandrake+alcohol': {
        risk: 'deadly',
        mechanism: 'Alcohol enhances anticholinergic effects and respiratory depression, dramatically increasing risk of fatal overdose.',
        effects: ['Severe respiratory depression', 'Enhanced delirium', 'Cardiac arrest', 'Coma', 'Death'],
        advice: ['Never combine', 'Call 911 immediately if combined', 'Extremely dangerous combination', 'Death highly likely']
      },
      'mandrake+anticholinergics': {
        risk: 'deadly',
        mechanism: 'Additive anticholinergic effects create extreme toxicity with nearly certain fatal outcome.',
        effects: ['Severe anticholinergic storm', 'Hyperthermia', 'Cardiac arrest', 'Respiratory failure', 'Death'],
        advice: ['Absolutely contraindicated', 'Medical emergency', 'Fatal combination', 'No safe dose exists']
      },
      'mandrake+depressants': {
        risk: 'deadly',
        mechanism: 'Respiratory depression from both substances compounds into fatal respiratory failure.',
        effects: ['Severe respiratory depression', 'Coma', 'Cardiac arrest', 'Death', 'Complete CNS shutdown'],
        advice: ['Never combine', 'Emergency medical intervention required', 'High fatality risk', 'Call 911 immediately']
      },
      'mandrake+stimulants': {
        risk: 'deadly',
        mechanism: 'Stimulants worsen hyperthermia and cardiovascular toxicity from tropane alkaloids.',
        effects: ['Extreme hyperthermia', 'Cardiac arrhythmias', 'Stroke', 'Heart attack', 'Death'],
        advice: ['Extremely dangerous', 'Fatal cardiovascular events likely', 'Emergency medical care required', 'Never combine']
      },
      'mandrake+maois': {
        risk: 'deadly',
        mechanism: 'Unpredictable interactions between MAOIs and tropane alkaloids can enhance toxicity through unknown mechanisms.',
        effects: ['Enhanced anticholinergic toxicity', 'Hyperthermia', 'Cardiovascular collapse', 'Death'],
        advice: ['Contraindicated', 'Unknown interaction mechanisms', 'Potentially fatal', 'Avoid completely']
      },
      'mandrake+psychedelics': {
        risk: 'deadly',
        mechanism: 'Psychedelics may intensify terrifying delirium while mandrake blocks reality testing completely.',
        effects: ['Extreme terror', 'Complete reality loss', 'Self-harm risk', 'Permanent psychological trauma', 'Death from hyperthermia'],
        advice: ['Never combine', 'Psychological trauma likely', 'Self-harm risk extreme', 'Medical supervision essential']
      },
      'mandrake+heart-medications': {
        risk: 'deadly',
        mechanism: 'Tropane alkaloids can overwhelm cardiac medications and cause dangerous arrhythmias.',
        effects: ['Cardiac arrhythmias', 'Heart attack', 'Stroke', 'Medication ineffectiveness', 'Death'],
        advice: ['Contraindicated with heart conditions', 'Fatal cardiac events likely', 'Emergency medical care', 'Never use with heart problems']
      },
      'mandrake+any-substance': {
        risk: 'deadly',
        mechanism: 'Mandrake has no safe recreational dose and makes any other substance exponentially more dangerous.',
        effects: ['Unpredictable toxicity', 'Enhanced effects of all substances', 'Multiple organ failure', 'Death'],
        advice: ['No safe combinations exist', 'Mandrake contraindicated for recreational use', 'Seek emergency medical care', 'Extremely dangerous plant']
      },

      // MIMOSA SPP. INTERACTIONS
      'mimosa-spp+maois': {
        risk: 'dangerous',
        mechanism: 'Traditional jurema preparations often contain MAOIs, adding additional MAOIs creates dangerous interactions and potential serotonin syndrome.',
        effects: ['Excessive MAO inhibition', 'Dangerous drug interactions', 'Hypertensive crisis', 'Serotonin syndrome'],
        advice: ['Never combine with pharmaceutical MAOIs', 'Dangerous interaction with Syrian rue', 'Monitor blood pressure', 'Medical supervision required']
      },
      'mimosa-spp+ssris': {
        risk: 'deadly',
        mechanism: 'DMT combined with MAOI activity interacts dangerously with SSRIs, creating severe serotonin syndrome risk.',
        effects: ['Severe serotonin syndrome', 'Hyperthermia', 'Seizures', 'Cardiovascular collapse', 'Death'],
        advice: ['Never combine', 'Life-threatening interaction', 'Call 911 immediately', 'Discontinue SSRIs weeks before use']
      },
      'mimosa-spp+tramadol': {
        risk: 'deadly',
        mechanism: 'Tramadol has serotonergic activity and MAOI properties that interact catastrophically with DMT/MAOI combinations.',
        effects: ['Severe serotonin syndrome', 'Seizures', 'Respiratory depression', 'Death'],
        advice: ['Absolutely contraindicated', 'Emergency medical intervention required', 'High fatality risk', 'Never combine']
      },
      'mimosa-spp+stimulants': {
        risk: 'dangerous',
        mechanism: 'Stimulants combined with MAOIs can cause dangerous cardiovascular effects and hypertensive crisis.',
        effects: ['Severe hypertension', 'Cardiac arrhythmias', 'Stroke risk', 'Heart attack risk'],
        advice: ['Dangerous cardiovascular combination', 'Monitor blood pressure', 'Emergency medical care if combined', 'Avoid all stimulants']
      },
      'mimosa-spp+tyramine-foods': {
        risk: 'dangerous',
        mechanism: 'MAO inhibition prevents tyramine breakdown, causing dangerous blood pressure spikes with aged cheeses, cured meats, etc.',
        effects: ['Hypertensive crisis', 'Severe headache', 'Stroke risk', 'Cardiovascular emergency'],
        advice: ['Strict dietary restrictions required', 'Avoid aged cheeses, cured meats, fermented foods', 'Medical emergency if consumed', 'Follow MAOI diet guidelines']
      },
      'mimosa-spp+dextromethorphan': {
        risk: 'deadly',
        mechanism: 'DXM has serotonergic properties that interact dangerously with DMT/MAOI combinations.',
        effects: ['Serotonin syndrome', 'Hyperthermia', 'Seizures', 'Respiratory depression'],
        advice: ['Never combine', 'Over-the-counter danger', 'Check all cough medications', 'Life-threatening interaction']
      },
      'mimosa-spp+alcohol': {
        risk: 'risky',
        mechanism: 'Alcohol may enhance nausea and interact unpredictably with both DMT effects and MAO inhibition.',
        effects: ['Enhanced nausea and vomiting', 'Increased dehydration', 'Unpredictable interactions', 'Poor decision making'],
        advice: ['Avoid alcohol completely', 'Increased purging risk', 'Dehydration danger', 'Impaired judgment during intense experience']
      },
      'mimosa-spp+cannabis': {
        risk: 'caution',
        mechanism: 'Cannabis may intensify the psychological effects of DMT experiences unpredictably.',
        effects: ['Intensified psychedelic effects', 'Increased anxiety potential', 'Extended confusion', 'Unpredictable interactions'],
        advice: ['Use extreme caution', 'May intensify difficult experiences', 'Start with much lower doses', 'Experienced users only']
      },

      // MORNING GLORY INTERACTIONS
      'morning-glory+ssris': {
        risk: 'dangerous',
        mechanism: 'SSRIs significantly reduce LSA effectiveness and may cause serotonin syndrome when combined with ergot alkaloids.',
        effects: ['Reduced psychedelic effects', 'Serotonin syndrome risk', 'Unpredictable reactions', 'Wasted substance'],
        advice: ['Taper SSRIs weeks before use', 'Dangerous interaction potential', 'Consult physician', 'May require medical supervision']
      },
      'morning-glory+maois': {
        risk: 'dangerous',
        mechanism: 'MAOIs can dangerously potentiate LSA and other ergot alkaloids, causing unpredictable and intense effects.',
        effects: ['Extreme potentiation', 'Unpredictable intensity', 'Extended duration', 'Cardiovascular stress'],
        advice: ['Never combine', 'Dangerous potentiation', 'Unpredictable effects', 'Medical supervision required']
      },
      'morning-glory+stimulants': {
        risk: 'dangerous',
        mechanism: 'Stimulants combined with ergot alkaloids increase vasoconstriction and cardiovascular stress significantly.',
        effects: ['Severe vasoconstriction', 'Cardiovascular strain', 'Hypertension', 'Circulation problems'],
        advice: ['Avoid all stimulants', 'High cardiovascular risk', 'Monitor circulation', 'Dangerous vasoconstriction']
      },
      'morning-glory+ergot-medications': {
        risk: 'deadly',
        mechanism: 'Combining ergot alkaloids from multiple sources can cause dangerous vasoconstriction and tissue damage.',
        effects: ['Extreme vasoconstriction', 'Tissue necrosis', 'Gangrene risk', 'Cardiovascular collapse'],
        advice: ['Never combine ergot sources', 'Life-threatening interaction', 'Medical emergency', 'Immediate medical care required']
      },
      'morning-glory+blood-pressure-medications': {
        risk: 'dangerous',
        mechanism: 'LSA\'s vasoconstrictor effects can overwhelm blood pressure medications and cause dangerous interactions.',
        effects: ['Blood pressure spikes', 'Medication ineffectiveness', 'Cardiovascular stress', 'Stroke risk'],
        advice: ['Contraindicated with BP meds', 'Cardiovascular monitoring required', 'May cause hypertensive emergency', 'Consult physician']
      },
      'morning-glory+tramadol': {
        risk: 'dangerous',
        mechanism: 'Both substances have serotonergic activity and tramadol lowers seizure threshold when combined with psychedelics.',
        effects: ['Serotonin syndrome', 'Seizure risk', 'Hyperthermia', 'Cardiovascular complications'],
        advice: ['High seizure risk', 'Serotonin syndrome danger', 'Never combine', 'Emergency medical care if combined']
      },
      'morning-glory+heart-medications': {
        risk: 'dangerous',
        mechanism: 'Ergot alkaloids can interfere with cardiac medications and cause dangerous cardiovascular effects.',
        effects: ['Cardiac arrhythmias', 'Medication interference', 'Vasoconstriction', 'Heart complications'],
        advice: ['Contraindicated with heart meds', 'Consult cardiologist', 'High cardiovascular risk', 'Emergency care may be needed']
      },
      'morning-glory+migraine-medications': {
        risk: 'dangerous',
        mechanism: 'Many migraine medications contain ergot alkaloids, creating dangerous additive vasoconstriction.',
        effects: ['Extreme vasoconstriction', 'Severe headache', 'Circulation problems', 'Tissue damage risk'],
        advice: ['Check all migraine meds', 'Ergot alkaloid overlap', 'Dangerous vasoconstriction', 'Medical supervision required']
      },
      'morning-glory+caffeine': {
        risk: 'risky',
        mechanism: 'Caffeine enhances vasoconstriction and may increase anxiety and physical discomfort during LSA experiences.',
        effects: ['Increased vasoconstriction', 'Enhanced anxiety', 'Circulation problems', 'Increased body load'],
        advice: ['Avoid caffeine', 'Increased discomfort', 'Circulation monitoring', 'Enhanced negative effects']
      },
      'morning-glory+nicotine': {
        risk: 'risky',
        mechanism: 'Nicotine adds to vasoconstriction effects and may increase nausea during the experience.',
        effects: ['Enhanced vasoconstriction', 'Increased nausea', 'Circulation problems', 'Worsened body load'],
        advice: ['Avoid tobacco/nicotine', 'Increased physical discomfort', 'Circulation concerns', 'Enhanced negative effects']
      },
      'morning-glory+alcohol': {
        risk: 'risky',
        mechanism: 'Alcohol enhances nausea and dehydration while potentially masking dangerous vasoconstriction symptoms.',
        effects: ['Severe nausea', 'Dehydration', 'Masked circulation problems', 'Poor decision making'],
        advice: ['Avoid alcohol completely', 'Severe nausea risk', 'Dehydration danger', 'May mask circulation problems']
      },
      'morning-glory+cannabis': {
        risk: 'caution',
        mechanism: 'Cannabis may help with nausea but could intensify psychological effects unpredictably.',
        effects: ['Reduced nausea potential', 'Intensified psychedelic effects', 'Increased confusion', 'Unpredictable interactions'],
        advice: ['May help nausea', 'Can intensify experience', 'Use minimal amounts', 'Monitor effects carefully']
      },
      'morning-glory+antiemetics': {
        risk: 'caution',
        mechanism: 'Anti-nausea medications may interact with serotonergic effects but could be beneficial for severe nausea.',
        effects: ['Reduced nausea', 'Possible serotonergic interactions', 'Altered absorption', 'Changed experience profile'],
        advice: ['Consult physician', 'Serotonergic interaction potential', 'May reduce authentic experience', 'Medical guidance recommended']
      },

      // AMANITA MUSCARIA (expanded)
      'amanita+phenothiazines': {
        risk: 'dangerous',
        mechanism: 'Antipsychotic medications may not prevent dangerous confusion and could enhance sedation with unpredictable results.',
        effects: ['Enhanced sedation', 'Medication interference', 'Unpredictable psychoactive effects', 'Confusion amplification'],
        advice: ['Avoid combination', 'Antipsychotics may not be protective', 'Medical supervision required', 'Unpredictable interaction']
      },
      'amanita+tricyclic-antidepressants': {
        risk: 'dangerous',
        mechanism: 'Tricyclic antidepressants have anticholinergic properties that may interact with muscimol in dangerous ways.',
        effects: ['Enhanced anticholinergic effects', 'Dangerous sedation', 'Cardiac complications', 'Confusion'],
        advice: ['Never combine', 'Dangerous interaction potential', 'Cardiac monitoring required', 'Medical emergency risk']
      },
      'amanita+anticonvulsants': {
        risk: 'risky',
        mechanism: 'Muscimol affects GABA receptors and may interfere with seizure medications or alter seizure threshold.',
        effects: ['Altered seizure threshold', 'Medication interference', 'Breakthrough seizures possible', 'Enhanced sedation'],
        advice: ['Consult neurologist', 'Seizure medication monitoring', 'May affect treatment', 'Medical supervision required']
      },

      // AYAHUASCA/DMT EXPANDED INTERACTIONS
      'ayahuasca+5-htp': {
        risk: 'dangerous',
        mechanism: '5-HTP increases serotonin production which combined with MAOI activity can cause dangerous serotonin accumulation.',
        effects: ['Serotonin syndrome', 'Hyperthermia', 'Agitation', 'Dangerous serotonin levels'],
        advice: ['Stop 5-HTP weeks before ayahuasca', 'Dangerous serotonin interaction', 'Medical supervision required', 'Never combine']
      },
      'ayahuasca+st-johns-wort': {
        risk: 'dangerous',
        mechanism: 'St. John\'s Wort has MAOI and SSRI-like properties that create dangerous interactions with ayahuasca.',
        effects: ['Serotonin syndrome', 'Unpredictable MAOI interactions', 'Hyperthermia', 'Cardiovascular effects'],
        advice: ['Stop St. John\'s Wort 2-3 weeks before', 'Dangerous herbal interaction', 'Medical emergency potential', 'Natural does not mean safe']
      },
      'ayahuasca+rhodiola': {
        risk: 'risky',
        mechanism: 'Rhodiola has mild MAOI activity and serotonergic effects that may interact with ayahuasca.',
        effects: ['Enhanced MAOI activity', 'Possible serotonin effects', 'Unpredictable potentiation', 'Extended duration'],
        advice: ['Discontinue rhodiola before ceremony', 'Potential interaction', 'Consult physician', 'Unknown safety profile']
      },
      'ayahuasca+ginseng': {
        risk: 'risky',
        mechanism: 'Ginseng may interact with MAOIs and affect blood pressure during ayahuasca experiences.',
        effects: ['Blood pressure fluctuations', 'Possible MAOI interaction', 'Cardiovascular stress', 'Unpredictable effects'],
        advice: ['Stop ginseng before ceremony', 'Cardiovascular interaction possible', 'Monitor blood pressure', 'Consult physician']
      },
      'ayahuasca+green-tea-extract': {
        risk: 'caution',
        mechanism: 'High doses of green tea extract contain significant caffeine which can interact with MAOIs.',
        effects: ['Blood pressure elevation', 'Anxiety increase', 'MAOI-caffeine interaction', 'Jitteriness'],
        advice: ['Avoid concentrated extracts', 'MAOI diet includes caffeine restriction', 'Light tea consumption only', 'Monitor anxiety levels']
      },

      // 2C-B EXPANDED INTERACTIONS
      '2c-b+tramadol': {
        risk: 'dangerous',
        mechanism: 'Both substances affect serotonin systems, creating serotonin syndrome risk plus seizure threshold lowering.',
        effects: ['Serotonin syndrome', 'Seizure risk', 'Hyperthermia', 'Cardiovascular complications'],
        advice: ['Never combine', 'High seizure risk', 'Serotonin syndrome danger', 'Medical emergency potential']
      },
      '2c-b+lithium': {
        risk: 'dangerous',
        mechanism: 'Lithium significantly increases seizure risk with psychedelics, especially phenethylamines like 2C-B.',
        effects: ['Severe seizure risk', 'Neurological complications', 'Potential brain damage', 'Medical emergency'],
        advice: ['Never combine with lithium', 'Extremely high seizure risk', 'Consult psychiatrist', 'Dangerous interaction']
      },
      '2c-b+stimulants': {
        risk: 'risky',
        mechanism: '2C-B has mild stimulant properties that combine with other stimulants to increase cardiovascular stress.',
        effects: ['Increased heart rate', 'Blood pressure elevation', 'Anxiety amplification', 'Overstimulation'],
        advice: ['Avoid stimulant combinations', 'Monitor heart rate', 'Cardiovascular stress', 'Start with lower doses']
      },
      '2c-b+alcohol': {
        risk: 'risky',
        mechanism: 'Alcohol can reduce 2C-B effects while increasing nausea and impairing judgment during the experience.',
        effects: ['Reduced psychedelic effects', 'Increased nausea', 'Impaired judgment', 'Dehydration'],
        advice: ['Avoid alcohol during trip', 'Reduces beneficial effects', 'Increases nausea', 'Impairs harm reduction']
      },
      '2c-b+cannabis': {
        risk: 'moderate',
        mechanism: 'Cannabis can significantly intensify 2C-B visuals and psychological effects, sometimes unexpectedly.',
        effects: ['Intensified visuals', 'Increased confusion', 'Enhanced body load', 'Unpredictable potentiation'],
        advice: ['Use cannabis very sparingly', 'May dramatically increase intensity', 'Have CBD available', 'Start with minimal amounts']
      },

      // 2C-B-FLY SPECIFIC INTERACTIONS - EXTENDED DURATION RISKS
      '2c-b-fly+stimulants': {
        risk: 'dangerous',
        mechanism: '2C-B-FLY\'s 12-18 hour duration combined with stimulants creates extended cardiovascular stress and overheating risk.',
        effects: ['Prolonged cardiovascular stress', 'Extended hyperthermia risk', 'Severe anxiety', 'Exhaustion', 'Cardiac complications'],
        advice: ['NEVER combine with stimulants', 'Extended duration increases risks', 'Cardiovascular emergency possible', 'Seek medical attention if combined']
      },
      '2c-b-fly+alcohol': {
        risk: 'dangerous',
        mechanism: 'Alcohol impairs judgment during the extremely long 2C-B-FLY experience and increases vasoconstriction risks.',
        effects: ['Impaired judgment for 18+ hours', 'Increased circulation problems', 'Dehydration', 'Dangerous decision-making'],
        advice: ['Absolutely avoid alcohol', 'Impairs judgment for entire long trip', 'Circulation problems worsen', 'Medical supervision recommended']
      },
      '2c-b-fly+cannabis': {
        risk: 'risky',
        mechanism: 'Cannabis can dramatically intensify 2C-B-FLY effects for the entire 12-18 hour duration, creating overwhelming experiences.',
        effects: ['Intense, prolonged confusion', 'Overwhelming visuals for hours', 'Extreme anxiety', 'Inability to function for extended period'],
        advice: ['Avoid cannabis entirely during trip', 'Effects last entire long duration', 'Can create multi-hour crisis', 'Have trip sitter present']
      },
      '2c-b-fly+maois': {
        risk: 'deadly',
        mechanism: 'MAOIs can dangerously extend and intensify the already very long 2C-B-FLY experience, creating potentially fatal complications.',
        effects: ['Extremely prolonged trip (24+ hours)', 'Dangerous hyperthermia', 'Severe vasoconstriction', 'Cardiovascular crisis', 'Death risk'],
        advice: ['NEVER combine with MAOIs', 'Can extend trip to dangerous lengths', 'Medical emergency risk', 'Potentially fatal interaction']
      },
      '2c-b-fly+other-psychedelics': {
        risk: 'dangerous',
        mechanism: 'Combining 2C-B-FLY with other psychedelics extends and unpredictably intensifies effects for dangerous lengths of time.',
        effects: ['Extremely long combined trip', 'Unpredictable interactions', 'Overwhelming experiences', 'Mental health risks'],
        advice: ['Never combine with other psychedelics', 'Duration becomes unmanageable', 'Unpredictable potentiation', 'High psychological risk']
      },

      // CANNABIS EXPANDED INTERACTIONS
      'thc+schizophrenia-medications': {
        risk: 'risky',
        mechanism: 'THC may interfere with antipsychotic effectiveness and could trigger psychiatric symptoms.',
        effects: ['Reduced medication effectiveness', 'Psychotic symptom risk', 'Treatment interference', 'Mental health complications'],
        advice: ['Consult psychiatrist before use', 'May interfere with treatment', 'Monitor mental health closely', 'Medication effectiveness may decrease']
      },
      'thc+warfarin': {
        risk: 'risky',
        mechanism: 'THC may affect warfarin metabolism, potentially altering blood clotting times.',
        effects: ['Altered blood clotting', 'Bleeding risk changes', 'INR fluctuations', 'Anticoagulation interference'],
        advice: ['Monitor INR closely', 'Consult physician', 'Bleeding risk assessment', 'Medical supervision required']
      },
      'thc+seizure-medications': {
        risk: 'risky',
        mechanism: 'THC may lower seizure threshold in some individuals and interact with anticonvulsant medications.',
        effects: ['Altered seizure threshold', 'Possible breakthrough seizures', 'Medication interference', 'Neurological effects'],
        advice: ['Consult neurologist', 'Monitor seizure control', 'CBD may be safer option', 'Medical supervision advised']
      },
      'thc+heart-medications': {
        risk: 'risky',
        mechanism: 'THC can affect heart rate and blood pressure, potentially interacting with cardiac medications.',
        effects: ['Heart rate changes', 'Blood pressure fluctuations', 'Medication effectiveness changes', 'Cardiovascular effects'],
        advice: ['Consult cardiologist', 'Monitor cardiovascular parameters', 'Start with low doses', 'Avoid if unstable heart condition']
      },
      'cbd+blood-thinners': {
        risk: 'risky',
        mechanism: 'CBD may inhibit enzymes that metabolize blood-thinning medications, potentially increasing bleeding risk.',
        effects: ['Increased bleeding risk', 'Enhanced anticoagulation', 'Drug level changes', 'Bruising increase'],
        advice: ['Monitor bleeding signs', 'Consult physician', 'May need dose adjustment', 'Regular blood work recommended']
      },
      'cbd+seizure-medications': {
        risk: 'moderate',
        mechanism: 'CBD can increase levels of some seizure medications, potentially causing side effects or toxicity.',
        effects: ['Increased medication levels', 'Enhanced side effects', 'Potential toxicity', 'Drowsiness'],
        advice: ['Medical supervision required', 'Monitor medication levels', 'May need dose adjustment', 'Watch for increased side effects']
      },
      'cbd+liver-medications': {
        risk: 'moderate',
        mechanism: 'CBD is metabolized by liver enzymes and may interact with other medications processed by the same pathways.',
        effects: ['Altered drug metabolism', 'Changed medication levels', 'Liver enzyme interference', 'Side effect changes'],
        advice: ['Monitor liver function', 'Consult physician', 'Regular medical monitoring', 'Dose adjustments may be needed']
      },

      // COCAINE EXPANDED INTERACTIONS
      'cocaine+beta-blockers': {
        risk: 'deadly',
        mechanism: 'Beta-blockers can cause unopposed alpha stimulation with cocaine, leading to severe hypertension and cardiac events.',
        effects: ['Severe hypertension', 'Coronary artery spasm', 'Heart attack', 'Stroke', 'Cardiovascular collapse'],
        advice: ['Never combine', 'Medical emergency if combined', 'Call 911 immediately', 'Extremely dangerous interaction']
      },
      'cocaine+viagra': {
        risk: 'deadly',
        mechanism: 'Both substances affect cardiovascular system; combination can cause dangerous blood pressure changes and cardiac events.',
        effects: ['Severe hypertension', 'Coronary artery spasm', 'Heart attack', 'Priapism', 'Cardiovascular emergency'],
        advice: ['Never combine', 'High cardiac event risk', 'Emergency medical care needed', 'Life-threatening interaction']
      },
      'cocaine+epinephrine': {
        risk: 'deadly',
        mechanism: 'Epinephrine with cocaine creates extreme cardiovascular stimulation with high risk of fatal cardiac events.',
        effects: ['Extreme hypertension', 'Cardiac arrhythmias', 'Heart attack', 'Stroke', 'Death'],
        advice: ['Medical emergency', 'Never combine', 'Inform medical personnel of cocaine use', 'Alternative emergency treatments needed']
      },
      'cocaine+local-anesthetics': {
        risk: 'dangerous',
        mechanism: 'Cocaine is itself a local anesthetic; combining with others can cause dangerous sodium channel blockade.',
        effects: ['Enhanced sodium channel blockade', 'Cardiac conduction problems', 'Seizures', 'Cardiac arrest'],
        advice: ['Inform medical/dental personnel of use', 'Dangerous interaction potential', 'Alternative anesthetics needed', 'Medical supervision required']
      },
      'cocaine+phenothiazines': {
        risk: 'dangerous',
        mechanism: 'Antipsychotic medications may increase cocaine toxicity and seizure risk through dopamine interactions.',
        effects: ['Increased seizure risk', 'Enhanced toxicity', 'Cardiac complications', 'Hyperthermia'],
        advice: ['Dangerous combination', 'Medical supervision required', 'Increased toxicity risk', 'Emergency care may be needed']
      },

      // DMT EXPANDED INTERACTIONS
      'dmt+phenelzine': {
        risk: 'deadly',
        mechanism: 'Phenelzine is a potent MAOI that creates dangerous serotonin syndrome when combined with DMT.',
        effects: ['Severe serotonin syndrome', 'Hyperthermia', 'Seizures', 'Cardiovascular collapse', 'Death'],
        advice: ['Never combine', 'Life-threatening interaction', 'Emergency medical care required', 'Fatal potential']
      },
      'dmt+tranylcypromine': {
        risk: 'deadly',
        mechanism: 'Another potent MAOI that causes dangerous accumulation of DMT and serotonin syndrome.',
        effects: ['Serotonin syndrome', 'Extreme hyperthermia', 'Seizures', 'Death', 'Cardiovascular emergency'],
        advice: ['Absolutely contraindicated', 'Fatal interaction', 'Medical emergency', 'Never combine under any circumstances']
      },
      'dmt+moclobemide': {
        risk: 'dangerous',
        mechanism: 'Reversible MAOI that still creates dangerous interactions with DMT, though potentially less severe.',
        effects: ['Serotonin syndrome', 'Hyperthermia', 'Cardiovascular effects', 'Enhanced toxicity'],
        advice: ['Dangerous interaction', 'Medical supervision required', 'Less severe than irreversible MAOIs but still dangerous', 'Avoid combination']
      },
      'dmt+harmaline': {
        risk: 'required',
        mechanism: 'Harmaline is an MAOI required for oral DMT activity, creating the traditional ayahuasca combination.',
        effects: ['Enables oral DMT activity', 'Extended duration (4-8 hours)', 'Increased nausea initially', 'Traditional visionary experience'],
        advice: ['Follow strict MAOI dietary restrictions', 'Avoid tyramine-rich foods', 'Traditional preparation recommended', 'Experienced guide advisable']
      },
      'dmt+harmane': {
        risk: 'required',
        mechanism: 'Another harmala alkaloid that enables oral DMT activity through MAO inhibition.',
        effects: ['Oral DMT activation', 'Prolonged experience', 'Enhanced effects', 'Traditional ayahuasca-like experience'],
        advice: ['Strict dietary preparation required', 'MAOI diet essential', 'Avoid contraindicated substances', 'Traditional use patterns recommended']
      },

      // FENTANYL EXPANDED INTERACTIONS
      'fentanyl+gabapentin': {
        risk: 'deadly',
        mechanism: 'Gabapentin significantly increases respiratory depression risk with fentanyl through GABA enhancement.',
        effects: ['Severe respiratory depression', 'Enhanced CNS depression', 'Coma', 'Death'],
        advice: ['Extremely dangerous', 'High fatality risk', 'Multiple naloxone doses may be needed', 'Emergency care required']
      },
      'fentanyl+pregabalin': {
        risk: 'deadly',
        mechanism: 'Pregabalin enhances respiratory depression from fentanyl, creating extremely high overdose risk.',
        effects: ['Respiratory failure', 'Severe CNS depression', 'Coma', 'Death', 'Difficult to reverse'],
        advice: ['Never combine', 'Fatal interaction', 'Emergency medical intervention required', 'Multiple naloxone needed']
      },
      'fentanyl+muscle-relaxants': {
        risk: 'deadly',
        mechanism: 'Muscle relaxants add to respiratory depression and make overdose more likely and difficult to treat.',
        effects: ['Severe respiratory depression', 'Muscle weakness', 'Coma', 'Death', 'Complicated resuscitation'],
        advice: ['Fatal combination', 'Avoid all muscle relaxants', 'Emergency care essential', 'High mortality risk']
      },
      'fentanyl+carisoprodol': {
        risk: 'deadly',
        mechanism: 'Soma (carisoprodol) significantly enhances fentanyl respiratory depression through multiple mechanisms.',
        effects: ['Respiratory failure', 'CNS depression', 'Coma', 'Death', 'Difficult reversal'],
        advice: ['Never combine', 'Extremely high death risk', 'Emergency medical care required', 'Fatal interaction potential']
      },
      'chlorodiazepoxide+opioids': {
        risk: 'deadly',
        mechanism: 'Long-acting benzodiazepine with 24-48 hour half-life combined with opioids creates extended respiratory depression risk.',
        effects: ['Prolonged respiratory depression', 'Multi-day overdose risk', 'Death', 'Difficult medical management', 'Extended CNS depression'],
        advice: ['NEVER combine due to extremely long duration', 'Monitor breathing for 48+ hours', 'Naloxone may wear off before chlorodiazepoxide', 'Extended medical supervision required']
      },
      'chlorodiazepoxide+benzodiazepines': {
        risk: 'dangerous',
        mechanism: 'Combining multiple benzodiazepines creates dangerous accumulation of GABA effects with unpredictable duration.',
        effects: ['Severe sedation', 'Memory blackouts', 'Respiratory depression', 'Multi-day impairment', 'Dangerous falls'],
        advice: ['Avoid combining different benzodiazepines', 'Effects may last 48+ hours', 'Extreme fall risk', 'Cognitive impairment severe']
      },
      'chlorodiazepoxide+barbiturates': {
        risk: 'deadly',
        mechanism: 'Both enhance GABA activity through different mechanisms, creating lethal synergistic CNS depression.',
        effects: ['Respiratory failure', 'Coma', 'Death', 'Cardiovascular collapse', 'Multi-day unconsciousness'],
        advice: ['Absolutely contraindicated', 'Emergency medical intervention required', 'High mortality risk', 'Reversal extremely difficult']
      },
      'triazolam+alcohol': {
        risk: 'deadly',
        mechanism: 'Ultra-potent benzodiazepine with alcohol creates immediate and severe respiratory depression with complete amnesia.',
        effects: ['Instant unconsciousness', 'Respiratory failure', 'Death', 'Complete blackout', 'Dangerous behaviors while unconscious'],
        advice: ['NEVER combine - extremely high death risk', 'Complete amnesia prevents self-rescue', 'Emergency medical intervention required', 'Monitor breathing continuously']
      },
      'triazolam+opioids': {
        risk: 'deadly',
        mechanism: 'Ultra-short acting benzodiazepine with extreme potency creates rapid onset respiratory depression when combined with opioids.',
        effects: ['Immediate respiratory failure', 'Rapid unconsciousness', 'Death within minutes', 'Difficult reversal', 'Naloxone may wear off quickly'],
        advice: ['Absolutely fatal combination', 'Death occurs within minutes', 'Multiple naloxone doses required', 'Extended medical monitoring essential']
      },
      'triazolam+benzodiazepines': {
        risk: 'dangerous',
        mechanism: 'Combining ultra-potent triazolam with other benzodiazepines creates unpredictable and dangerous additive effects.',
        effects: ['Severe blackouts', 'Multi-day amnesia', 'Dangerous sleepwalking', 'Respiratory depression', 'Complete disinhibition'],
        advice: ['Never combine different benzodiazepines', 'Extreme blackout risk', 'Sleepwalking danger', 'Complete memory loss for days']
      },

      // KETAMINE EXPANDED INTERACTIONS
      'ketamine+memantine': {
        risk: 'dangerous',
        mechanism: 'Both are NMDA receptor antagonists; combination may cause excessive NMDA blockade and cognitive effects.',
        effects: ['Excessive dissociation', 'Cognitive impairment', 'Memory problems', 'Prolonged effects'],
        advice: ['Avoid combination', 'Enhanced dissociative effects', 'Cognitive risk', 'Medical supervision required']
      },
      'ketamine+dextromethorphan': {
        risk: 'dangerous',
        mechanism: 'Both affect NMDA receptors; combination creates unpredictable and potentially dangerous dissociation.',
        effects: ['Extreme dissociation', 'Dangerous level of detachment', 'Respiratory effects', 'Injury risk'],
        advice: ['Never combine dissociatives', 'Extreme dissociation risk', 'Physical safety danger', 'Complete reality loss possible']
      },
      'ketamine+pcp': {
        risk: 'dangerous',
        mechanism: 'Combining NMDA antagonists creates extremely dangerous levels of dissociation with high injury risk.',
        effects: ['Extreme dissociation', 'Complete reality loss', 'Violence risk', 'Serious injury potential'],
        advice: ['Never combine', 'Extremely dangerous', 'High violence potential', 'Complete loss of reality']
      },
      'ketamine+maois': {
        risk: 'risky',
        mechanism: 'MAOIs may unpredictably alter ketamine metabolism and duration through unknown mechanisms.',
        effects: ['Unpredictable duration', 'Altered effects', 'Unknown interaction profile', 'Enhanced side effects'],
        advice: ['Unknown safety profile', 'Avoid if on MAOIs', 'Unpredictable effects', 'Medical consultation required']
      },

      // LSD EXPANDED INTERACTIONS
      'lsd+risperdal': {
        risk: 'moderate',
        mechanism: 'Risperidone can terminate LSD experiences but may not prevent all psychological effects.',
        effects: ['Trip termination', 'Reduced visuals', 'May not prevent anxiety', 'Potential dysphoria'],
        advice: ['Can be used as trip killer', 'Medical supervision preferred', 'May cause unpleasant ending', 'Not always fully protective']
      },
      'lsd+seroquel': {
        risk: 'moderate',
        mechanism: 'Quetiapine can reduce LSD effects and may help with difficult trips through serotonin receptor antagonism.',
        effects: ['Reduced trip intensity', 'Sedation', 'Trip termination potential', 'Anxiety reduction'],
        advice: ['Can help with bad trips', 'Causes sedation', 'Medical guidance preferred', 'Trip killer option']
      },
      'lsd+lithium': {
        risk: 'dangerous',
        mechanism: 'Lithium dramatically increases seizure risk with LSD and can cause dangerous neurological complications.',
        effects: ['Severe seizure risk', 'Neurological damage potential', 'Enhanced toxicity', 'Medical emergency'],
        advice: ['Never combine with lithium', 'Extremely high seizure risk', 'Consult psychiatrist', 'Dangerous neurological effects']
      },
      'lsd+lamotrigine': {
        risk: 'risky',
        mechanism: 'Lamotrigine may reduce LSD effects and could potentially interact through sodium channel effects.',
        effects: ['Reduced trip effects', 'Possible mood destabilization', 'Interaction unknown', 'Medication interference'],
        advice: ['May significantly reduce effects', 'Consult psychiatrist', 'Unknown interaction profile', 'Mood medication interference']
      },
      'lsd+st-johns-wort': {
        risk: 'risky',
        mechanism: 'St. John\'s Wort has serotonergic effects and mild MAOI activity that may interact with LSD.',
        effects: ['Unpredictable serotonin effects', 'Possible enhancement', 'Unknown interaction', 'Side effect changes'],
        advice: ['Discontinue before LSD use', 'Unknown interaction profile', 'Natural doesn\'t mean safe', 'Consult physician']
      },

      // MDMA EXPANDED INTERACTIONS
      'mdma+5-htp': {
        risk: 'dangerous',
        mechanism: '5-HTP increases serotonin production, which combined with MDMA can cause dangerous serotonin syndrome.',
        effects: ['Serotonin syndrome', 'Hyperthermia', 'Seizures', 'Cardiovascular complications'],
        advice: ['Stop 5-HTP days before MDMA', 'Dangerous serotonin interaction', 'Medical emergency potential', 'Never combine']
      },
      'mdma+dxm': {
        risk: 'deadly',
        mechanism: 'DXM has significant serotonergic activity that creates dangerous serotonin syndrome with MDMA.',
        effects: ['Severe serotonin syndrome', 'Hyperthermia', 'Seizures', 'Death', 'Cardiovascular collapse'],
        advice: ['Never combine', 'Life-threatening interaction', 'Emergency medical care', 'Fatal potential']
      },
      'mdma+lithium': {
        risk: 'dangerous',
        mechanism: 'Lithium increases seizure risk with MDMA and may enhance neurotoxicity.',
        effects: ['Increased seizure risk', 'Enhanced neurotoxicity', 'Neurological complications', 'Brain damage potential'],
        advice: ['Never combine with lithium', 'High seizure risk', 'Neurotoxicity enhancement', 'Consult psychiatrist']
      },
      'mdma+ritonavir': {
        risk: 'deadly',
        mechanism: 'HIV protease inhibitors like ritonavir dramatically increase MDMA levels, causing life-threatening toxicity.',
        effects: ['Extreme MDMA toxicity', 'Hyperthermia', 'Seizures', 'Death', 'Cardiovascular collapse'],
        advice: ['Never combine', 'Fatal interaction', 'HIV medication interaction', 'Consult physician']
      },
      'mdma+beta-blockers': {
        risk: 'dangerous',
        mechanism: 'Beta-blockers may prevent natural cooling mechanisms and mask cardiovascular warning signs.',
        effects: ['Impaired thermoregulation', 'Masked cardiac symptoms', 'Hyperthermia risk', 'Cardiovascular complications'],
        advice: ['Dangerous interaction', 'May prevent natural cooling', 'Hyperthermia risk', 'Medical supervision required']
      },
      'mdma+grapefruit-juice': {
        risk: 'risky',
        mechanism: 'Grapefruit juice inhibits enzymes that metabolize MDMA, potentially increasing effects and duration.',
        effects: ['Enhanced MDMA effects', 'Prolonged duration', 'Increased side effects', 'Unpredictable potentiation'],
        advice: ['Avoid grapefruit juice', 'May significantly enhance effects', 'Unknown potentiation', 'Unpredictable interaction']
      },

      // METHAMPHETAMINE EXPANDED INTERACTIONS
      'methamphetamine+antacids': {
        risk: 'risky',
        mechanism: 'Antacids can increase methamphetamine absorption and duration by reducing stomach acidity.',
        effects: ['Enhanced absorption', 'Prolonged effects', 'Increased toxicity', 'Extended duration'],
        advice: ['Avoid antacids', 'May increase toxicity', 'Prolonged effects possible', 'Enhanced absorption risk']
      },
      'methamphetamine+vitamin-c': {
        risk: 'moderate',
        mechanism: 'Vitamin C increases methamphetamine excretion and may help reduce effects and duration.',
        effects: ['Reduced effects', 'Faster elimination', 'Decreased duration', 'Potential comedown help'],
        advice: ['May help with comedown', 'Reduces effects and duration', 'Generally beneficial', 'Harm reduction tool']
      },
      'methamphetamine+l-tyrosine': {
        risk: 'moderate',
        mechanism: 'L-tyrosine is a dopamine precursor that may help restore depleted neurotransmitters but could enhance effects.',
        effects: ['Possible neurotransmitter restoration', 'Potential effect enhancement', 'Unknown long-term effects'],
        advice: ['Complex interaction', 'May help recovery', 'Could enhance effects', 'Medical guidance recommended']
      },
      'methamphetamine+magnesium': {
        risk: 'low',
        mechanism: 'Magnesium may help with methamphetamine-induced muscle tension and bruxism without dangerous interactions.',
        effects: ['Reduced muscle tension', 'Less jaw clenching', 'Potential cardiovascular benefits', 'Electrolyte support'],
        advice: ['May help with side effects', 'Generally safe combination', 'Helps with muscle tension', 'Supportive therapy']
      },

      // PSILOCYBIN EXPANDED INTERACTIONS
      'psilocybin+lithium': {
        risk: 'dangerous',
        mechanism: 'Lithium dramatically increases seizure risk with psilocybin mushrooms and may cause neurological damage.',
        effects: ['Severe seizure risk', 'Neurological complications', 'Potential brain damage', 'Enhanced toxicity'],
        advice: ['Never combine with lithium', 'Extremely high seizure risk', 'Consult psychiatrist', 'Dangerous neurological effects']
      },
      'psilocybin+beta-blockers': {
        risk: 'risky',
        mechanism: 'Beta-blockers may mask anxiety but could interfere with natural fear responses that provide safety signals.',
        effects: ['Masked anxiety responses', 'Reduced natural caution', 'Potential safety impairment', 'Blunted emotional responses'],
        advice: ['May reduce beneficial anxiety', 'Natural fear responses important', 'Consult physician', 'Could impair safety awareness']
      },
      'psilocybin+st-johns-wort': {
        risk: 'risky',
        mechanism: 'St. John\'s Wort affects serotonin systems and may unpredictably interact with psilocybin.',
        effects: ['Unpredictable serotonin effects', 'Possible interaction', 'Unknown safety profile', 'Effect modification'],
        advice: ['Discontinue before mushroom use', 'Unknown interaction', 'Consult physician', 'Serotonin system effects']
      },
      'psilocybin+ginkgo': {
        risk: 'caution',
        mechanism: 'Ginkgo may affect blood flow and could theoretically interact with psilocybin\'s vascular effects.',
        effects: ['Unknown vascular interactions', 'Possible blood flow changes', 'Uncertain effects'],
        advice: ['Unknown interaction profile', 'Discontinue before use to be safe', 'Consult physician', 'Limited safety data']
      },

      // SALVIA EXPANDED INTERACTIONS
      'salvia-divinorum+nitrous-oxide': {
        risk: 'dangerous',
        mechanism: 'Combining salvia with nitrous creates extremely dangerous dissociation with high risk of injury from falls.',
        effects: ['Extreme dissociation', 'Complete reality loss', 'High fall/injury risk', 'Oxygen deprivation'],
        advice: ['Never combine', 'Extremely dangerous', 'High injury risk', 'Complete dissociation possible']
      },
      'salvia-divinorum+muscle-relaxants': {
        risk: 'dangerous',
        mechanism: 'Muscle relaxants may worsen coordination problems during already dangerous salvia experiences.',
        effects: ['Severe coordination loss', 'Enhanced fall risk', 'Muscle weakness', 'Injury potential'],
        advice: ['Avoid all muscle relaxants', 'High injury risk', 'Coordination severely impaired', 'Physical safety danger']
      },
      'salvia-divinorum+sleep-medications': {
        risk: 'risky',
        mechanism: 'Sleep aids may enhance confusion and disorientation during salvia experiences.',
        effects: ['Enhanced confusion', 'Prolonged disorientation', 'Memory formation problems', 'Recovery difficulties'],
        advice: ['Avoid sleep medications', 'May worsen confusion', 'Clear-headed experience preferred', 'Recovery impairment']
      },

      // NUTMEG INTERACTIONS
      'nutmeg+any-medications': {
        risk: 'dangerous',
        mechanism: 'Nutmeg\'s chaotic multi-system effects and anticholinergic properties create unpredictable interactions with virtually all medications.',
        effects: ['Unpredictable drug interactions', 'Enhanced toxicity', 'Medication interference', 'Dangerous side effects'],
        advice: ['Never combine with any medications', 'Consult physician before use', 'Dangerous interaction potential', 'Medical supervision required']
      },
      'nutmeg+stimulants': {
        risk: 'deadly',
        mechanism: 'Stimulants combined with nutmeg\'s unpredictable effects can cause extreme cardiovascular stress and hyperthermia.',
        effects: ['Extreme hyperthermia', 'Cardiovascular collapse', 'Heart attack risk', 'Stroke potential'],
        advice: ['Never combine', 'Life-threatening interaction', 'Extreme cardiovascular risk', 'Emergency medical care required']
      },
      'nutmeg+depressants': {
        risk: 'deadly',
        mechanism: 'CNS depressants with nutmeg\'s anticholinergic effects can cause respiratory depression and dangerous sedation.',
        effects: ['Respiratory depression', 'Extreme sedation', 'Choking risk during vomiting', 'Cardiac depression'],
        advice: ['Never combine', 'Respiratory failure risk', 'Choking hazard', 'Medical emergency potential']
      },
      'nutmeg+ssris': {
        risk: 'dangerous',
        mechanism: 'SSRIs with nutmeg\'s serotonergic metabolites can cause serotonin syndrome and unpredictable psychiatric effects.',
        effects: ['Serotonin syndrome', 'Psychiatric destabilization', 'Extreme confusion', 'Hyperthermia'],
        advice: ['Dangerous interaction', 'Serotonin syndrome risk', 'Psychiatric complications', 'Medical supervision required']
      },
      'nutmeg+maois': {
        risk: 'deadly',
        mechanism: 'MAOIs can dangerously potentiate nutmeg\'s already unpredictable and toxic effects through multiple pathways.',
        effects: ['Extreme toxicity', 'Cardiovascular crisis', 'Psychiatric emergency', 'Death'],
        advice: ['Never combine', 'Life-threatening interaction', 'Multiple organ system failure risk', 'Immediate medical care required']
      },
      'nutmeg+anticholinergics': {
        risk: 'deadly',
        mechanism: 'Adding anticholinergic drugs to nutmeg\'s anticholinergic effects creates extreme anticholinergic toxicity.',
        effects: ['Extreme anticholinergic toxicity', 'Complete delirium', 'Hyperthermia', 'Cardiovascular collapse'],
        advice: ['Never combine', 'Anticholinergic crisis', 'Medical emergency', 'Life-threatening toxicity']
      },
      'nutmeg+deliriants': {
        risk: 'deadly',
        mechanism: 'Combining deliriant substances creates additive anticholinergic toxicity that is frequently fatal.',
        effects: ['Extreme anticholinergic poisoning', 'Complete loss of reality', 'Hyperthermia', 'Death'],
        advice: ['Never combine deliriants', 'Frequently fatal', 'Medical emergency', 'Extreme toxicity risk']
      },
      'nutmeg+alcohol': {
        risk: 'dangerous',
        mechanism: 'Alcohol enhances nutmeg\'s toxicity, increases liver damage risk, and creates dangerous dehydration during vomiting.',
        effects: ['Enhanced liver toxicity', 'Severe dehydration', 'Increased confusion', 'Aspiration risk'],
        advice: ['Avoid alcohol completely', 'Liver damage risk', 'Severe dehydration', 'Choking hazard during vomiting']
      },
      'nutmeg+cannabis': {
        risk: 'risky',
        mechanism: 'Cannabis may worsen nutmeg-induced anxiety and paranoia while potentially helping with nausea.',
        effects: ['Worsened anxiety', 'Enhanced paranoia', 'Possible nausea relief', 'Unpredictable interactions'],
        advice: ['May worsen psychological effects', 'Increased anxiety risk', 'Minimal benefit', 'Avoid combination']
      },
      'nutmeg+caffeine': {
        risk: 'risky',
        mechanism: 'Caffeine adds cardiovascular stress to nutmeg\'s already dangerous physiological effects.',
        effects: ['Increased heart rate', 'Enhanced anxiety', 'Cardiovascular stress', 'Worsened delirium'],
        advice: ['Avoid caffeine', 'Cardiovascular risk', 'Enhanced negative effects', 'Increased anxiety']
      },
      'nutmeg+heat-sources': {
        risk: 'dangerous',
        mechanism: 'Any heat source increases nutmeg\'s dangerous hyperthermia potential, which can be fatal.',
        effects: ['Life-threatening hyperthermia', 'Heat stroke', 'Organ failure', 'Death'],
        advice: ['Avoid all heat sources', 'Stay in cool environment', 'Monitor temperature', 'Medical cooling may be needed']
      },

      // PASSIONFLOWER INTERACTIONS
      'passionflower+sedatives': {
        risk: 'moderate',
        mechanism: 'Passionflower enhances GABA activity and may potentiate the effects of sedative medications.',
        effects: ['Increased sedation', 'Enhanced drowsiness', 'Impaired coordination', 'Memory effects'],
        advice: ['Use lower doses of both', 'Monitor for excessive sedation', 'Avoid driving or operating machinery', 'May enhance therapeutic effects']
      },
      'passionflower+benzodiazepines': {
        risk: 'moderate',
        mechanism: 'Both enhance GABA neurotransmission, potentially causing additive sedative effects.',
        effects: ['Enhanced sedation', 'Increased drowsiness', 'Coordination impairment', 'Respiratory depression (rare)'],
        advice: ['Reduce benzodiazepine dose if combining', 'Monitor respiratory function', 'Avoid alcohol', 'Start with low doses']
      },
      'passionflower+alcohol': {
        risk: 'moderate',
        mechanism: 'Both substances act as CNS depressants through GABA enhancement, causing additive sedation.',
        effects: ['Enhanced intoxication', 'Increased sedation', 'Impaired coordination', 'Memory impairment'],
        advice: ['Limit alcohol consumption', 'Avoid driving', 'Monitor for excessive sedation', 'Stay hydrated']
      },
      'passionflower+sleep-medications': {
        risk: 'moderate',
        mechanism: 'Passionflower may enhance the sedative effects of prescription sleep aids through GABA potentiation.',
        effects: ['Prolonged sleep', 'Excessive morning grogginess', 'Enhanced sedation', 'Sleep inertia'],
        advice: ['May reduce need for sleep medication', 'Consult physician about dose adjustment', 'Monitor sleep quality', 'Gradual dose changes']
      },
      'passionflower+antidepressants': {
        risk: 'low',
        mechanism: 'Generally safe combination, may provide complementary anxiety relief without significant interactions.',
        effects: ['Enhanced mood stability', 'Improved anxiety control', 'Possible mild sedation'],
        advice: ['Generally safe combination', 'May enhance therapeutic benefits', 'Monitor for excessive sedation', 'Good complementary therapy']
      },
      'passionflower+stimulants': {
        risk: 'low',
        mechanism: 'Passionflower may counteract stimulant-induced anxiety without dangerous interactions.',
        effects: ['Reduced stimulant anxiety', 'Smoother comedown', 'Balanced energy', 'Improved sleep quality'],
        advice: ['May help with stimulant side effects', 'Good for comedown support', 'Time doses appropriately', 'Monitor overall effects']
      },
      'passionflower+cannabis': {
        risk: 'low',
        mechanism: 'Both substances may have complementary relaxing effects without dangerous interactions.',
        effects: ['Enhanced relaxation', 'Increased sedation', 'Synergistic calming effects', 'Improved sleep'],
        advice: ['Start with lower doses of both', 'Good for anxiety relief', 'Monitor for excessive sedation', 'Generally safe combination']
      },
      'passionflower+heart-medications': {
        risk: 'low',
        mechanism: 'Passionflower may have mild effects on heart rate and blood pressure but rarely causes significant interactions.',
        effects: ['Slight blood pressure reduction', 'Mild heart rate decrease', 'Stress reduction'],
        advice: ['Generally safe with cardiac medications', 'May provide cardiovascular benefits', 'Monitor blood pressure', 'Consult physician if on multiple heart medications']
      },
      'passionflower+blood-pressure-medications': {
        risk: 'low',
        mechanism: 'Passionflower may provide mild blood pressure lowering effects, potentially enhancing antihypertensive medications.',
        effects: ['Enhanced blood pressure control', 'Mild hypotension (rare)', 'Stress-related BP improvement'],
        advice: ['May enhance BP medication effectiveness', 'Monitor blood pressure regularly', 'Generally beneficial interaction', 'Report any dizziness to physician']
      },

      // PEYOTE INTERACTIONS
      'peyote+maois': {
        risk: 'deadly',
        mechanism: 'MAOIs can dangerously potentiate mescaline and other alkaloids, causing unpredictable and potentially fatal effects.',
        effects: ['Extreme potentiation', 'Unpredictable intensity', 'Prolonged duration', 'Hypertensive crisis'],
        advice: ['Never combine', 'Life-threatening interaction', 'Medical emergency if combined', 'Extremely dangerous potentiation']
      },
      'peyote+stimulants': {
        risk: 'dangerous',
        mechanism: 'Stimulants combined with mescaline increase cardiovascular stress and may trigger dangerous blood pressure spikes.',
        effects: ['Severe hypertension', 'Cardiac arrhythmias', 'Anxiety amplification', 'Heart attack risk'],
        advice: ['Avoid all stimulants', 'High cardiovascular risk', 'Monitor heart rate and blood pressure', 'Dangerous cardiac stress']
      },
      'peyote+heart-medications': {
        risk: 'dangerous',
        mechanism: 'Mescaline\'s cardiovascular effects can interact dangerously with cardiac medications and blood pressure drugs.',
        effects: ['Blood pressure fluctuations', 'Cardiac arrhythmias', 'Medication ineffectiveness', 'Cardiovascular crisis'],
        advice: ['Contraindicated with heart medications', 'Consult cardiologist', 'High risk interaction', 'Emergency care may be needed']
      },
      'peyote+blood-pressure-medications': {
        risk: 'dangerous',
        mechanism: 'Mescaline can cause dangerous blood pressure fluctuations that may overwhelm antihypertensive medications.',
        effects: ['Severe hypertension', 'Hypotension risk', 'Medication breakthrough', 'Cardiovascular instability'],
        advice: ['Contraindicated with BP medications', 'Dangerous blood pressure swings', 'Medical supervision required', 'High cardiovascular risk']
      },
      'peyote+ssris': {
        risk: 'moderate',
        mechanism: 'SSRIs significantly reduce mescaline\'s psychedelic effects and may cause unpredictable interactions.',
        effects: ['Reduced psychedelic effects', 'Unpredictable reactions', 'Wasted substance', 'Possible serotonin effects'],
        advice: ['Taper SSRIs weeks before use', 'Significantly reduced effects', 'Unpredictable interaction', 'Consult physician']
      },
      'peyote+alcohol': {
        risk: 'moderate',
        mechanism: 'Alcohol increases nausea and dehydration risk while potentially masking important warning signs.',
        effects: ['Severe nausea amplification', 'Dangerous dehydration', 'Impaired judgment', 'Liver stress'],
        advice: ['Avoid alcohol completely', 'Increases nausea severely', 'Dehydration risk', 'Impairs harm reduction']
      },
      'peyote+tramadol': {
        risk: 'dangerous',
        mechanism: 'Tramadol combined with mescaline may increase serotonin syndrome risk and seizure potential.',
        effects: ['Serotonin syndrome risk', 'Seizure threshold lowering', 'Cardiovascular effects', 'Hyperthermia'],
        advice: ['Never combine', 'High seizure risk', 'Serotonin syndrome potential', 'Medical supervision required']
      },
      'peyote+cannabis': {
        risk: 'moderate',
        mechanism: 'Cannabis may help with nausea but can intensify confusion and anxiety during the experience.',
        effects: ['Reduced nausea (potential)', 'Increased confusion', 'Enhanced anxiety risk', 'Unpredictable combinations'],
        advice: ['Use cannabis cautiously', 'May help nausea but increase confusion', 'Start with very low doses', 'Monitor anxiety levels']
      },
      'peyote+other-psychedelics': {
        risk: 'dangerous',
        mechanism: 'Combining psychedelics creates unpredictable and potentially overwhelming experiences with increased risk.',
        effects: ['Unpredictable potentiation', 'Overwhelming experiences', 'Extended duration', 'Psychological risk'],
        advice: ['Never combine psychedelics', 'Unpredictable and dangerous', 'High psychological risk', 'One substance at a time only']
      },

      // OPIUM POPPY INTERACTIONS
      'opium-poppy+alcohol': {
        risk: 'deadly',
        mechanism: 'Both substances depress the central nervous system, dramatically increasing fatal respiratory depression risk.',
        effects: ['Severe respiratory depression', 'Loss of consciousness', 'Coma', 'Death', 'Extreme sedation'],
        advice: ['Never combine with alcohol', 'Call 911 immediately if combined', 'Have naloxone available', 'Monitor breathing constantly']
      },
      'opium-poppy+benzodiazepines': {
        risk: 'deadly',
        mechanism: 'Benzodiazepines and opiates synergistically depress breathing, causing the majority of opioid overdose deaths.',
        effects: ['Respiratory failure', 'Cardiac arrest', 'Coma', 'Death', 'Severe CNS depression'],
        advice: ['Absolutely never combine', 'Leading cause of overdose deaths', 'Emergency medical intervention required', 'Extremely high fatality rate']
      },
      'opium-poppy+other-opioids': {
        risk: 'deadly',
        mechanism: 'Adding more opioids to unpredictable opium alkaloids creates massive overdose potential with certain death risk.',
        effects: ['Massive respiratory depression', 'Immediate overdose', 'Death', 'Unconsciousness', 'Organ failure'],
        advice: ['Never combine any opioids', 'Guaranteed overdose risk', 'Life-threatening interaction', 'Call emergency services immediately']
      },
      'opium-poppy+barbiturates': {
        risk: 'deadly',
        mechanism: 'Barbiturates combined with opium create profound CNS depression with extremely high fatality rates.',
        effects: ['Severe respiratory depression', 'Cardiovascular collapse', 'Coma', 'Death', 'Multi-organ failure'],
        advice: ['Never combine', 'Extremely high death rate', 'Emergency medical care required', 'Have naloxone and emergency contacts ready']
      },
      'opium-poppy+muscle-relaxants': {
        risk: 'deadly',
        mechanism: 'Muscle relaxants enhance respiratory depression from opium alkaloids, increasing fatal overdose risk.',
        effects: ['Enhanced respiratory depression', 'Loss of muscle control', 'Breathing failure', 'Death risk'],
        advice: ['Dangerous combination', 'High overdose potential', 'Avoid all muscle relaxants', 'Medical supervision required']
      },
      'opium-poppy+antihistamines': {
        risk: 'dangerous',
        mechanism: 'Antihistamines potentiate opium sedation and can worsen respiratory depression from morphine and codeine.',
        effects: ['Increased sedation', 'Enhanced respiratory depression', 'Confusion', 'Dangerous drowsiness'],
        advice: ['Avoid all antihistamines', 'Increases overdose risk', 'Enhanced sedation danger', 'Monitor breathing carefully']
      },
      'opium-poppy+sleep-medications': {
        risk: 'dangerous',
        mechanism: 'Sleep aids combined with opium alkaloids create dangerous levels of CNS depression.',
        effects: ['Extreme sedation', 'Respiratory depression', 'Loss of consciousness', 'Breathing difficulties'],
        advice: ['Never combine', 'High risk of unconsciousness', 'Breathing complications', 'Emergency medical risk']
      },
      'opium-poppy+maois': {
        risk: 'dangerous',
        mechanism: 'MAOIs can unpredictably potentiate opium alkaloids and increase serotonin-related effects.',
        effects: ['Unpredictable potentiation', 'Enhanced sedation', 'Possible serotonin effects', 'Breathing difficulties'],
        advice: ['Dangerous interaction', 'Unpredictable effects', 'Medical supervision required', 'High risk combination']
      },
      'opium-poppy+stimulants': {
        risk: 'dangerous',
        mechanism: 'Stimulants may mask opium respiratory depression while straining the cardiovascular system.',
        effects: ['Masked overdose symptoms', 'Cardiovascular stress', 'Hidden respiratory depression', 'Delayed recognition of overdose'],
        advice: ['Dangerous masking of overdose signs', 'May hide breathing problems', 'Cardiovascular strain', 'Avoid all stimulants']
      },
      'opium-poppy+cannabis': {
        risk: 'moderate',
        mechanism: 'Cannabis may enhance sedation from opium and potentially worsen respiratory depression.',
        effects: ['Increased sedation', 'Enhanced drowsiness', 'Possible respiratory effects', 'Impaired coordination'],
        advice: ['Use extreme caution', 'Monitor breathing', 'Avoid large amounts', 'Start with minimal doses if combining']
      },

      // SALVIA DIVINORUM INTERACTIONS
      'salvia-divinorum+alcohol': {
        risk: 'dangerous',
        mechanism: 'Alcohol severely impairs judgment during profound dissociative states, massively increasing injury risk from falls and loss of physical awareness.',
        effects: ['Complete loss of physical awareness', 'Extreme fall/injury risk', 'Impaired judgment', 'Dangerous confusion'],
        advice: ['Never combine with alcohol', 'Massive injury risk', 'Complete loss of reality possible', 'Sober sitter absolutely mandatory']
      },
      'salvia-divinorum+benzodiazepines': {
        risk: 'dangerous',
        mechanism: 'Benzodiazepines may mask warning signs of over-intoxication while not preventing psychological trauma from overwhelming experiences.',
        effects: ['Masked over-intoxication', 'Continued psychological risk', 'Impaired fear responses', 'Poor decision making'],
        advice: ['Avoid benzos before salvia', 'May increase injury risk', 'Does not prevent bad trips', 'Maintain natural caution responses']
      },
      'salvia-divinorum+opioids': {
        risk: 'dangerous',
        mechanism: 'Salvia acts on kappa-opioid receptors while other opioids affect mu-opioid receptors - unpredictable interactions possible.',
        effects: ['Unpredictable KOR/MOR interactions', 'Unusual sedation patterns', 'Respiratory effects unknown', 'Dysphoric enhancement'],
        advice: ['Avoid combining with opioids', 'Unknown interaction profile', 'Potential respiratory effects', 'Stick to salvia alone']
      },
      'salvia-divinorum+antipsychotics': {
        risk: 'risky',
        mechanism: 'Antipsychotics may not effectively prevent psychological trauma from salvia experiences due to unique kappa-opioid mechanism.',
        effects: ['Potential trip interference', 'May not prevent bad experiences', 'Unpredictable interactions', 'Possible dysphoria enhancement'],
        advice: ['May not provide protection', 'Consult physician', 'Antipsychotics may be ineffective', 'Avoid if on psychiatric medications']
      },
      'salvia-divinorum+stimulants': {
        risk: 'risky',
        mechanism: 'Stimulants can dramatically increase anxiety and panic during already terrifying salvia experiences, worsening psychological trauma risk.',
        effects: ['Severe anxiety amplification', 'Panic attack risk', 'Increased psychological trauma', 'Cardiovascular stress'],
        advice: ['Avoid all stimulants', 'Will worsen anxiety', 'Increases trauma risk', 'Use salvia in calm, unstimulated state']
      },
      'salvia-divinorum+cannabis': {
        risk: 'risky',
        mechanism: 'Cannabis may intensify confusion and disorientation during salvia experiences, making already disorienting effects worse.',
        effects: ['Increased confusion', 'Enhanced disorientation', 'Prolonged recovery', 'Memory formation issues'],
        advice: ['Use cannabis cautiously', 'May worsen disorientation', 'Start completely sober', 'Assess individual tolerance']
      },
      'salvia-divinorum+other-psychedelics': {
        risk: 'dangerous',
        mechanism: 'Combining salvia with other psychedelics creates unpredictable and potentially traumatic experiences with unknown interactions.',
        effects: ['Unpredictable interactions', 'Overwhelming experiences', 'Psychological trauma risk', 'Extended duration possible'],
        advice: ['Never combine psychedelics', 'Salvia is intense enough alone', 'High trauma risk', 'One substance at a time only']
      },
      'salvia-divinorum+maois': {
        risk: 'risky',
        mechanism: 'MAOIs do not significantly affect salvinorin A metabolism but may alter overall experience in unpredictable ways.',
        effects: ['Unpredictable experience changes', 'Possible intensity alteration', 'Unknown interaction profile', 'Extended effects possible'],
        advice: ['Avoid if on MAOIs', 'Unknown safety profile', 'Consult physician', 'Stick to salvia alone']
      },
      'salvia-divinorum+ssris': {
        risk: 'moderate',
        mechanism: 'SSRIs do not directly interact with kappa-opioid receptors but may affect emotional processing during intense experiences.',
        effects: ['Altered emotional processing', 'Possible blunted effects', 'Integration difficulties', 'Unpredictable changes'],
        advice: ['Consult physician if on SSRIs', 'May affect experience quality', 'Monitor for unusual effects', 'Consider medication timing']
      },
      'salvia-divinorum+ketamine': {
        risk: 'dangerous',
        mechanism: 'Combining two powerful dissociatives creates extremely unpredictable and potentially dangerous dissociation with high injury risk.',
        effects: ['Extreme dissociation', 'Complete reality loss', 'Massive injury risk', 'Unpredictable duration'],
        advice: ['Never combine dissociatives', 'Extremely dangerous', 'Complete reality loss possible', 'High physical danger']
      },

      // KHAT INTERACTIONS
      'khat+maois': {
        risk: 'deadly',
        mechanism: 'MAOIs prevent cathinone breakdown, causing dangerous accumulation and potentially fatal hypertensive crisis.',
        effects: ['Severe hypertensive crisis', 'Cardiovascular collapse', 'Stroke risk', 'Death'],
        advice: ['Never combine', 'Medical emergency if combined', 'Call 911 immediately', 'Extremely dangerous interaction']
      },
      'khat+stimulants': {
        risk: 'dangerous',
        mechanism: 'Combining stimulants causes dangerous cardiovascular overstimulation and increased risk of cardiac events.',
        effects: ['Severe hypertension', 'Cardiac arrhythmias', 'Heart attack risk', 'Stroke risk', 'Hyperthermia'],
        advice: ['Never combine stimulants', 'High cardiac event risk', 'Emergency medical care if combined', 'Monitor heart rate and blood pressure']
      },
      'khat+cardiac-medications': {
        risk: 'dangerous',
        mechanism: 'Khat may overwhelm cardiac medications and cause dangerous interactions with antiarrhythmic drugs.',
        effects: ['Arrhythmia breakthrough', 'Blood pressure spikes', 'Medication ineffectiveness', 'Cardiac events'],
        advice: ['Contraindicated with heart medications', 'Consult cardiologist', 'May require emergency care', 'Monitor cardiovascular status']
      },
      'khat+blood-pressure-medications': {
        risk: 'dangerous',
        mechanism: 'Cathinone can overwhelm antihypertensive medications, causing dangerous blood pressure elevation.',
        effects: ['Severe hypertension', 'Medication breakthrough', 'Stroke risk', 'End-organ damage'],
        advice: ['Dangerous for hypertensive patients', 'Blood pressure monitoring essential', 'May cause hypertensive emergency', 'Avoid completely']
      },
      'khat+tramadol': {
        risk: 'dangerous',
        mechanism: 'Both substances lower seizure threshold and have serotonergic activity, increasing seizure and serotonin syndrome risk.',
        effects: ['Seizure risk', 'Serotonin syndrome', 'Hyperthermia', 'Cardiovascular complications'],
        advice: ['High seizure risk', 'Dangerous combination', 'Emergency medical care if combined', 'Never mix these substances']
      },
      'khat+caffeine': {
        risk: 'risky',
        mechanism: 'Both are stimulants that can cause excessive cardiovascular stimulation and anxiety when combined.',
        effects: ['Severe jitters', 'Anxiety attacks', 'Rapid heart rate', 'Hypertension', 'Insomnia'],
        advice: ['Avoid high caffeine intake', 'Monitor heart rate', 'High anxiety risk', 'May cause panic attacks']
      },
      'khat+alcohol': {
        risk: 'risky',
        mechanism: 'Alcohol masks stimulant effects while increasing dehydration and cardiovascular stress.',
        effects: ['Masked intoxication', 'Dehydration', 'Cardiovascular stress', 'Poor decision making'],
        advice: ['Alcohol masks khat effects', 'High dehydration risk', 'Increased accident risk', 'Monitor fluid intake']
      },
      'khat+antidepressants': {
        risk: 'risky',
        mechanism: 'SSRIs and other antidepressants may interact with cathinone\'s serotonergic effects.',
        effects: ['Serotonin syndrome risk', 'Altered medication effectiveness', 'Cardiovascular effects', 'Mood instability'],
        advice: ['Consult psychiatrist', 'Serotonin syndrome risk', 'Medication monitoring required', 'May affect treatment']
      },
      'khat+diabetes-medications': {
        risk: 'risky',
        mechanism: 'Stimulants can affect blood sugar control and may interfere with diabetes medication effectiveness.',
        effects: ['Blood sugar fluctuations', 'Medication interference', 'Cardiovascular complications', 'Diabetic emergencies'],
        advice: ['Monitor blood sugar closely', 'Consult endocrinologist', 'May require medication adjustment', 'Cardiovascular risk']
      },

      // RESEARCH CHEMICAL INTERACTIONS (comprehensive)

      // 25I-NBOMe Extended Interactions
      'nbome+phenethylamines': {
        risk: 'deadly',
        mechanism: 'Combining NBOMe with other phenethylamines creates unpredictable toxicity and overdose potential.',
        effects: ['Severe overdose risk', 'Seizures', 'Cardiovascular collapse', 'Death', 'Unpredictable toxicity'],
        advice: ['Never combine phenethylamines', 'Test all substances', 'One psychedelic at a time', 'Fatal interaction potential']
      },
      'nbome+5-htp': {
        risk: 'dangerous',
        mechanism: '5-HTP increases serotonin levels that may interact dangerously with NBOMe\'s serotonergic activity.',
        effects: ['Serotonin syndrome risk', 'Enhanced toxicity', 'Cardiovascular complications', 'Hyperthermia'],
        advice: ['Stop 5-HTP before NBOMe', 'Serotonin interaction risk', 'Enhanced toxicity potential', 'Medical supervision']
      },
      'nbome+alcohol': {
        risk: 'dangerous',
        mechanism: 'Alcohol may mask NBOMe overdose symptoms and increase dehydration during hyperthermia.',
        effects: ['Masked overdose symptoms', 'Severe dehydration', 'Impaired judgment', 'Enhanced toxicity'],
        advice: ['Never drink with NBOMe', 'May hide dangerous symptoms', 'Severe dehydration risk', 'Impairs harm reduction']
      },

      // 4-AcO-DMT Interactions
      '4-aco-dmt+ssris': {
        risk: 'risky',
        mechanism: 'SSRIs may reduce 4-AcO-DMT effects and potentially cause serotonin-related interactions.',
        effects: ['Reduced psychedelic effects', 'Unpredictable interactions', 'Possible serotonin effects', 'Ineffective experience'],
        advice: ['Taper SSRIs before use', 'Significantly reduced effects likely', 'Consult physician', 'May waste substance']
      },
      '4-aco-dmt+tramadol': {
        risk: 'dangerous',
        mechanism: 'Tramadol has serotonergic activity that may cause serotonin syndrome with 4-AcO-DMT.',
        effects: ['Serotonin syndrome', 'Seizure risk', 'Hyperthermia', 'Cardiovascular complications'],
        advice: ['Never combine', 'High seizure risk', 'Serotonin syndrome danger', 'Medical emergency potential']
      },
      '4-aco-dmt+lithium': {
        risk: 'dangerous',
        mechanism: 'Lithium increases seizure risk with tryptamine psychedelics like 4-AcO-DMT.',
        effects: ['Severe seizure risk', 'Neurological complications', 'Enhanced toxicity', 'Brain damage potential'],
        advice: ['Never combine with lithium', 'Extremely high seizure risk', 'Consult psychiatrist', 'Dangerous interaction']
      },

      // 5-MeO-MiPT Interactions
      '5-meo-mipt+maois': {
        risk: 'dangerous',
        mechanism: 'MAOIs may dangerously potentiate 5-MeO-MiPT and increase serotonin syndrome risk.',
        effects: ['Dangerous potentiation', 'Serotonin syndrome', 'Unpredictable intensity', 'Cardiovascular effects'],
        advice: ['Never combine with MAOIs', 'Dangerous interaction', 'Serotonin syndrome risk', 'Medical emergency potential']
      },
      '5-meo-mipt+stimulants': {
        risk: 'risky',
        mechanism: 'Stimulants may increase anxiety and cardiovascular stress during 5-MeO-MiPT experiences.',
        effects: ['Increased anxiety', 'Cardiovascular stress', 'Enhanced paranoia', 'Overstimulation'],
        advice: ['Avoid stimulants', 'Increased anxiety risk', 'Cardiovascular monitoring', 'May worsen experience']
      },

      // Synthetic Cathinone Interactions
      'alpha-pvp+alcohol': {
        risk: 'dangerous',
        mechanism: 'Alcohol masks alpha-PVP stimulation while increasing dehydration and cardiovascular stress.',
        effects: ['Masked stimulation', 'Severe dehydration', 'Cardiovascular stress', 'Poor decision making'],
        advice: ['Dangerous combination', 'Dehydration risk extreme', 'Masked effects dangerous', 'Avoid alcohol completely']
      },
      'alpha-pvp+other-stimulants': {
        risk: 'deadly',
        mechanism: 'Combining potent synthetic cathinones creates extreme cardiovascular stress and hyperthermia risk.',
        effects: ['Extreme hyperthermia', 'Cardiovascular collapse', 'Seizures', 'Death', 'Multi-organ failure'],
        advice: ['Never combine stimulants', 'Fatal combination', 'Emergency medical care', 'Extremely high death risk']
      },
      'alpha-pvp+antipsychotics': {
        risk: 'dangerous',
        mechanism: 'Antipsychotics may not effectively counteract alpha-PVP psychosis and could enhance hyperthermia.',
        effects: ['Continued psychosis possible', 'Enhanced hyperthermia', 'Medication ineffectiveness', 'Dangerous interactions'],
        advice: ['Antipsychotics may be ineffective', 'Medical supervision required', 'Enhanced heat risk', 'Emergency care needed']
      },

      // MDPV Interactions
      'mdpv+alcohol': {
        risk: 'dangerous',
        mechanism: 'Alcohol severely masks MDPV\'s dangerous stimulant effects while increasing toxicity and dehydration.',
        effects: ['Completely masked stimulation', 'Severe dehydration', 'Enhanced toxicity', 'Overdose risk'],
        advice: ['Extremely dangerous masking', 'Severe dehydration risk', 'May hide overdose', 'Never combine']
      },
      'mdpv+benzodiazepines': {
        risk: 'dangerous',
        mechanism: 'Benzos may mask MDPV overdose symptoms without preventing cardiovascular complications.',
        effects: ['Masked overdose symptoms', 'Continued cardiac stress', 'False sense of safety', 'Delayed medical care'],
        advice: ['May hide dangerous symptoms', 'Cardiac effects continue', 'Does not prevent complications', 'Medical monitoring essential']
      },
      'mdpv+dopamine-agonists': {
        risk: 'dangerous',
        mechanism: 'Dopamine agonists with MDPV can cause excessive dopaminergic stimulation and psychosis.',
        effects: ['Extreme dopamine stimulation', 'Severe psychosis', 'Hyperthermia', 'Cardiovascular crisis'],
        advice: ['Never combine', 'Extreme psychosis risk', 'Dangerous dopamine overload', 'Medical emergency']
      },

      // 4-Fluoroamphetamine Interactions
      '4-fa+ssris': {
        risk: 'dangerous',
        mechanism: '4-FA has significant serotonergic activity that can cause serotonin syndrome with SSRIs.',
        effects: ['Serotonin syndrome', 'Hyperthermia', 'Cardiovascular complications', 'Enhanced toxicity'],
        advice: ['Dangerous serotonin interaction', 'Never combine with SSRIs', 'Medical emergency potential', 'High toxicity risk']
      },
      '4-fa+other-amphetamines': {
        risk: 'dangerous',
        mechanism: 'Combining amphetamines creates extreme cardiovascular stress and neurotoxicity risk.',
        effects: ['Severe cardiovascular stress', 'Enhanced neurotoxicity', 'Hyperthermia', 'Heart attack risk'],
        advice: ['Never combine amphetamines', 'Extreme cardiac risk', 'Neurotoxicity enhancement', 'Medical emergency potential']
      },

      // 6-APB Interactions
      '6-apb+maois': {
        risk: 'deadly',
        mechanism: 'MAOIs prevent 6-APB metabolism, causing dangerous accumulation and serotonin syndrome.',
        effects: ['Severe serotonin syndrome', 'Extreme hyperthermia', 'Cardiovascular collapse', 'Death'],
        advice: ['Never combine', 'Life-threatening interaction', 'Fatal potential', 'Emergency medical care required']
      },
      '6-apb+tramadol': {
        risk: 'deadly',
        mechanism: 'Both have significant serotonergic activity creating high serotonin syndrome risk.',
        effects: ['Serotonin syndrome', 'Seizures', 'Hyperthermia', 'Death', 'Cardiovascular collapse'],
        advice: ['Never combine', 'Fatal interaction potential', 'High seizure risk', 'Emergency care required']
      },

      // 3-MeO-PCP Interactions
      '3-meo-pcp+alcohol': {
        risk: 'deadly',
        mechanism: 'Alcohol with dissociatives creates dangerous respiratory depression and extreme impairment.',
        effects: ['Severe respiratory depression', 'Extreme impairment', 'Loss of consciousness', 'Death risk'],
        advice: ['Never combine', 'Respiratory failure risk', 'Extreme danger', 'High fatality potential']
      },
      '3-meo-pcp+benzodiazepines': {
        risk: 'deadly',
        mechanism: 'Benzodiazepines add dangerous sedation to dissociative effects with high overdose risk.',
        effects: ['Severe CNS depression', 'Respiratory depression', 'Coma', 'Death'],
        advice: ['Fatal combination', 'Never combine', 'Respiratory failure risk', 'Emergency medical intervention required']
      },
      '3-meo-pcp+antipsychotics': {
        risk: 'risky',
        mechanism: 'Antipsychotics may help with 3-MeO-PCP psychosis but interactions are unpredictable.',
        effects: ['Unpredictable interactions', 'Possible help with psychosis', 'Enhanced sedation', 'Unknown safety'],
        advice: ['Medical supervision required', 'Unknown interaction profile', 'May help psychotic episodes', 'Consult physician']
      },

      // Methoxetamine (MXE) Interactions
      'methoxetamine+tramadol': {
        risk: 'dangerous',
        mechanism: 'MXE inhibits serotonin reuptake; combining with tramadol creates serotonin syndrome risk.',
        effects: ['Serotonin syndrome', 'Seizure risk', 'Hyperthermia', 'Cardiovascular complications'],
        advice: ['Never combine', 'High serotonin syndrome risk', 'Seizure danger', 'Medical emergency potential']
      },
      'methoxetamine+ssris': {
        risk: 'dangerous',
        mechanism: 'MXE\'s serotonin reuptake inhibition with SSRIs can cause dangerous serotonin accumulation.',
        effects: ['Serotonin syndrome', 'Enhanced side effects', 'Unpredictable interactions', 'Toxicity risk'],
        advice: ['Dangerous combination', 'Serotonin syndrome risk', 'Never combine', 'Medical supervision required']
      },

      // Novel Psychedelics
      '1p-lsd+ssris': {
        risk: 'risky',
        mechanism: '1P-LSD is an LSD prodrug; SSRIs significantly reduce effects and may cause interactions.',
        effects: ['Greatly reduced effects', 'Unpredictable interactions', 'Wasted substance', 'Possible serotonin effects'],
        advice: ['Taper SSRIs before use', 'Effects significantly reduced', 'Consult physician', 'May be ineffective']
      },
      '1p-lsd+lithium': {
        risk: 'dangerous',
        mechanism: 'Like LSD, 1P-LSD with lithium creates severe seizure risk and neurological complications.',
        effects: ['Severe seizure risk', 'Neurological damage', 'Enhanced toxicity', 'Medical emergency'],
        advice: ['Never combine with lithium', 'Extremely high seizure risk', 'Consult psychiatrist', 'Dangerous interaction']
      },

      // Novel Benzodiazepines
      'etizolam+alcohol': {
        risk: 'deadly',
        mechanism: 'Etizolam is a potent benzodiazepine analog; alcohol combination causes dangerous respiratory depression.',
        effects: ['Severe respiratory depression', 'Loss of consciousness', 'Coma', 'Death'],
        advice: ['Never combine', 'Fatal interaction', 'Respiratory failure risk', 'Emergency medical care required']
      },
      'flualprazolam+opioids': {
        risk: 'deadly',
        mechanism: 'Flualprazolam is extremely potent; opioid combination creates almost certain fatal respiratory depression.',
        effects: ['Immediate respiratory failure', 'Death', 'Extreme sedation', 'Cardiac arrest'],
        advice: ['Fatal combination', 'Never combine', 'Death highly likely', 'Emergency intervention required']
      },

      // Synthetic Tryptamines
      '4-ho-met+ssris': {
        risk: 'risky',
        mechanism: 'SSRIs may reduce 4-HO-MET effects and potentially cause serotonin-related interactions.',
        effects: ['Reduced psychedelic effects', 'Unpredictable interactions', 'Possible serotonin effects', 'Ineffective experience'],
        advice: ['Taper SSRIs before use', 'Significantly reduced effects likely', 'Consult physician', 'May waste substance']
      },
      '4-ho-mipt+tramadol': {
        risk: 'dangerous',
        mechanism: 'Tramadol\'s serotonergic activity may cause serotonin syndrome with tryptamine psychedelics.',
        effects: ['Serotonin syndrome', 'Seizure risk', 'Hyperthermia', 'Cardiovascular complications'],
        advice: ['Never combine', 'High seizure risk', 'Serotonin syndrome danger', 'Medical emergency potential']
      },

      // Dissociative Combinations
      'ketamine+2-fdck': {
        risk: 'dangerous',
        mechanism: 'Combining dissociatives creates unpredictable and potentially dangerous levels of dissociation.',
        effects: ['Extreme dissociation', 'Unpredictable duration', 'Complete reality loss', 'High injury risk'],
        advice: ['Never combine dissociatives', 'Extreme danger', 'Physical safety risk', 'One substance only']
      },
      'dck+alcohol': {
        risk: 'deadly',
        mechanism: 'DCK (Deschloroketamine) with alcohol creates dangerous respiratory depression and extreme impairment.',
        effects: ['Severe respiratory depression', 'Extreme impairment', 'Loss of consciousness', 'Death risk'],
        advice: ['Never combine', 'Respiratory failure risk', 'Fatal potential', 'Emergency care required']
      },

      // Synthetic Cannabinoids Extended
      'jwh-018+alcohol': {
        risk: 'dangerous',
        mechanism: 'Synthetic cannabinoids have unpredictable effects worsened by alcohol; seizure and respiratory risk.',
        effects: ['Unpredictable effects', 'Seizure risk', 'Respiratory depression', 'Dangerous interactions'],
        advice: ['Extremely unpredictable', 'High seizure risk', 'Avoid alcohol completely', 'Emergency care for seizures']
      },
      'jwh-018+stimulants': {
        risk: 'dangerous',
        mechanism: 'Synthetic cannabinoids can cause seizures amplified by stimulant use.',
        effects: ['Severe seizure risk', 'Cardiac complications', 'Hyperthermia', 'Psychosis'],
        advice: ['High seizure risk', 'Never combine with stimulants', 'Emergency care for seizures', 'Extremely dangerous']
      },
      'ab-chminaca+any-substance': {
        risk: 'deadly',
        mechanism: 'AB-CHMINACA is extremely toxic with unpredictable and often fatal effects enhanced by any other substance.',
        effects: ['Extreme toxicity', 'Unpredictable fatal reactions', 'Multi-organ failure', 'Death'],
        advice: ['Avoid completely', 'No safe combinations', 'Extremely dangerous synthetic', 'Fatal potential with anything']
      },

      // Synthetic Stimulants
      'a-pvp+antipsychotics': {
        risk: 'dangerous',
        mechanism: 'Antipsychotics may not effectively control a-PVP psychosis and could enhance hyperthermia.',
        effects: ['Continued psychosis', 'Enhanced hyperthermia', 'Medication failure', 'Dangerous interactions'],
        advice: ['Antipsychotics often ineffective', 'Medical supervision required', 'Enhanced heat danger', 'Emergency care']
      },
      'hexen+alcohol': {
        risk: 'dangerous',
        mechanism: 'N-Ethylhexedrone with alcohol masks stimulant effects while increasing cardiovascular stress.',
        effects: ['Masked stimulation', 'Cardiovascular stress', 'Poor decision making', 'Enhanced toxicity'],
        advice: ['Dangerous masking effects', 'Cardiovascular risk', 'Avoid alcohol completely', 'Impairs harm reduction']
      },
      '3-mmc+other-stimulants': {
        risk: 'dangerous',
        mechanism: 'Combining cathinones creates extreme cardiovascular stress and hyperthermia risk.',
        effects: ['Extreme cardiovascular stress', 'Severe hyperthermia', 'Seizures', 'Heart attack risk'],
        advice: ['Never combine stimulants', 'Extreme cardiac danger', 'Hyperthermia risk', 'Medical emergency potential']
      },

      // Comprehensive Synthetic Cathinones Interactions
      'synthetic-cathinones+alcohol': {
        risk: 'deadly',
        mechanism: 'Alcohol masks synthetic cathinone effects leading to fatal redosing while increasing cardiovascular stress and hyperthermia risk.',
        effects: ['Fatal redosing', 'Extreme hyperthermia', 'Cardiovascular collapse', 'Respiratory depression', 'Death'],
        advice: ['NEVER combine - frequently fatal', 'Alcohol masks danger signs', 'Extreme overdose risk', 'Call emergency services immediately']
      },
      'bath-salts+alcohol': {
        risk: 'deadly',
        mechanism: 'Alcohol dramatically increases toxicity of unknown cathinone mixtures and masks overdose symptoms.',
        effects: ['Fatal overdose', 'Multi-organ failure', 'Extreme hyperthermia', 'Cardiovascular death', 'Respiratory failure'],
        advice: ['Frequently fatal combination', 'Unknown potency makes this deadly', 'Masks life-threatening symptoms', 'Emergency medical care required']
      },
      'mephedrone+alcohol': {
        risk: 'deadly',
        mechanism: 'Alcohol significantly increases mephedrone toxicity and masks dangerous hyperthermia and cardiovascular stress.',
        effects: ['Fatal hyperthermia', 'Cardiovascular failure', 'Extreme dehydration', 'Death', 'Multi-organ damage'],
        advice: ['Deadly combination - many deaths reported', 'Extreme hyperthermia risk', 'Fatal cardiovascular events', 'Never combine these substances']
      },
      'flakka+alcohol': {
        risk: 'deadly',
        mechanism: 'Alpha-PVP (flakka) with alcohol causes fatal cardiovascular events and extreme hyperthermia leading to death.',
        effects: ['Immediate death risk', 'Extreme hyperthermia', 'Heart failure', 'Stroke risk', 'Complete organ failure'],
        advice: ['Extremely high death rate', 'Fatal hyperthermia common', 'Cardiovascular death frequent', 'Emergency services required']
      },
      'synthetic-cathinones+stimulants': {
        risk: 'deadly',
        mechanism: 'Multiple stimulants create synergistic cardiovascular stress far exceeding individual substance dangers.',
        effects: ['Heart attack', 'Stroke', 'Fatal hyperthermia', 'Cardiovascular collapse', 'Death'],
        advice: ['Never combine any stimulants', 'Fatal cardiovascular events', 'Emergency medical intervention', 'Extremely high death risk']
      },
      'bath-salts+stimulants': {
        risk: 'deadly',
        mechanism: 'Unknown cathinone mixtures with other stimulants create unpredictable and often fatal interactions.',
        effects: ['Unpredictable fatal effects', 'Extreme cardiovascular stress', 'Fatal hyperthermia', 'Multi-organ failure'],
        advice: ['Absolutely fatal combination', 'Unknown compounds make this deadly', 'Immediate emergency care', 'Death rate extremely high']
      },
      'synthetic-cathinones+depressants': {
        risk: 'deadly',
        mechanism: 'Opposing effects mask dangerous symptoms of both substance classes while creating cardiovascular instability.',
        effects: ['Masked overdose symptoms', 'Cardiovascular instability', 'Respiratory depression', 'Sudden death'],
        advice: ['Dangerous masking of effects', 'Sudden cardiac death risk', 'Respiratory failure possible', 'Emergency medical monitoring']
      },
      'synthetic-cathinones+maois': {
        risk: 'deadly',
        mechanism: 'MAOIs prevent cathinone breakdown causing fatal accumulation and hypertensive crisis leading to death.',
        effects: ['Hypertensive crisis', 'Fatal drug accumulation', 'Brain hemorrhage', 'Death', 'Multi-organ failure'],
        advice: ['Absolutely contraindicated', 'Fatal hypertensive crisis', 'Brain hemorrhage risk', 'Immediate emergency care']
      },

      // Tianeptine (Opioid-Active Antidepressant) Interactions
      'tianeptine+alcohol': {
        risk: 'deadly',
        mechanism: 'Tianeptine\'s opioid activity combined with alcohol creates fatal respiratory depression and extreme dependence risk.',
        effects: ['Fatal respiratory depression', 'Rapid onset of addiction', 'Severe CNS depression', 'Death', 'Enhanced dependence'],
        advice: ['NEVER combine - frequently fatal', 'Respiratory failure common', 'Extreme addiction risk', 'Emergency medical care required']
      },
      'tianeptine+opioids': {
        risk: 'deadly',
        mechanism: 'Synergistic μ-opioid receptor activation causes fatal respiratory depression and rapid tolerance development.',
        effects: ['Immediate respiratory failure', 'Fatal overdose', 'Extreme tolerance acceleration', 'Death', 'Cardiovascular collapse'],
        advice: ['Absolutely fatal combination', 'Immediate death risk', 'Never combine any opioids', 'Emergency services required']
      },
      'tianeptine+benzodiazepines': {
        risk: 'deadly',
        mechanism: 'Combined CNS depression from opioid and GABA systems creates fatal respiratory and cardiovascular depression.',
        effects: ['Fatal respiratory depression', 'Severe sedation', 'Cardiovascular collapse', 'Coma', 'Death'],
        advice: ['Extremely dangerous combination', 'High fatality rate', 'Combined CNS depression lethal', 'Immediate medical intervention']
      },
      'stablon+alcohol': {
        risk: 'deadly',
        mechanism: 'Pharmaceutical tianeptine with alcohol dramatically increases respiratory depression and dependence development.',
        effects: ['Fatal respiratory failure', 'Accelerated addiction', 'Severe CNS depression', 'Death'],
        advice: ['Deadly combination even at therapeutic doses', 'Respiratory monitoring required', 'No safe level of alcohol', 'Medical emergency']
      },
      'tia+stimulants': {
        risk: 'dangerous',
        mechanism: 'Tianeptine\'s mixed opioid-antidepressant effects create unpredictable interactions with stimulants.',
        effects: ['Cardiovascular strain', 'Masked opioid effects', 'Increased dependence risk', 'Arrhythmias'],
        advice: ['Unpredictable dangerous effects', 'Cardiovascular monitoring required', 'Masks tianeptine dependence', 'Medical supervision needed']
      },
      'gas-station-heroin+depressants': {
        risk: 'deadly',
        mechanism: 'Street tianeptine products with any depressants create fatal CNS depression with unknown dosing complications.',
        effects: ['Fatal respiratory depression', 'Unknown potency amplification', 'Severe CNS depression', 'Death'],
        advice: ['Street tianeptine extremely dangerous', 'Unknown potency makes this lethal', 'Any depressant combination fatal', 'Emergency care required']
      },
      'tianeptine+antidepressants': {
        risk: 'dangerous',
        mechanism: 'Tianeptine\'s unique serotonin reuptake enhancement conflicts with other antidepressants causing serotonin syndrome.',
        effects: ['Serotonin syndrome', 'Hyperthermia', 'Cardiovascular instability', 'Confusion', 'Rapid dependence'],
        advice: ['Conflicting serotonin mechanisms', 'Serotonin syndrome risk', 'Enhanced dependence potential', 'Medical supervision required']
      },
      'tianeptine+maois': {
        risk: 'deadly',
        mechanism: 'MAOIs with tianeptine\'s unique serotonin reuptake enhancement and opioid activity creates fatal serotonin syndrome.',
        effects: ['Fatal serotonin syndrome', 'Hypertensive crisis', 'Hyperthermia', 'Death', 'Multi-organ failure'],
        advice: ['Absolutely contraindicated', 'Fatal serotonin syndrome guaranteed', 'Multiple lethal mechanisms', 'Immediate emergency care']
      },
      'zaza+alcohol': {
        risk: 'deadly',
        mechanism: 'ZaZa products containing tianeptine with alcohol create fatal respiratory depression with unknown dosing.',
        effects: ['Fatal respiratory failure', 'Unknown tianeptine content amplifies risk', 'Severe CNS depression', 'Death'],
        advice: ['Street tianeptine products extremely lethal', 'Unknown dosing makes combination fatal', 'Respiratory failure common', 'Emergency medical care']
      },

      // Nootropics and Cognitive Enhancers
      'modafinil+alcohol': {
        risk: 'risky',
        mechanism: 'Modafinil may mask alcohol impairment while increasing dehydration and liver stress.',
        effects: ['Masked alcohol impairment', 'Increased dehydration', 'Liver stress', 'Poor judgment'],
        advice: ['May hide alcohol effects', 'Dehydration risk', 'Impaired judgment possible', 'Monitor alcohol intake']
      },
      'phenibut+alcohol': {
        risk: 'dangerous',
        mechanism: 'Both are GABAergic depressants; combination creates dangerous respiratory depression.',
        effects: ['Severe respiratory depression', 'Enhanced sedation', 'Loss of consciousness', 'Overdose risk'],
        advice: ['Dangerous combination', 'Respiratory risk', 'Avoid alcohol completely', 'High overdose potential']
      },
      'phenibut+benzodiazepines': {
        risk: 'deadly',
        mechanism: 'Both enhance GABA activity; combination creates life-threatening respiratory depression.',
        effects: ['Severe respiratory depression', 'Coma', 'Death', 'Extreme sedation'],
        advice: ['Never combine', 'Fatal potential', 'Respiratory failure risk', 'Emergency medical care required']
      },
      'tianeptine+tramadol': {
        risk: 'dangerous',
        mechanism: 'Both affect serotonin and have opioid activity; combination increases seizure and serotonin syndrome risk.',
        effects: ['Seizure risk', 'Serotonin syndrome', 'Respiratory depression', 'Enhanced toxicity'],
        advice: ['Never combine', 'High seizure risk', 'Serotonin syndrome danger', 'Multiple mechanisms of toxicity']
      },

      // U-47700 (Synthetic Opioid) - EXTREME LETHALITY Interactions
      'u-47700+alcohol': {
        risk: 'deadly',
        mechanism: 'U-47700\'s extreme potency combined with alcohol creates guaranteed fatal respiratory depression within minutes.',
        effects: ['Immediate respiratory failure', 'Cardiac arrest', 'Death within minutes', 'No reversal possible'],
        advice: ['GUARANTEED DEATH', 'No safe combination exists', 'Emergency services immediately', 'Naloxone may not work']
      },
      'u-47700+benzodiazepines': {
        risk: 'deadly',
        mechanism: 'U-47700 with any benzodiazepine creates instant fatal respiratory depression due to extreme synthetic opioid potency.',
        effects: ['Instant respiratory failure', 'Immediate death', 'Cardiac arrest', 'No survival chance'],
        advice: ['INSTANT DEATH COMBINATION', 'No margin for error', 'Naloxone likely ineffective', 'Call 911 immediately']
      },
      'u-47700+opioids': {
        risk: 'deadly',
        mechanism: 'Any opioid with U-47700 creates multiplicative respiratory depression far beyond naloxone\'s ability to reverse.',
        effects: ['Massive respiratory failure', 'Multiple opioid overdose', 'Death', 'Naloxone resistance'],
        advice: ['LETHAL COMBINATION', 'Multiple opioid overdose', 'Naloxone may be ineffective', 'Emergency care essential']
      },
      'u-47700+depressants': {
        risk: 'deadly',
        mechanism: 'Any CNS depressant with U-47700 creates fatal respiratory depression due to synthetic opioid\'s extreme potency.',
        effects: ['Fatal respiratory depression', 'CNS shutdown', 'Death', 'No reversal possible'],
        advice: ['ALL DEPRESSANTS FATAL WITH U-47700', 'No safe combinations', 'Death highly likely', 'Emergency medical care']
      },
      'u-47700+antihistamines': {
        risk: 'deadly',
        mechanism: 'Even OTC antihistamines with U-47700 create fatal respiratory depression due to potentiation of extreme synthetic opioid effects.',
        effects: ['Fatal respiratory failure', 'Enhanced toxicity', 'Death', 'Unexpected lethality'],
        advice: ['Even Benadryl can be fatal', 'No OTC medications safe', 'Avoid all antihistamines', 'Emergency care required']
      },
      'u-47700+stimulants': {
        risk: 'dangerous',
        mechanism: 'Stimulants mask U-47700\'s respiratory depression until stimulant wears off, then fatal overdose occurs.',
        effects: ['Masked respiratory depression', 'Delayed fatal overdose', 'False sense of safety', 'Sudden death'],
        advice: ['Stimulants hide deadly effects', 'Delayed death when stimulant ends', 'No protection provided', 'Avoid all stimulants']
      },
      'pink+alcohol': {
        risk: 'deadly',
        mechanism: 'Pink powder (U-47700) with alcohol creates instant fatal respiratory depression.',
        effects: ['Immediate death', 'Respiratory failure', 'Cardiac arrest', 'No survival'],
        advice: ['Pink powder is lethal alone', 'Any combination guarantees death', 'Emergency services', 'Avoid entirely']
      },
      'pinky+depressants': {
        risk: 'deadly',
        mechanism: 'Pinky (U-47700) with any depressant creates instant fatal CNS depression.',
        effects: ['Fatal respiratory failure', 'Immediate death', 'CNS shutdown', 'No reversal'],
        advice: ['ALL DEPRESSANTS FATAL', 'No safe amount', 'Death guaranteed', 'Emergency care immediately']
      },
      'u4+anything': {
        risk: 'deadly',
        mechanism: 'U4 (U-47700) is so potent that combination with ANY substance dramatically increases lethality.',
        effects: ['Death', 'Respiratory failure', 'Cardiac arrest', 'Organ failure'],
        advice: ['NO SUBSTANCE IS SAFE WITH U4', 'Avoid all combinations', 'Extreme lethality', 'Medical emergency']
      },

      // Xylazine (Zombie Drug) - VETERINARY ADULTERANT Interactions
      'xylazine+alcohol': {
        risk: 'deadly',
        mechanism: 'Xylazine\'s alpha-2 agonist effects with alcohol create fatal CNS depression plus guaranteed skin necrosis.',
        effects: ['Fatal respiratory depression', 'Horrific skin necrosis', 'Naloxone-resistant overdose', 'Death'],
        advice: ['GUARANTEED FLESH DAMAGE', 'Naloxone will not work', 'Emergency surgery needed', 'Call 911 immediately']
      },
      'xylazine+opioids': {
        risk: 'deadly',
        mechanism: 'Xylazine contamination in opioids creates naloxone-resistant overdoses with progressive tissue death.',
        effects: ['Naloxone-resistant overdose', 'Severe skin necrosis', 'Respiratory failure', 'Death'],
        advice: ['NALOXONE WILL NOT WORK', 'Emergency medical care', 'Skin damage permanent', 'Alpha-2 antagonist needed']
      },
      'xylazine+benzodiazepines': {
        risk: 'deadly',
        mechanism: 'Zombie drug with benzos creates fatal sedation and skin necrosis that spreads beyond injection sites.',
        effects: ['Fatal CNS depression', 'Progressive flesh death', 'Naloxone resistance', 'Amputation risk'],
        advice: ['FLESH-EATING COMBINATION', 'Medical emergency', 'Surgical intervention needed', 'No reversal possible']
      },
      'xylazine+depressants': {
        risk: 'deadly',
        mechanism: 'Any CNS depressant with xylazine creates fatal overdose with horrific skin complications.',
        effects: ['Fatal respiratory depression', 'Skin necrosis', 'Tissue death', 'Naloxone resistance'],
        advice: ['ALL DEPRESSANTS DEADLY', 'Emergency care required', 'Permanent disfigurement', 'Surgical wounds']
      },
      'xylazine+stimulants': {
        risk: 'dangerous',
        mechanism: 'Stimulants mask xylazine\'s sedation but cannot prevent skin necrosis and tissue death.',
        effects: ['Hidden respiratory depression', 'Delayed overdose recognition', 'Progressive skin death', 'False security'],
        advice: ['Stimulants hide deadly effects', 'Skin damage continues', 'Delayed fatal overdose', 'Emergency care needed']
      },
      'zombie-drug+alcohol': {
        risk: 'deadly',
        mechanism: 'Zombie drug (xylazine) with alcohol creates guaranteed fatal overdose with flesh-eating effects.',
        effects: ['Fatal respiratory failure', 'Horrific skin necrosis', 'Progressive tissue death', 'Death'],
        advice: ['FLESH-EATING EFFECTS', 'Fatal respiratory depression', 'Emergency surgery', 'Permanent damage']
      },
      'tranq+opioids': {
        risk: 'deadly',
        mechanism: 'Tranq (xylazine) contamination makes opioid overdoses untreatable with naloxone.',
        effects: ['Naloxone-resistant overdose', 'Skin necrosis', 'Respiratory failure', 'Death'],
        advice: ['NALOXONE INEFFECTIVE', 'Alpha-2 antagonist needed', 'Emergency medical care', 'Skin damage permanent']
      },
      'tranq-dope+anything': {
        risk: 'deadly',
        mechanism: 'Tranq dope (xylazine-contaminated drugs) makes any substance combination lethal with skin damage.',
        effects: ['Fatal overdose', 'Severe skin necrosis', 'Naloxone resistance', 'Tissue death'],
        advice: ['ANY COMBINATION LETHAL', 'Permanent skin damage', 'Emergency care required', 'No safe use']
      },
      'zombie-dope+depressants': {
        risk: 'deadly',
        mechanism: 'Zombie dope with any depressant creates fatal CNS depression plus progressive flesh death.',
        effects: ['Fatal respiratory failure', 'Progressive necrosis', 'Tissue death', 'Amputation risk'],
        advice: ['GUARANTEED TISSUE DEATH', 'Medical emergency', 'Surgical intervention', 'Permanent damage']
      },

      // Lean (Purple Drank) - CULTURAL DEPRESSANT Interactions
      'lean+alcohol': {
        risk: 'deadly',
        mechanism: 'Lean\'s codeine/promethazine combination with alcohol creates fatal synergistic respiratory depression.',
        effects: ['Severe respiratory depression', 'Fatal overdose', 'Enhanced sedation', 'Cardiac suppression'],
        advice: ['DEADLY COMBINATION', 'Immediate overdose risk', 'Call emergency services', 'No safe amount']
      },
      'lean+benzodiazepines': {
        risk: 'deadly',
        mechanism: 'Triple CNS depression from codeine, promethazine, and benzodiazepines causes fatal respiratory failure.',
        effects: ['Severe respiratory failure', 'Complete unconsciousness', 'Fatal overdose', 'Cardiac arrest'],
        advice: ['LETHAL INTERACTION', 'Death likely', 'Emergency intervention required', 'Avoid completely']
      },
      'lean+opioids': {
        risk: 'deadly',
        mechanism: 'Adding opioids to lean\'s codeine creates extreme mu-opioid overdose with rapid respiratory failure.',
        effects: ['Massive respiratory depression', 'Fatal overdose', 'Rapid unconsciousness', 'Death within minutes'],
        advice: ['GUARANTEED OVERDOSE', 'Death highly likely', 'Medical emergency', 'Multiple naloxone needed']
      },
      'lean+depressants': {
        risk: 'deadly',
        mechanism: 'Any additional CNS depressant with lean\'s dual-mechanism creates fatal compound respiratory depression.',
        effects: ['Severe respiratory failure', 'Enhanced sedation', 'Fatal overdose risk', 'Cardiac complications'],
        advice: ['Extremely dangerous', 'High death risk', 'Medical monitoring required', 'Avoid all combinations']
      },
      'lean+stimulants': {
        risk: 'dangerous',
        mechanism: 'Stimulants mask lean\'s respiratory depression warning signs, preventing overdose recognition.',
        effects: ['Masked overdose symptoms', 'False sense of alertness', 'Delayed recognition', 'Cardiac strain'],
        advice: ['Dangerous masking effect', 'Hidden overdose risk', 'Monitor breathing closely', 'Seek medical help']
      },
      'purple-drank+alcohol': {
        risk: 'deadly',
        mechanism: 'Purple drank (lean) with alcohol creates synergistic CNS depression and fatal respiratory failure.',
        effects: ['Fatal respiratory depression', 'Severe sedation', 'Overdose death', 'Cardiac complications'],
        advice: ['DEADLY COMBINATION', 'High fatality rate', 'Emergency medical care', 'No safe use together']
      },
      'sizzurp+depressants': {
        risk: 'deadly',
        mechanism: 'Sizzurp (lean) already contains dual depressants; adding more creates fatal compound overdose.',
        effects: ['Severe respiratory failure', 'Fatal overdose', 'Complete unconsciousness', 'Cardiac arrest'],
        advice: ['LETHAL COMBINATION', 'Death risk extreme', 'Medical emergency', 'Avoid all depressants']
      },
      'dirty-sprite+benzos': {
        risk: 'deadly',
        mechanism: 'Dirty sprite (lean) with benzodiazepines creates triple-mechanism respiratory depression and death.',
        effects: ['Fatal respiratory failure', 'Rapid unconsciousness', 'Overdose death', 'Cardiac complications'],
        advice: ['GUARANTEED OVERDOSE', 'Death highly probable', 'Emergency intervention', 'Multiple naloxone required']
      },

      // Psychoactive Plants Extended
      'calea-zacatechichi+ssris': {
        risk: 'caution',
        mechanism: 'Dream herb may have mild interactions with SSRIs affecting sleep and dream patterns.',
        effects: ['Altered sleep patterns', 'Changed dream effects', 'Possible mild interactions', 'Sleep quality changes'],
        advice: ['Monitor sleep quality', 'Dreams may be affected', 'Generally mild interaction', 'Consult if sleep problems']
      },
      'wild-dagga+respiratory-conditions': {
        risk: 'caution',
        mechanism: 'Smoking wild dagga may irritate respiratory conditions and worsen breathing problems.',
        effects: ['Respiratory irritation', 'Coughing', 'Breathing difficulties', 'Asthma exacerbation'],
        advice: ['Avoid if respiratory issues', 'Consider oral preparations', 'Monitor breathing', 'Consult physician']
      },
      'mugwort+seizure-medications': {
        risk: 'caution',
        mechanism: 'Mugwort may affect seizure threshold and potentially interact with anticonvulsant medications.',
        effects: ['Possible seizure threshold changes', 'Medication interactions', 'Altered seizure control'],
        advice: ['Consult neurologist', 'Monitor seizure control', 'Medication interactions possible', 'Medical supervision advised']
      },

      // Combinations to Avoid
      'any-maoi+any-ssri': {
        risk: 'deadly',
        mechanism: 'Any MAOI combined with any SSRI creates severe serotonin syndrome with high fatality rate.',
        effects: ['Severe serotonin syndrome', 'Hyperthermia', 'Seizures', 'Death', 'Cardiovascular collapse'],
        advice: ['Never combine', 'Fatal interaction', 'Wait weeks between switching', 'Medical supervision essential']
      },
      'any-depressant+any-depressant': {
        risk: 'dangerous',
        mechanism: 'Combining any two CNS depressants creates additive respiratory depression with high overdose risk.',
        effects: ['Severe respiratory depression', 'Enhanced sedation', 'Overdose risk', 'Loss of consciousness'],
        advice: ['Extremely dangerous', 'High overdose potential', 'Avoid combinations', 'Medical monitoring required']
      },

      // PRESCRIPTION MEDICATION INTERACTIONS (comprehensive)

      // Anticonvulsants
      'carbamazepine+mdma': {
        risk: 'risky',
        mechanism: 'Carbamazepine may reduce MDMA effects and could potentially interact through sodium channel effects.',
        effects: ['Reduced MDMA effects', 'Unpredictable interactions', 'Medication interference', 'Altered experience'],
        advice: ['May significantly reduce effects', 'Consult neurologist', 'Unknown safety profile', 'Medication monitoring']
      },
      'valproate+psychedelics': {
        risk: 'risky',
        mechanism: 'Valproate may affect psychedelic metabolism and could alter seizure threshold during experiences.',
        effects: ['Altered psychedelic effects', 'Unknown interactions', 'Seizure threshold changes', 'Medication interference'],
        advice: ['Consult neurologist before use', 'Unknown interaction profile', 'Monitor for breakthrough seizures', 'Medical supervision']
      },
      'gabapentin+kratom': {
        risk: 'dangerous',
        mechanism: 'Both substances cause CNS depression; combination creates dangerous respiratory depression risk.',
        effects: ['Severe respiratory depression', 'Enhanced sedation', 'Loss of consciousness', 'Overdose risk'],
        advice: ['Dangerous combination', 'High respiratory risk', 'Monitor breathing closely', 'Reduce doses significantly']
      },
      'pregabalin+kratom': {
        risk: 'dangerous',
        mechanism: 'Pregabalin enhances kratom\'s CNS depression, creating high risk of respiratory failure.',
        effects: ['Severe respiratory depression', 'Dangerous sedation', 'Overdose risk', 'Loss of consciousness'],
        advice: ['Never combine', 'High fatality risk', 'Respiratory failure possible', 'Emergency care potential']
      },

      // Antidepressants Extended
      'venlafaxine+mdma': {
        risk: 'dangerous',
        mechanism: 'Venlafaxine (SNRI) blocks MDMA effects and creates serotonin syndrome risk.',
        effects: ['Completely blocked MDMA effects', 'Serotonin syndrome risk', 'Wasted substance', 'Dangerous interaction'],
        advice: ['MDMA will not work', 'Dangerous serotonin interaction', 'Taper off weeks before', 'Consult psychiatrist']
      },
      'duloxetine+psychedelics': {
        risk: 'risky',
        mechanism: 'Duloxetine (SNRI) may reduce psychedelic effects and create unpredictable serotonin interactions.',
        effects: ['Reduced psychedelic effects', 'Unpredictable interactions', 'Serotonin system effects', 'Blunted experience'],
        advice: ['Significantly reduced effects', 'Consult psychiatrist', 'May need medication break', 'Unknown safety']
      },
      'mirtazapine+alcohol': {
        risk: 'dangerous',
        mechanism: 'Mirtazapine enhances alcohol sedation and creates dangerous respiratory depression risk.',
        effects: ['Severe sedation', 'Respiratory depression', 'Enhanced alcohol effects', 'Overdose risk'],
        advice: ['Dangerous alcohol interaction', 'Severe sedation risk', 'Avoid alcohol completely', 'Respiratory monitoring']
      },
      'trazodone+mdma': {
        risk: 'risky',
        mechanism: 'Trazodone may partially block MDMA effects and create serotonin-related interactions.',
        effects: ['Reduced MDMA effects', 'Possible serotonin interactions', 'Blunted experience', 'Unknown safety'],
        advice: ['May reduce MDMA effects', 'Consult psychiatrist', 'Serotonin interaction possible', 'Medical guidance needed']
      },

      // Antipsychotics Extended
      'olanzapine+alcohol': {
        risk: 'dangerous',
        mechanism: 'Olanzapine significantly enhances alcohol sedation and impairment with overdose risk.',
        effects: ['Severe sedation', 'Enhanced alcohol impairment', 'Respiratory depression', 'Loss of consciousness'],
        advice: ['Dangerous alcohol interaction', 'Severe sedation risk', 'Limit alcohol drastically', 'Medical monitoring']
      },
      'risperidone+stimulants': {
        risk: 'risky',
        mechanism: 'Antipsychotics may mask stimulant effects but don\'t prevent cardiovascular complications.',
        effects: ['Masked stimulant effects', 'Continued cardiac stress', 'False sense of safety', 'Unpredictable interactions'],
        advice: ['Does not prevent cardiac effects', 'May hide dangerous symptoms', 'Medical supervision required', 'Cardiovascular monitoring']
      },
      'haloperidol+mdma': {
        risk: 'risky',
        mechanism: 'Haloperidol can terminate MDMA effects but may not prevent all toxicity and could cause dysphoria.',
        effects: ['MDMA termination', 'Potential dysphoria', 'May not prevent all toxicity', 'Unpleasant experience'],
        advice: ['Can stop MDMA effects', 'May cause unpleasant feelings', 'Medical supervision preferred', 'Emergency use only']
      },
      'aripiprazole+psychedelics': {
        risk: 'risky',
        mechanism: 'Aripiprazole has partial agonist activity that may unpredictably interact with psychedelics.',
        effects: ['Unpredictable interactions', 'Possible effect reduction', 'Unknown safety profile', 'Partial blocking'],
        advice: ['Unknown interaction profile', 'May reduce effects', 'Consult psychiatrist', 'Unpredictable results']
      },

      // Anxiolytics and Sleep Medications
      'buspirone+psychedelics': {
        risk: 'low',
        mechanism: 'Buspirone works through different mechanisms and may not significantly interact with psychedelics.',
        effects: ['Minimal interaction expected', 'Possible anxiety reduction', 'Generally safe profile'],
        advice: ['Generally safe combination', 'May help with anxiety', 'Monitor for interactions', 'Continue as prescribed']
      },
      'hydroxyzine+alcohol': {
        risk: 'dangerous',
        mechanism: 'Hydroxyzine enhances alcohol sedation through antihistamine and anxiolytic effects.',
        effects: ['Severe sedation', 'Enhanced alcohol effects', 'Respiratory depression risk', 'Dangerous impairment'],
        advice: ['Dangerous alcohol interaction', 'Severe sedation risk', 'Avoid alcohol', 'Respiratory monitoring']
      },
      'eszopiclone+alcohol': {
        risk: 'deadly',
        mechanism: 'Z-drugs like eszopiclone with alcohol create dangerous respiratory depression.',
        effects: ['Severe respiratory depression', 'Loss of consciousness', 'Coma', 'Death'],
        advice: ['Never combine', 'Fatal interaction potential', 'Respiratory failure risk', 'Emergency care if combined']
      },
      'zaleplon+benzodiazepines': {
        risk: 'deadly',
        mechanism: 'Combining different GABAergic sleep medications creates dangerous over-sedation.',
        effects: ['Extreme sedation', 'Respiratory depression', 'Coma', 'Death'],
        advice: ['Never combine', 'Fatal interaction', 'Respiratory failure risk', 'Medical emergency']
      },

      // Pain Medications Extended
      'tapentadol+ssris': {
        risk: 'dangerous',
        mechanism: 'Tapentadol has serotonin and norepinephrine reuptake inhibition that can cause serotonin syndrome.',
        effects: ['Serotonin syndrome', 'Enhanced side effects', 'Dangerous interactions', 'Seizure risk'],
        advice: ['Dangerous serotonin interaction', 'Never combine', 'Medical supervision essential', 'High risk combination']
      },
      'buprenorphine+naloxone': {
        risk: 'moderate',
        mechanism: 'This combination exists in Suboxone; naloxone precipitates withdrawal if injected but is inactive orally.',
        effects: ['Withdrawal if injected', 'Normal effects if taken orally', 'Abuse deterrent'],
        advice: ['Take as prescribed orally only', 'Never inject', 'Will cause withdrawal if misused', 'Medical supervision']
      },
      'suboxone+alcohol': {
        risk: 'deadly',
        mechanism: 'Buprenorphine with alcohol creates dangerous respiratory depression despite partial agonist activity.',
        effects: ['Severe respiratory depression', 'Loss of consciousness', 'Coma', 'Death'],
        advice: ['Never combine', 'Fatal interaction', 'Respiratory failure risk', 'Emergency care if combined']
      },
      'methadone+benzodiazepines': {
        risk: 'deadly',
        mechanism: 'This combination causes the majority of methadone-related deaths through respiratory depression.',
        effects: ['Severe respiratory depression', 'Cardiac complications', 'Coma', 'Death'],
        advice: ['Leading cause of methadone deaths', 'Never combine', 'Fatal interaction', 'Emergency medical care']
      },

      // Cardiovascular Medications
      'propranolol+cocaine': {
        risk: 'deadly',
        mechanism: 'Beta-blockers with cocaine cause unopposed alpha stimulation, leading to severe vasoconstriction.',
        effects: ['Severe hypertension', 'Coronary artery spasm', 'Heart attack', 'Stroke'],
        advice: ['Never combine', 'Medical emergency', 'Dangerous blood pressure crisis', 'Call 911 immediately']
      },
      'verapamil+stimulants': {
        risk: 'dangerous',
        mechanism: 'Calcium channel blockers may interact unpredictably with stimulants affecting cardiovascular function.',
        effects: ['Unpredictable cardiovascular effects', 'Blood pressure changes', 'Cardiac complications'],
        advice: ['Consult cardiologist', 'Cardiovascular monitoring required', 'Unpredictable interactions', 'Medical supervision']
      },
      'digoxin+stimulants': {
        risk: 'dangerous',
        mechanism: 'Stimulants may enhance digoxin toxicity and increase risk of dangerous cardiac arrhythmias.',
        effects: ['Enhanced digoxin toxicity', 'Cardiac arrhythmias', 'Heart rhythm problems', 'Digitalis toxicity'],
        advice: ['Dangerous cardiac interaction', 'Monitor for toxicity signs', 'Avoid stimulants', 'Consult cardiologist']
      },
      'ace-inhibitors+alcohol': {
        risk: 'risky',
        mechanism: 'ACE inhibitors with alcohol can cause excessive blood pressure lowering and dizziness.',
        effects: ['Excessive blood pressure drop', 'Dizziness', 'Fainting', 'Falls risk'],
        advice: ['Monitor blood pressure', 'Rise slowly', 'Limit alcohol intake', 'Watch for dizziness']
      },

      // Gastrointestinal Medications
      'omeprazole+mdma': {
        risk: 'risky',
        mechanism: 'Proton pump inhibitors may affect MDMA absorption and metabolism through pH changes.',
        effects: ['Altered MDMA absorption', 'Unpredictable effects', 'Changed onset/duration'],
        advice: ['May alter MDMA effects', 'Unknown interaction profile', 'Monitor for changes', 'Timing may matter']
      },
      'ranitidine+alcohol': {
        risk: 'risky',
        mechanism: 'H2 blockers may increase alcohol absorption, leading to higher blood alcohol levels.',
        effects: ['Increased alcohol absorption', 'Higher intoxication', 'Enhanced effects', 'Faster onset'],
        advice: ['May increase alcohol effects', 'Monitor intoxication level', 'Adjust alcohol intake', 'Enhanced impairment']
      },

      // Respiratory Medications
      'albuterol+stimulants': {
        risk: 'risky',
        mechanism: 'Beta-agonists with stimulants can cause excessive cardiovascular stimulation.',
        effects: ['Increased heart rate', 'Blood pressure elevation', 'Anxiety', 'Cardiac stress'],
        advice: ['Monitor heart rate', 'Cardiovascular stress risk', 'Use with caution', 'Medical supervision advised']
      },
      'theophylline+caffeine': {
        risk: 'risky',
        mechanism: 'Both are methylxanthines; combination can cause excessive stimulation and toxicity.',
        effects: ['Excessive stimulation', 'Anxiety', 'Tremors', 'Cardiac effects', 'Toxicity risk'],
        advice: ['Limit caffeine intake', 'Monitor for toxicity', 'Excessive stimulation risk', 'Medical monitoring']
      },

      // Hormonal Medications
      'birth-control+st-johns-wort': {
        risk: 'risky',
        mechanism: 'St. John\'s Wort can reduce birth control effectiveness by increasing hormone metabolism.',
        effects: ['Reduced contraceptive effectiveness', 'Breakthrough bleeding', 'Pregnancy risk'],
        advice: ['Use additional contraception', 'May reduce effectiveness', 'Consult gynecologist', 'Alternative methods needed']
      },
      'testosterone+alcohol': {
        risk: 'risky',
        mechanism: 'Alcohol may interfere with testosterone therapy and increase liver stress.',
        effects: ['Liver stress', 'Reduced testosterone effectiveness', 'Cardiovascular effects'],
        advice: ['Limit alcohol consumption', 'Monitor liver function', 'May affect treatment', 'Medical monitoring']
      },

      // Diabetes Medications
      'insulin+alcohol': {
        risk: 'dangerous',
        mechanism: 'Alcohol can cause dangerous blood sugar drops, especially with insulin therapy.',
        effects: ['Severe hypoglycemia', 'Blood sugar crashes', 'Loss of consciousness', 'Diabetic emergency'],
        advice: ['Monitor blood sugar closely', 'Dangerous hypoglycemia risk', 'Limit alcohol', 'Emergency glucose needed']
      },
      'metformin+alcohol': {
        risk: 'risky',
        mechanism: 'Alcohol with metformin increases risk of lactic acidosis, especially with heavy drinking.',
        effects: ['Lactic acidosis risk', 'Metabolic complications', 'Enhanced side effects'],
        advice: ['Limit alcohol consumption', 'Monitor for acidosis', 'Increased side effect risk', 'Medical monitoring']
      },

      // Thyroid Medications
      'levothyroxine+stimulants': {
        risk: 'risky',
        mechanism: 'Thyroid hormones with stimulants can cause excessive cardiovascular stimulation.',
        effects: ['Increased heart rate', 'Blood pressure elevation', 'Anxiety', 'Cardiac stress'],
        advice: ['Monitor cardiovascular function', 'Thyroid level monitoring', 'Cardiac stress risk', 'Medical supervision']
      },

      // Allergy Medications
      'cetirizine+alcohol': {
        risk: 'moderate',
        mechanism: 'Non-sedating antihistamines still have some sedative effects enhanced by alcohol.',
        effects: ['Mild sedation enhancement', 'Slight impairment', 'Drowsiness'],
        advice: ['Some sedation possible', 'Monitor for drowsiness', 'Avoid driving if drowsy', 'Generally mild effects']
      },
      'promethazine+opioids': {
        risk: 'deadly',
        mechanism: 'Promethazine significantly enhances opioid respiratory depression, causing many overdose deaths.',
        effects: ['Severe respiratory depression', 'Enhanced sedation', 'Coma', 'Death'],
        advice: ['Extremely dangerous', 'Never combine', 'High fatality rate', 'Emergency care if combined']
      },

      // Muscle Relaxants Extended
      'cyclobenzaprine+tramadol': {
        risk: 'dangerous',
        mechanism: 'Both substances have serotonergic activity and CNS depression, creating multiple risks.',
        effects: ['Serotonin syndrome risk', 'Enhanced CNS depression', 'Seizure risk', 'Respiratory depression'],
        advice: ['Multiple dangerous interactions', 'Never combine', 'Serotonin and seizure risk', 'Medical emergency potential']
      },
      'baclofen+alcohol': {
        risk: 'dangerous',
        mechanism: 'Baclofen with alcohol creates dangerous CNS depression through GABA enhancement.',
        effects: ['Severe CNS depression', 'Respiratory depression', 'Loss of consciousness', 'Overdose risk'],
        advice: ['Dangerous combination', 'Respiratory risk', 'Avoid alcohol', 'Monitor consciousness level']
      },

      // Antihistamines Extended
      'chlorpheniramine+alcohol': {
        risk: 'risky',
        mechanism: 'First-generation antihistamines have significant sedative effects enhanced by alcohol.',
        effects: ['Severe sedation', 'Impaired coordination', 'Dangerous driving impairment', 'Respiratory effects'],
        advice: ['Significant sedation', 'Never drive', 'Avoid alcohol', 'Respiratory monitoring']
      },
      'doxylamine+benzodiazepines': {
        risk: 'dangerous',
        mechanism: 'Doxylamine is highly sedating; combination with benzos creates dangerous over-sedation.',
        effects: ['Extreme sedation', 'Respiratory depression', 'Loss of consciousness', 'Overdose risk'],
        advice: ['Dangerous combination', 'Extreme sedation risk', 'Respiratory monitoring', 'Avoid combination']
      },

      // Supplements and Natural Products
      'kava+valerian': {
        risk: 'risky',
        mechanism: 'Both herbs have GABAergic effects that may combine for excessive sedation.',
        effects: ['Enhanced sedation', 'Excessive drowsiness', 'Coordination problems', 'Liver stress'],
        advice: ['Enhanced sedation risk', 'Monitor liver function', 'Start with low doses', 'Avoid driving']
      },
      'ginkgo+blood-thinners': {
        risk: 'risky',
        mechanism: 'Ginkgo may enhance anticoagulant effects, increasing bleeding risk.',
        effects: ['Increased bleeding risk', 'Enhanced anticoagulation', 'Bruising', 'Surgical complications'],
        advice: ['Monitor bleeding signs', 'Consult physician', 'Stop before surgery', 'Regular monitoring']
      },
      'ginseng+stimulants': {
        risk: 'risky',
        mechanism: 'Ginseng may enhance stimulant effects, causing excessive cardiovascular stimulation.',
        effects: ['Enhanced stimulation', 'Increased blood pressure', 'Anxiety', 'Cardiac stress'],
        advice: ['Monitor blood pressure', 'Cardiovascular stress', 'Start with low doses', 'Avoid high stimulant doses']
      },

      // LOW RISK COMBINATIONS
      'thc+cbd': {
        risk: 'low',
        mechanism: 'CBD may modulate THC effects, potentially reducing anxiety and paranoia.',
        effects: ['Reduced THC anxiety', 'Smoother experience', 'Potential enhanced pain relief'],
        advice: ['Generally safe combination', 'CBD may reduce THC high', 'Start slow', 'Monitor effects']
      },
      // Additional comprehensive interactions
      'lsd+thc': {
        risk: 'moderate',
        mechanism: 'THC can significantly intensify LSD visuals and psychological effects, sometimes unexpectedly.',
        effects: ['Intensified visuals', 'Enhanced thought loops', 'Increased anxiety potential', 'Unpredictable potentiation'],
        advice: ['Use much less THC than usual', 'May dramatically increase trip intensity', 'Have CBD available for anxiety', 'Experienced users only']
      },
      'psilocybin+thc': {
        risk: 'moderate',
        mechanism: 'Cannabis can enhance psilocybin effects and may help with nausea but increases confusion risk.',
        effects: ['Enhanced visuals', 'Reduced nausea potential', 'Increased confusion', 'Intensified experience'],
        advice: ['Small amounts of THC only', 'May help with mushroom nausea', 'Can significantly intensify trip', 'Have CBD ready for anxiety']
      },
      'caffeine+nicotine': {
        risk: 'low',
        mechanism: 'Both are mild stimulants that work through different mechanisms with some synergy.',
        effects: ['Increased alertness', 'Enhanced focus', 'Possible jitters', 'Increased heart rate'],
        advice: ['Very common combination', 'Monitor heart rate', 'Stay hydrated', 'Avoid excessive amounts of either']
      },
      'melatonin+alcohol': {
        risk: 'risky',
        mechanism: 'Alcohol can interfere with melatonin\'s sleep-promoting effects and increase sedation.',
        effects: ['Enhanced sedation', 'Disrupted sleep quality', 'Morning grogginess', 'Impaired sleep architecture'],
        advice: ['Alcohol disrupts sleep quality', 'May cause excessive sedation', 'Avoid alcohol near bedtime', 'Reduces melatonin effectiveness']
      },
      'cbd+alcohol': {
        risk: 'moderate',
        mechanism: 'CBD may enhance alcohol\'s sedative effects and could affect alcohol metabolism.',
        effects: ['Enhanced relaxation', 'Increased sedation', 'Possible hangover reduction', 'Altered alcohol metabolism'],
        advice: ['May increase alcohol effects', 'Start with lower alcohol doses', 'Generally mild interaction', 'Could reduce hangover symptoms']
      },
      'nitrous+alcohol': {
        risk: 'dangerous',
        mechanism: 'Alcohol impairs judgment during nitrous use, dramatically increasing fall and injury risk.',
        effects: ['Severe coordination loss', 'High fall risk', 'Impaired judgment', 'Dangerous loss of balance'],
        advice: ['Extremely dangerous for falls', 'Never use nitrous while drinking', 'High injury risk', 'Sit or lie down if combined']
      },
      'nitrous+ketamine': {
        risk: 'dangerous',
        mechanism: 'Combining dissociatives creates extreme dissociation with very high risk of serious injury.',
        effects: ['Extreme dissociation', 'Complete reality loss', 'Very high injury risk', 'Dangerous coordination loss'],
        advice: ['Never combine dissociatives', 'Extremely dangerous', 'High risk of serious injury', 'Complete loss of motor control']
      },
      'lsd+mushrooms': {
        risk: 'dangerous',
        mechanism: 'Combining different psychedelics creates unpredictable and often overwhelming experiences.',
        effects: ['Unpredictable potentiation', 'Overwhelming intensity', 'Extended duration', 'High psychological risk'],
        advice: ['Never combine psychedelics', 'Unpredictable and potentially traumatic', 'One psychedelic at a time only', 'High risk of bad trip']
      },
      'cocaine+energy-drinks': {
        risk: 'dangerous',
        mechanism: 'Caffeine and taurine in energy drinks add to cocaine\'s cardiovascular stress.',
        effects: ['Severe cardiovascular stress', 'Increased heart rate', 'Blood pressure spikes', 'Cardiac event risk'],
        advice: ['High cardiac risk', 'Avoid all caffeinated drinks', 'Monitor heart rate', 'Seek medical attention for chest pain']
      },
      'mdma+energy-drinks': {
        risk: 'risky',
        mechanism: 'Caffeine and other stimulants in energy drinks can worsen MDMA\'s cardiovascular effects.',
        effects: ['Increased heart rate', 'Enhanced dehydration', 'Cardiovascular stress', 'Hyperthermia risk'],
        advice: ['Avoid energy drinks', 'Increases dehydration risk', 'Monitor heart rate', 'Plain water is safer']
      },
      'alcohol+energy-drinks': {
        risk: 'risky',
        mechanism: 'Caffeine masks alcohol impairment while increasing dehydration and cardiac stress.',
        effects: ['Masked alcohol impairment', 'Dangerous overdrinking', 'Cardiac stress', 'Severe dehydration'],
        advice: ['Caffeine hides alcohol effects', 'High risk of alcohol poisoning', 'Severe dehydration', 'Monitor alcohol intake carefully']
      },
      'dmt+cannabis': {
        risk: 'moderate',
        mechanism: 'Cannabis may intensify DMT experiences and extend the psychological afterglow period.',
        effects: ['Intensified experience', 'Extended afterglow', 'Increased confusion', 'Enhanced visuals'],
        advice: ['May significantly intensify DMT', 'Use minimal cannabis', 'Can extend experience', 'May increase confusion']
      },
      'ayahuasca+cannabis': {
        risk: 'risky',
        mechanism: 'Cannabis may intensify ayahuasca effects unpredictably and interfere with traditional healing aspects.',
        effects: ['Unpredictable intensification', 'Interference with healing process', 'Increased confusion', 'Cultural inappropriateness'],
        advice: ['Traditional contraindication', 'May interfere with healing', 'Respect traditional protocols', 'Generally not recommended']
      },
      'mescaline+cannabis': {
        risk: 'moderate',
        mechanism: 'Cannabis may help with mescaline nausea but can intensify confusion and anxiety.',
        effects: ['Reduced nausea potential', 'Increased confusion', 'Enhanced anxiety risk', 'Unpredictable interactions'],
        advice: ['May help with nausea', 'Can increase confusion significantly', 'Start with very low THC doses', 'Have CBD available']
      },
      'salvia+cannabis': {
        risk: 'risky',
        mechanism: 'Cannabis may worsen salvia\'s disorienting effects and prolong confusion.',
        effects: ['Enhanced disorientation', 'Prolonged confusion', 'Increased anxiety', 'Memory formation problems'],
        advice: ['May worsen disorientation', 'Can prolong confusion', 'Use salvia completely sober', 'Cannabis not helpful']
      },

      // Alcohol combinations with various substances
      'alcohol+cough-medicine': {
        risk: 'dangerous',
        mechanism: 'Many cough medicines contain DXM or codeine, both dangerous with alcohol.',
        effects: ['Severe respiratory depression', 'Enhanced sedation', 'Loss of consciousness', 'Overdose risk'],
        advice: ['Check all cough medicine ingredients', 'Never mix with alcohol', 'High respiratory risk', 'Read all labels carefully']
      },
      'alcohol+sleep-aids': {
        risk: 'deadly',
        mechanism: 'All sleep medications with alcohol create dangerous respiratory depression.',
        effects: ['Severe respiratory depression', 'Loss of consciousness', 'Coma', 'Death'],
        advice: ['Never combine', 'Fatal interaction potential', 'Respiratory failure risk', 'Emergency care if combined']
      },
      'alcohol+muscle-relaxants': {
        risk: 'deadly',
        mechanism: 'Muscle relaxants with alcohol cause dangerous CNS depression and respiratory failure.',
        effects: ['Severe respiratory depression', 'Muscle weakness', 'Loss of consciousness', 'Death'],
        advice: ['Never combine', 'High fatality risk', 'Respiratory failure possible', 'Emergency care required']
      },
      'alcohol+antihistamines': {
        risk: 'dangerous',
        mechanism: 'Antihistamines, especially first-generation ones, significantly enhance alcohol sedation.',
        effects: ['Severe sedation', 'Dangerous impairment', 'Respiratory effects', 'Loss of coordination'],
        advice: ['Very dangerous driving impairment', 'Severe sedation risk', 'Avoid alcohol completely', 'Even Benadryl is dangerous']
      },

      // Prescription interactions
      'adderall+alcohol': {
        risk: 'dangerous',
        mechanism: 'Amphetamines mask alcohol impairment while increasing cardiovascular stress.',
        effects: ['Masked alcohol effects', 'Cardiovascular stress', 'Dangerous overdrinking', 'Cardiac event risk'],
        advice: ['Alcohol effects are hidden', 'High risk of alcohol poisoning', 'Cardiac stress danger', 'Monitor alcohol intake']
      },
      'ritalin+alcohol': {
        risk: 'dangerous',
        mechanism: 'Methylphenidate masks alcohol impairment and increases cardiovascular risks.',
        effects: ['Hidden alcohol impairment', 'Increased heart rate', 'Blood pressure elevation', 'Overdrinking risk'],
        advice: ['Alcohol impairment masked', 'Cardiovascular monitoring needed', 'High overdrinking risk', 'Avoid combination']
      },
      'vyvanse+alcohol': {
        risk: 'dangerous',
        mechanism: 'Lisdexamfetamine masks alcohol effects while creating cardiovascular stress.',
        effects: ['Masked intoxication', 'Cardiovascular stress', 'Alcohol poisoning risk', 'Cardiac complications'],
        advice: ['Dangerous masking of alcohol', 'High cardiac stress', 'Alcohol poisoning risk', 'Avoid alcohol']
      },
      'wellbutrin+alcohol': {
        risk: 'dangerous',
        mechanism: 'Bupropion significantly lowers seizure threshold, especially dangerous with alcohol.',
        effects: ['Severe seizure risk', 'Enhanced alcohol effects', 'Neurological complications'],
        advice: ['High seizure risk', 'Never binge drink', 'Limit alcohol strictly', 'Medical supervision required']
      },
      'effexor+alcohol': {
        risk: 'risky',
        mechanism: 'Venlafaxine may enhance alcohol sedation and increase side effects.',
        effects: ['Enhanced alcohol effects', 'Increased sedation', 'Worsened depression', 'Side effect amplification'],
        advice: ['Alcohol may worsen depression', 'Enhanced sedation', 'Limit alcohol consumption', 'Monitor mood effects']
      },
      'cymbalta+alcohol': {
        risk: 'risky',
        mechanism: 'Duloxetine with alcohol increases liver stress and may worsen depression.',
        effects: ['Liver stress', 'Enhanced sedation', 'Worsened depression', 'Increased side effects'],
        advice: ['Liver damage risk', 'May worsen depression', 'Limit alcohol intake', 'Monitor liver function']
      },

      // Common supplement interactions
      'magnesium+alcohol': {
        risk: 'moderate',
        mechanism: 'Magnesium may enhance alcohol\'s muscle relaxant effects but can help with hangover.',
        effects: ['Enhanced muscle relaxation', 'Possible hangover reduction', 'Mild sedation increase'],
        advice: ['Generally safe combination', 'May help with hangovers', 'Mild enhancement of effects', 'Stay hydrated']
      },
      'b-vitamins+alcohol': {
        risk: 'low',
        mechanism: 'B-vitamins may help with alcohol metabolism and hangover prevention.',
        effects: ['Possible hangover reduction', 'Better alcohol metabolism', 'Liver support'],
        advice: ['Generally beneficial', 'May reduce hangover', 'Supports liver function', 'Take before drinking']
      },
      'milk-thistle+alcohol': {
        risk: 'low',
        mechanism: 'Milk thistle may provide liver protection during alcohol consumption.',
        effects: ['Liver protection', 'Possible hangover reduction', 'Hepatoprotective effects'],
        advice: ['May protect liver', 'Generally safe combination', 'Possible hangover reduction', 'Liver support supplement']
      },
      'activated-charcoal+alcohol': {
        risk: 'low',
        mechanism: 'Activated charcoal may reduce alcohol absorption if taken before drinking.',
        effects: ['Reduced alcohol absorption', 'Possibly less intoxication', 'Stomach protection'],
        advice: ['May reduce alcohol absorption', 'Take before drinking', 'Not effective after drinking', 'Generally safe']
      },

      // Food and alcohol interactions
      'grapefruit+alcohol': {
        risk: 'risky',
        mechanism: 'Grapefruit juice can enhance alcohol effects by inhibiting metabolism enzymes.',
        effects: ['Enhanced alcohol effects', 'Prolonged intoxication', 'Increased impairment'],
        advice: ['May increase alcohol effects', 'Avoid grapefruit before drinking', 'Enhanced intoxication possible', 'Monitor alcohol intake']
      },
      'cannabis+mango': {
        risk: 'low',
        mechanism: 'Mangoes contain myrcene which may enhance cannabis effects through terpene interactions.',
        effects: ['Possibly enhanced cannabis effects', 'Longer duration potential', 'Increased sedation'],
        advice: ['May enhance cannabis effects', 'Terpene interaction', 'Generally safe', 'Popular folk combination']
      },

      // Respiratory depressant combinations
      'opioids+muscle-relaxants': {
        risk: 'deadly',
        mechanism: 'Any opioid with muscle relaxants creates extreme respiratory depression risk.',
        effects: ['Severe respiratory depression', 'Loss of consciousness', 'Coma', 'Death'],
        advice: ['Never combine', 'Fatal interaction', 'Respiratory failure highly likely', 'Emergency care required']
      },
      'opioids+sleep-medications': {
        risk: 'deadly',
        mechanism: 'Sleep aids with opioids cause the majority of prescription drug overdose deaths.',
        effects: ['Respiratory failure', 'Cardiac arrest', 'Coma', 'Death'],
        advice: ['Leading cause of prescription overdoses', 'Never combine', 'Fatal interaction', 'Have naloxone available']
      },
      'opioids+antihistamines': {
        risk: 'dangerous',
        mechanism: 'Antihistamines enhance opioid sedation and respiratory depression.',
        effects: ['Enhanced respiratory depression', 'Severe sedation', 'Loss of consciousness', 'Overdose risk'],
        advice: ['Dangerous enhancement of effects', 'High overdose risk', 'Avoid all antihistamines', 'Monitor breathing']
      },

      // Phenazepam aliases for comprehensive coverage
      'fenazepam+alcohol': {
        risk: 'deadly',
        mechanism: 'Fenazepam (phenazepam) is an extremely potent benzodiazepine - alcohol combination causes prolonged respiratory depression.',
        effects: ['Multi-day coma', 'Respiratory failure', 'Death', 'Complete amnesia', 'Hypothermia'],
        advice: ['EXTREMELY DANGEROUS', 'Emergency medical care', 'Monitor breathing for 48+ hours', 'Remove access to all substances']
      },
      'phenzepam+alcohol': {
        risk: 'deadly',
        mechanism: 'Phenzepam (phenazepam) with alcohol creates prolonged, life-threatening CNS depression.',
        effects: ['Multi-day blackouts', 'Respiratory failure', 'Death', 'Complete amnesia'],
        advice: ['EXTREMELY DANGEROUS', 'Emergency medical care', 'Monitor breathing for days', 'Delayed onset increases overdose risk']
      },

      // Rohypnol aliases for comprehensive coverage
      'flunitrazepam+alcohol': {
        risk: 'deadly',
        mechanism: 'Flunitrazepam (Rohypnol) is 10x more potent than Valium - alcohol combination causes severe respiratory depression.',
        effects: ['Complete amnesia', 'Respiratory failure', 'Death', 'Sexual assault vulnerability', 'Dangerous blackout behavior'],
        advice: ['LETHAL COMBINATION', 'Drug-facilitated assault risk', 'Emergency medical care if suspected', 'Flumazenil antidote may be needed']
      },
      'roofies+alcohol': {
        risk: 'deadly',
        mechanism: 'Roofies (Rohypnol) with alcohol is the classic "date rape drug" combination - causes total amnesia and unconsciousness.',
        effects: ['Total memory loss', 'Unconsciousness', 'Respiratory depression', 'Death', 'Sexual assault vulnerability'],
        advice: ['EXTREMELY DANGEROUS', 'Associated with sexual assault', 'Seek immediate help if suspected', 'Emergency services immediately']
      },
      'roofie+alcohol': {
        risk: 'deadly',
        mechanism: 'Roofie (Rohypnol/flunitrazepam) with alcohol causes severe CNS depression and complete memory loss.',
        effects: ['Complete amnesia', 'Respiratory failure', 'Unconsciousness', 'Death', 'Dangerous vulnerability'],
        advice: ['LETHAL COMBINATION', 'Drug-facilitated crime association', 'Emergency medical care', 'Report suspected incidents']
      },

      // Quetiapine aliases for comprehensive coverage
      'seroquel+alcohol': {
        risk: 'dangerous',
        mechanism: 'Seroquel (quetiapine) with alcohol creates dangerous sedation with risk of cardiac complications and metabolic decompensation.',
        effects: ['Severe sedation', 'Respiratory depression', 'Cardiac arrhythmias', 'Metabolic complications', 'Falls and injuries'],
        advice: ['High risk combination', 'Monitor for excessive sedation', 'Medical supervision recommended', 'Avoid operating machinery']
      },

      // Aerosol aliases for comprehensive coverage - EXTREME DANGER
      'inhalants+alcohol': {
        risk: 'deadly',
        mechanism: 'Inhalants cause cardiac sensitization while alcohol depresses CNS - double fatal mechanism with oxygen displacement.',
        effects: ['Sudden cardiac death', 'Respiratory failure', 'Chemical burns', 'Suffocation', 'Death'],
        advice: ['EXTREMELY LETHAL', 'Emergency medical care', 'Fresh air immediately', 'Monitor heart AND breathing']
      },
      'huffing+alcohol': {
        risk: 'deadly',
        mechanism: 'Huffing with alcohol combines cardiac sensitization, respiratory depression, and oxygen displacement.',
        effects: ['Instant cardiac arrest', 'Suffocation', 'Chemical pneumonia', 'Death from multiple causes'],
        advice: ['FATAL COMBINATION', 'Call 911 immediately', 'Fresh air', 'CPR may be needed']
      },
      'duster+alcohol': {
        risk: 'deadly',
        mechanism: 'Computer duster (difluoroethane) with alcohol causes cardiac sensitization plus CNS depression.',
        effects: ['Sudden sniffing death', 'Respiratory failure', 'Frostbite burns', 'Cardiac arrest'],
        advice: ['LETHAL COMBINATION', 'No safe amount', 'Emergency services', 'Death can be instant']
      },
      'dusting+alcohol': {
        risk: 'deadly',
        mechanism: 'Dusting (aerosol abuse) with alcohol creates multiple fatal pathways - cardiac and respiratory.',
        effects: ['Sudden cardiac death', 'Respiratory depression', 'Chemical burns', 'Suffocation'],
        advice: ['EXTREMELY DANGEROUS', 'Death possible instantly', 'Emergency medical care', 'Fresh air essential']
      },
      'whippets+alcohol': {
        risk: 'dangerous',
        mechanism: 'Nitrous oxide with alcohol increases oxygen displacement and enhances CNS depression.',
        effects: ['Severe hypoxia', 'Respiratory depression', 'B12 depletion', 'Falls and injuries', 'Unconsciousness'],
        advice: ['High risk combination', 'Ensure adequate oxygen', 'Monitor breathing', 'Limit session duration']
      },

      // ANABOLIC STEROID INTERACTIONS - Long-term health risks
      'anabolic-steroids+alcohol': {
        risk: 'dangerous',
        mechanism: 'Anabolic steroids stress the liver while alcohol adds hepatotoxicity - doubled liver damage plus cardiovascular strain.',
        effects: ['Severe liver damage', 'Cardiovascular complications', 'Increased aggression', 'Impaired judgment', 'Long-term organ damage'],
        advice: ['High risk combination', 'Liver function monitoring essential', 'Cardiovascular health assessment', 'Avoid during cycles']
      },
      'steroids+nsaids': {
        risk: 'dangerous',
        mechanism: 'Both steroids and NSAIDs increase cardiovascular risk and can cause gastrointestinal bleeding.',
        effects: ['Increased heart attack risk', 'Stroke risk', 'GI bleeding', 'Kidney damage', 'High blood pressure'],
        advice: ['Dangerous cardiovascular combination', 'Medical supervision required', 'Blood pressure monitoring', 'Limit NSAID use']
      },
      'anabolic+stimulants': {
        risk: 'dangerous', 
        mechanism: 'Anabolic steroids increase cardiovascular strain while stimulants elevate heart rate and blood pressure.',
        effects: ['Severe hypertension', 'Cardiac arrhythmias', 'Heart attack', 'Stroke', 'Cardiovascular crisis'],
        advice: ['High cardiovascular risk', 'Blood pressure monitoring critical', 'ECG monitoring recommended', 'Medical supervision required']
      },
      'testosterone+anticoagulants': {
        risk: 'dangerous',
        mechanism: 'Anabolic steroids can enhance anticoagulant effects, leading to dangerous bleeding.',
        effects: ['Excessive bleeding', 'Internal hemorrhage', 'Stroke from bleeding', 'Difficulty controlling bleeding'],
        advice: ['Requires close medical monitoring', 'Frequent blood tests needed', 'Adjust anticoagulant doses', 'Watch for bleeding signs']
      },
      'roids+insulin': {
        risk: 'moderate',
        mechanism: 'Anabolic steroids can alter glucose metabolism and insulin sensitivity.',
        effects: ['Blood sugar fluctuations', 'Insulin resistance', 'Diabetic complications', 'Metabolic disruption'],
        advice: ['Monitor blood glucose closely', 'Adjust insulin as needed', 'Medical supervision recommended', 'Regular endocrine monitoring']
      },

      'lsd+thc': {
        risk: 'moderate',
        mechanism: 'THC can significantly intensify LSD visuals and psychological effects, sometimes unexpectedly.',
        effects: ['Intensified visuals', 'Enhanced thought loops', 'Increased anxiety potential', 'Unpredictable potentiation'],
        advice: ['Use much less THC than usual', 'May dramatically increase trip intensity', 'Have CBD available for anxiety', 'Experienced users only']
      },
      'psilocybin+thc': {
        risk: 'low',
        mechanism: 'Cannabis can enhance psilocybin effects and may help with nausea during come-up.',
        effects: ['Enhanced visuals', 'Reduced nausea', 'Intensified experience', 'Longer duration'],
        advice: ['Small amounts of THC', 'May help with mushroom nausea', 'Can intensify trip', 'Have CBD ready']
      },
      'caffeine+nicotine': {
        risk: 'low',
        mechanism: 'Both are mild stimulants that work through different mechanisms with some synergy.',
        effects: ['Increased alertness', 'Enhanced focus', 'Possible jitters', 'Increased heart rate'],
        advice: ['Common combination', 'Monitor heart rate', 'Stay hydrated', 'Avoid excessive amounts']
      },

      // 2C-E Specific Interactions - Challenging Phenethylamine with Intense Body Load
      '2c-e+stimulant': {
        risk: 'dangerous',
        mechanism: '2C-E\'s intense body load and cardiovascular effects are severely amplified by stimulants, creating dangerous physical stress.',
        effects: ['Extreme body load', 'Dangerous cardiovascular stress', 'Overwhelming physical discomfort', 'Hyperthermia risk'],
        advice: ['Avoid all stimulants with 2C-E', 'Body load becomes unbearable', 'Cardiovascular danger', 'Medical monitoring essential']
      },
      '2c-e+cannabis': {
        risk: 'risky',
        mechanism: 'Cannabis can unpredictably intensify 2C-E\'s already intense effects and body load.',
        effects: ['Unpredictable intensification', 'Enhanced body load', 'Increased confusion', 'Anxiety amplification'],
        advice: ['Very unpredictable combination', 'Body load may become overwhelming', 'Start with tiny amounts only', 'Have sober support']
      },
      '2c-e+alcohol': {
        risk: 'dangerous',
        mechanism: 'Alcohol interactions with 2C-E\'s challenging effects create dangerous dehydration and cardiovascular stress.',
        effects: ['Severe dehydration', 'Enhanced body load', 'Cardiovascular stress', 'Dangerous combination'],
        advice: ['Avoid alcohol completely', 'Dehydration risk severe', 'Body load becomes dangerous', 'Stay hydrated']
      },
      '2c-e+tramadol': {
        risk: 'deadly',
        mechanism: '2C-E with tramadol creates severe serotonin syndrome risk combined with intense physical stress.',
        effects: ['Serotonin syndrome', 'Extreme body load', 'Seizure risk', 'Life-threatening combination'],
        advice: ['NEVER combine', 'Serotonin syndrome risk', 'Emergency medical care', 'Potentially fatal']
      },
      '2c-e+mdma': {
        risk: 'dangerous',
        mechanism: '2C-E and MDMA create overwhelming serotonergic activity and extreme cardiovascular stress.',
        effects: ['Overwhelming stimulation', 'Extreme body load', 'Cardiovascular danger', 'Hyperthermia risk'],
        advice: ['Extremely challenging combination', 'Body load unbearable', 'Cardiovascular monitoring', 'Avoid combination']
      },

      // 2C-I Specific Interactions - Intense Phenethylamine with NBOMe Risk
      '2c-i+stimulant': {
        risk: 'dangerous',
        mechanism: '2C-I\'s intense cardiovascular effects are dangerously amplified by stimulants, creating severe vasoconstriction and hyperthermia risk.',
        effects: ['Severe vasoconstriction', 'Dangerous cardiovascular strain', 'Hyperthermia risk', 'Circulation compromise'],
        advice: ['Avoid all stimulants with 2C-I', 'Cardiovascular emergency risk', 'Circulation monitoring essential', 'Medical attention if combined']
      },
      '2c-i+cannabis': {
        risk: 'risky',
        mechanism: 'Cannabis can unpredictably intensify 2C-I\'s already powerful visual effects and anxiety potential.',
        effects: ['Unpredictable visual intensification', 'Increased anxiety risk', 'Enhanced confusion', 'Overwhelming combination'],
        advice: ['Very unpredictable results', 'Start with minimal cannabis', 'Visual effects can become overwhelming', 'Have support available']
      },
      '2c-i+alcohol': {
        risk: 'dangerous',
        mechanism: 'Alcohol interactions with 2C-I create dangerous dehydration and cardiovascular complications.',
        effects: ['Severe dehydration', 'Enhanced cardiovascular stress', 'Dangerous combination', 'Impaired judgment'],
        advice: ['Avoid alcohol completely', 'Dehydration risk severe', 'Cardiovascular complications', 'Stay hydrated with water']
      },
      '2c-i+tramadol': {
        risk: 'deadly',
        mechanism: '2C-I with tramadol creates severe serotonin syndrome risk combined with dangerous cardiovascular effects.',
        effects: ['Serotonin syndrome', 'Severe cardiovascular stress', 'Seizure risk', 'Life-threatening combination'],
        advice: ['NEVER combine', 'Serotonin syndrome danger', 'Emergency medical care', 'Potentially fatal interaction']
      },
      '2c-i+nbome': {
        risk: 'deadly',
        mechanism: 'Often confused substances - NBOMe is deadly at 2C-I doses. This combination represents misidentification danger.',
        effects: ['Overdose risk', 'Seizures', 'Cardiac arrest', 'Death'],
        advice: ['ALWAYS TEST SUBSTANCES', 'NBOMe lethal at 2C-I doses', 'Emergency medical care', 'Substance misidentification kills']
      },
      '2c-i+mdma': {
        risk: 'dangerous',
        mechanism: '2C-I and MDMA create overwhelming cardiovascular strain and extreme serotonergic activity.',
        effects: ['Extreme cardiovascular stress', 'Overwhelming stimulation', 'Hyperthermia danger', 'Circulation compromise'],
        advice: ['Extremely dangerous combination', 'Cardiovascular monitoring essential', 'Hyperthermia risk severe', 'Avoid combination']
      },

      // 2C-T-7 Specific Interactions - FATAL Overdose Risk
      '2c-t-7+stimulant': {
        risk: 'deadly',
        mechanism: '2C-T-7 already has fatal overdose risk - stimulants drastically increase cardiovascular toxicity and hyperthermia, creating lethal combinations.',
        effects: ['FATAL cardiovascular stress', 'Extreme hyperthermia', 'Cardiac arrhythmias', 'Death risk'],
        advice: ['NEVER combine with any stimulant', 'Fatal combination documented', 'Emergency medical care essential', 'Potentially lethal interaction']
      },
      '2c-t-7+alcohol': {
        risk: 'deadly',
        mechanism: '2C-T-7\'s narrow therapeutic window combined with alcohol\'s effects creates extreme toxicity and fatal overdose risk.',
        effects: ['Fatal overdose risk', 'Extreme cardiovascular toxicity', 'Respiratory depression', 'Death'],
        advice: ['NEVER combine with alcohol', 'Fatal overdose documented', 'Emergency medical intervention', 'Call 911 immediately']
      },
      '2c-t-7+maoi': {
        risk: 'deadly',
        mechanism: '2C-T-7 with MAOIs creates potentially fatal serotonin syndrome combined with existing fatal overdose risk.',
        effects: ['Fatal serotonin syndrome', 'Extreme hyperthermia', 'Cardiovascular collapse', 'Death'],
        advice: ['ABSOLUTELY NEVER combine', 'Fatal interaction certain', 'Emergency medical care', 'Life-threatening combination']
      },
      '2c-t-7+tramadol': {
        risk: 'deadly',
        mechanism: '2C-T-7 and tramadol create fatal serotonin syndrome risk combined with existing cardiovascular toxicity.',
        effects: ['Fatal serotonin syndrome', 'Seizures', 'Cardiovascular collapse', 'Death'],
        advice: ['NEVER combine - lethal', 'Emergency medical care', 'Fatal interaction documented', 'Call 911 immediately']
      },
      '2c-t-7+cannabis': {
        risk: 'deadly',
        mechanism: '2C-T-7\'s fatal overdose risk means ANY additional substance can push dosage into lethal territory.',
        effects: ['Increased overdose risk', 'Enhanced cardiovascular stress', 'Unpredictable toxicity', 'Death risk'],
        advice: ['Avoid all combinations', 'Fatal overdose risk too high', 'No safe combinations exist', 'Medical emergency potential']
      },
      '2c-t-7+mdma': {
        risk: 'deadly',
        mechanism: '2C-T-7 and MDMA create extreme cardiovascular toxicity - both substances stress the heart, creating fatal combinations.',
        effects: ['Fatal cardiovascular stress', 'Extreme hyperthermia', 'Cardiac arrest risk', 'Death'],
        advice: ['NEVER combine - lethal', 'Cardiovascular system overload', 'Emergency medical care', 'Fatal interaction certain']
      },

      // 3-CMC Specific Interactions - Synthetic Cathinone Dangers
      '3-cmc+stimulant': {
        risk: 'deadly',
        mechanism: '3-CMC and other stimulants create extreme cardiovascular stress. Cathinone cardiovascular toxicity combined with additional stimulants can cause fatal heart arrhythmias.',
        effects: ['Fatal heart attack risk', 'Extreme hypertension', 'Cardiac arrhythmias', 'Hyperthermia', 'Death'],
        advice: ['NEVER combine stimulants', 'Fatal cardiovascular overload', 'Emergency medical attention', 'Heart failure risk']
      },
      '3-cmc+alcohol': {
        risk: 'dangerous',
        mechanism: '3-CMC and alcohol mask each other\'s effects, leading to dangerous redosing. Alcohol increases cardiac toxicity while preventing recognition of dangerous stimulant levels.',
        effects: ['Masked stimulant toxicity', 'Fatal redosing', 'Cardiac stress', 'Hyperthermia'],
        advice: ['Avoid combination', 'Extreme redosing risk', 'Monitor heart rate', 'Have sober supervision']
      },
      '3-cmc+maoi': {
        risk: 'deadly',
        mechanism: '3-CMC with MAOIs creates potentially fatal hypertensive crisis and serotonin syndrome. Cathinone metabolism blocked, causing toxic accumulation.',
        effects: ['Hypertensive crisis', 'Serotonin syndrome', 'Fatal blood pressure spike', 'Brain hemorrhage risk'],
        advice: ['NEVER combine - fatal', 'Wait 2+ weeks after MAOI', 'Emergency medical care', 'Life-threatening interaction']
      },
      '3-cmc+tramadol': {
        risk: 'deadly',
        mechanism: '3-CMC and tramadol create severe serotonin syndrome risk combined with dangerous cardiovascular effects from both substances.',
        effects: ['Serotonin syndrome', 'Seizures', 'Hyperthermia', 'Cardiovascular collapse'],
        advice: ['NEVER combine', 'Fatal serotonin toxicity', 'Seizure risk extreme', 'Emergency care needed']
      },
      '3-cmc+cannabis': {
        risk: 'risky',
        mechanism: '3-CMC and cannabis can increase anxiety and paranoia, while cannabis may mask dangerous stimulant effects, leading to overuse.',
        effects: ['Increased anxiety', 'Paranoia', 'Cardiovascular stress', 'Masked toxicity'],
        advice: ['Use extreme caution', 'Monitor heart rate', 'Avoid high doses', 'Stay hydrated']
      },
      '3-cmc+mdma': {
        risk: 'deadly',
        mechanism: '3-CMC and MDMA create extreme serotonin and dopamine toxicity with severe cardiovascular stress. Both are neurotoxic stimulants with cardiac dangers.',
        effects: ['Severe neurotoxicity', 'Fatal hyperthermia', 'Cardiac arrest', 'Serotonin syndrome'],
        advice: ['NEVER combine', 'Extreme neurotoxicity', 'Fatal overheating risk', 'Emergency medical care']
      },

      // 3-MMC Specific Interactions - Extremely Dangerous Synthetic Cathinone
      '3-mmc+stimulant': {
        risk: 'deadly',
        mechanism: '3-MMC and other stimulants create extreme cardiovascular stress with fatal potential. 3-MMC already has severe cardiac toxicity - additional stimulants guarantee dangerous overload.',
        effects: ['Fatal heart attack risk', 'Extreme hypertension', 'Cardiac arrhythmias', 'Hyperthermia', 'Death'],
        advice: ['NEVER combine stimulants', 'Fatal cardiovascular overload certain', 'Emergency medical attention required', 'Heart failure imminent']
      },
      '3-mmc+alcohol': {
        risk: 'deadly',
        mechanism: '3-MMC and alcohol create extremely dangerous masking effects leading to fatal redosing. Alcohol increases cardiac toxicity while preventing recognition of life-threatening stimulant levels.',
        effects: ['Masked fatal toxicity', 'Compulsive fatal redosing', 'Cardiac arrest', 'Respiratory depression'],
        advice: ['NEVER combine - fatal', 'Extreme redosing risk', 'Monitor vital signs constantly', 'Emergency medical supervision needed']
      },
      '3-mmc+maoi': {
        risk: 'deadly',
        mechanism: '3-MMC with MAOIs creates potentially fatal hypertensive crisis and severe serotonin syndrome. Cathinone metabolism completely blocked, causing toxic accumulation and brain hemorrhage risk.',
        effects: ['Hypertensive crisis', 'Severe serotonin syndrome', 'Fatal blood pressure spike', 'Brain hemorrhage', 'Death'],
        advice: ['NEVER combine - always fatal', 'Wait 2+ weeks after MAOI', 'Emergency medical care immediately', 'Life-threatening interaction guaranteed']
      },
      '3-mmc+tramadol': {
        risk: 'deadly',
        mechanism: '3-MMC and tramadol create severe serotonin syndrome risk combined with dangerous cardiovascular effects and seizure potential from both substances.',
        effects: ['Severe serotonin syndrome', 'Seizures', 'Hyperthermia', 'Cardiovascular collapse', 'Death'],
        advice: ['NEVER combine', 'Fatal serotonin toxicity', 'Seizure risk extreme', 'Emergency care immediately needed']
      },
      '3-mmc+cannabis': {
        risk: 'dangerous',
        mechanism: '3-MMC and cannabis significantly increase anxiety and paranoia, while cannabis may mask dangerous stimulant effects, leading to fatal overuse patterns.',
        effects: ['Severe anxiety', 'Paranoid episodes', 'Cardiovascular stress', 'Masked toxicity', 'Psychosis'],
        advice: ['Avoid combination', 'Monitor heart rate constantly', 'Avoid high doses', 'Have medical supervision']
      },
      '3-mmc+mdma': {
        risk: 'deadly',
        mechanism: '3-MMC and MDMA create extreme serotonin and dopamine toxicity with severe cardiovascular stress. Both substances are highly neurotoxic with empathogenic effects creating dangerous synergy.',
        effects: ['Extreme neurotoxicity', 'Fatal hyperthermia', 'Cardiac arrest', 'Severe serotonin syndrome', 'Brain damage'],
        advice: ['NEVER combine - always fatal', 'Extreme neurotoxicity guaranteed', 'Fatal overheating certain', 'Emergency medical care essential']
      },
      '3-mmc+3-cmc': {
        risk: 'deadly',
        mechanism: '3-MMC and 3-CMC create extreme cathinone toxicity with additive cardiovascular effects. Both substances are dangerous synthetic cathinones with compulsive redosing patterns.',
        effects: ['Extreme cathinone toxicity', 'Fatal cardiovascular stress', 'Compulsive redosing', 'Hyperthermia', 'Death'],
        advice: ['NEVER combine cathinones', 'Fatal toxicity certain', 'Cardiovascular system overload', 'Emergency medical attention']
      },

      // 4-CEC Specific Interactions - Dangerous Synthetic Cathinone
      '4-cec+stimulant': {
        risk: 'deadly',
        mechanism: '4-CEC and other stimulants create extreme cardiovascular stress with fatal potential. 4-CEC already has severe cardiac toxicity - additional stimulants guarantee dangerous overload.',
        effects: ['Fatal heart attack risk', 'Extreme hypertension', 'Cardiac arrhythmias', 'Hyperthermia', 'Death'],
        advice: ['NEVER combine stimulants', 'Fatal cardiovascular overload', 'Emergency medical attention', 'Heart failure risk']
      },
      '4-cec+alcohol': {
        risk: 'dangerous',
        mechanism: '4-CEC and alcohol create dangerous masking effects leading to fatal redosing. Alcohol increases cardiac toxicity while preventing recognition of dangerous stimulant levels.',
        effects: ['Masked stimulant toxicity', 'Fatal redosing', 'Cardiac stress', 'Respiratory depression'],
        advice: ['Avoid combination', 'Extreme redosing risk', 'Monitor heart rate', 'Have sober supervision']
      },
      '4-cec+maoi': {
        risk: 'deadly',
        mechanism: '4-CEC with MAOIs creates potentially fatal hypertensive crisis and serotonin syndrome. Cathinone metabolism blocked, causing toxic accumulation.',
        effects: ['Hypertensive crisis', 'Serotonin syndrome', 'Fatal blood pressure spike', 'Brain hemorrhage risk'],
        advice: ['NEVER combine - fatal', 'Wait 2+ weeks after MAOI', 'Emergency medical care', 'Life-threatening interaction']
      },
      '4-cec+tramadol': {
        risk: 'deadly',
        mechanism: '4-CEC and tramadol create severe serotonin syndrome risk combined with dangerous cardiovascular effects from both substances.',
        effects: ['Serotonin syndrome', 'Seizures', 'Hyperthermia', 'Cardiovascular collapse'],
        advice: ['NEVER combine', 'Fatal serotonin toxicity', 'Seizure risk extreme', 'Emergency care needed']
      },
      '4-cec+cannabis': {
        risk: 'risky',
        mechanism: '4-CEC and cannabis can increase anxiety and paranoia, while cannabis may mask dangerous stimulant effects, leading to overuse.',
        effects: ['Increased anxiety', 'Paranoia', 'Cardiovascular stress', 'Masked toxicity'],
        advice: ['Use extreme caution', 'Monitor heart rate', 'Avoid high doses', 'Stay hydrated']
      },
      '4-cec+mdma': {
        risk: 'deadly',
        mechanism: '4-CEC and MDMA create extreme serotonin and dopamine toxicity with severe cardiovascular stress. Both substances are neurotoxic with cardiac dangers.',
        effects: ['Severe neurotoxicity', 'Fatal hyperthermia', 'Cardiac arrest', 'Serotonin syndrome'],
        advice: ['NEVER combine', 'Extreme neurotoxicity', 'Fatal overheating risk', 'Emergency medical care']
      },
      '4-cec+3-mmc': {
        risk: 'deadly',
        mechanism: '4-CEC and 3-MMC create extreme cathinone toxicity with additive cardiovascular effects. Both substances are dangerous synthetic cathinones.',
        effects: ['Extreme cathinone toxicity', 'Fatal cardiovascular stress', 'Compulsive redosing', 'Hyperthermia'],
        advice: ['NEVER combine cathinones', 'Fatal toxicity certain', 'Cardiovascular overload', 'Emergency medical attention']
      },
      '4-cec+3-cmc': {
        risk: 'deadly',
        mechanism: '4-CEC and 3-CMC create extreme cathinone toxicity with additive cardiovascular effects. Multiple synthetic cathinones guarantee dangerous toxicity.',
        effects: ['Extreme cathinone toxicity', 'Fatal cardiovascular stress', 'Compulsive redosing', 'Death'],
        advice: ['NEVER combine cathinones', 'Fatal toxicity guaranteed', 'Cardiovascular system failure', 'Emergency medical care essential']
      },

      // 4-CMC Specific Interactions - Extremely Dangerous Synthetic Cathinone
      '4-cmc+stimulant': {
        risk: 'deadly',
        mechanism: '4-CMC and other stimulants create extreme cardiovascular stress with fatal potential. 4-CMC already has severe cardiac toxicity - additional stimulants guarantee dangerous overload.',
        effects: ['Fatal heart attack risk', 'Extreme hypertension', 'Cardiac arrhythmias', 'Hyperthermia', 'Death'],
        advice: ['NEVER combine stimulants', 'Fatal cardiovascular overload', 'Emergency medical attention', 'Heart failure risk']
      },
      '4-cmc+alcohol': {
        risk: 'dangerous',
        mechanism: '4-CMC and alcohol create dangerous masking effects leading to fatal redosing. Alcohol increases cardiac toxicity while preventing recognition of dangerous stimulant levels.',
        effects: ['Masked stimulant toxicity', 'Fatal redosing', 'Cardiac stress', 'Respiratory depression'],
        advice: ['Avoid combination', 'Extreme redosing risk', 'Monitor heart rate', 'Have sober supervision']
      },
      '4-cmc+maoi': {
        risk: 'deadly',
        mechanism: '4-CMC with MAOIs creates potentially fatal hypertensive crisis and serotonin syndrome. Cathinone metabolism blocked, causing toxic accumulation.',
        effects: ['Hypertensive crisis', 'Serotonin syndrome', 'Fatal blood pressure spike', 'Brain hemorrhage risk'],
        advice: ['NEVER combine - fatal', 'Wait 2+ weeks after MAOI', 'Emergency medical care', 'Life-threatening interaction']
      },
      '4-cmc+tramadol': {
        risk: 'deadly',
        mechanism: '4-CMC and tramadol create severe serotonin syndrome risk combined with dangerous cardiovascular effects from both substances.',
        effects: ['Serotonin syndrome', 'Seizures', 'Hyperthermia', 'Cardiovascular collapse'],
        advice: ['NEVER combine', 'Fatal serotonin toxicity', 'Seizure risk extreme', 'Emergency care needed']
      },
      '4-cmc+cannabis': {
        risk: 'risky',
        mechanism: '4-CMC and cannabis can increase anxiety and paranoia, while cannabis may mask dangerous stimulant effects, leading to overuse.',
        effects: ['Increased anxiety', 'Paranoia', 'Cardiovascular stress', 'Masked toxicity'],
        advice: ['Use extreme caution', 'Monitor heart rate', 'Avoid high doses', 'Stay hydrated']
      },
      '4-cmc+mdma': {
        risk: 'deadly',
        mechanism: '4-CMC and MDMA create extreme serotonin and dopamine toxicity with severe cardiovascular stress. Both substances are neurotoxic with cardiac dangers.',
        effects: ['Severe neurotoxicity', 'Fatal hyperthermia', 'Cardiac arrest', 'Serotonin syndrome'],
        advice: ['NEVER combine', 'Extreme neurotoxicity', 'Fatal overheating risk', 'Emergency medical care']
      },
      '4-cmc+3-mmc': {
        risk: 'deadly',
        mechanism: '4-CMC and 3-MMC create extreme cathinone toxicity with additive cardiovascular effects. Both substances are dangerous synthetic cathinones.',
        effects: ['Extreme cathinone toxicity', 'Fatal cardiovascular stress', 'Compulsive redosing', 'Hyperthermia'],
        advice: ['NEVER combine cathinones', 'Fatal toxicity certain', 'Cardiovascular overload', 'Emergency medical attention']
      },
      '4-cmc+3-cmc': {
        risk: 'deadly',
        mechanism: '4-CMC and 3-CMC create extreme cathinone toxicity with additive cardiovascular effects. Multiple chlorinated cathinones guarantee organ toxicity.',
        effects: ['Extreme cathinone toxicity', 'Fatal cardiovascular stress', 'Organ toxicity', 'Death'],
        advice: ['NEVER combine cathinones', 'Fatal toxicity guaranteed', 'Multiple organ failure risk', 'Emergency medical care essential']
      },
      '4-cmc+4-cec': {
        risk: 'deadly',
        mechanism: '4-CMC and 4-CEC create extreme cathinone toxicity with additive cardiovascular effects. Both para-halogenated cathinones with unknown toxicity profiles.',
        effects: ['Extreme cathinone toxicity', 'Fatal cardiovascular stress', 'Unknown organ toxicity', 'Death'],
        advice: ['NEVER combine cathinones', 'Fatal toxicity certain', 'Unknown interaction effects', 'Emergency medical care required']
      },

      // 4-MMC (Mephedrone) Specific Interactions - Notorious Legal High Era Killer
      '4-mmc+stimulant': {
        risk: 'deadly',
        mechanism: '4-MMC and other stimulants create extreme cardiovascular stress with fatal potential. Mephedrone already has documented fatal cardiovascular effects - additional stimulants guarantee dangerous overload.',
        effects: ['Fatal heart attack risk', 'Extreme hypertension', 'Cardiac arrhythmias', 'Hyperthermia', 'Death'],
        advice: ['NEVER combine stimulants', 'Historical fatal combinations', 'Emergency medical attention', 'Cardiovascular failure risk']
      },
      '4-mmc+alcohol': {
        risk: 'dangerous',
        mechanism: '4-MMC and alcohol create dangerous masking effects leading to fatal redosing. Alcohol increases cardiac toxicity while preventing recognition of dangerous stimulant levels and compulsive behavior.',
        effects: ['Masked stimulant toxicity', 'Fatal redosing cycles', 'Cardiac stress', 'Dehydration'],
        advice: ['Avoid combination', 'Extreme redosing risk', 'Monitor heart rate', 'Have sober supervision']
      },
      '4-mmc+maoi': {
        risk: 'deadly',
        mechanism: '4-MMC with MAOIs creates potentially fatal hypertensive crisis and serotonin syndrome. Cathinone metabolism blocked, causing toxic accumulation and life-threatening interactions.',
        effects: ['Hypertensive crisis', 'Serotonin syndrome', 'Fatal blood pressure spike', 'Brain hemorrhage risk'],
        advice: ['NEVER combine - fatal', 'Wait 2+ weeks after MAOI', 'Emergency medical care', 'Life-threatening interaction']
      },
      '4-mmc+tramadol': {
        risk: 'deadly',
        mechanism: '4-MMC and tramadol create severe serotonin syndrome risk combined with dangerous cardiovascular effects from both substances.',
        effects: ['Serotonin syndrome', 'Seizures', 'Hyperthermia', 'Cardiovascular collapse'],
        advice: ['NEVER combine', 'Fatal serotonin toxicity', 'Seizure risk extreme', 'Emergency care needed']
      },
      '4-mmc+cannabis': {
        risk: 'risky',
        mechanism: '4-MMC and cannabis can increase anxiety and paranoia, while cannabis may mask dangerous stimulant effects, leading to dangerous overuse and compulsive redosing.',
        effects: ['Increased anxiety', 'Paranoia', 'Cardiovascular stress', 'Masked toxicity'],
        advice: ['Use extreme caution', 'Monitor heart rate', 'Avoid high doses', 'Stay hydrated']
      },
      '4-mmc+mdma': {
        risk: 'deadly',
        mechanism: '4-MMC and MDMA create extreme serotonin and dopamine toxicity with severe cardiovascular stress. Both substances are neurotoxic with cardiac dangers and compulsive behavior.',
        effects: ['Severe neurotoxicity', 'Fatal hyperthermia', 'Cardiac arrest', 'Serotonin syndrome'],
        advice: ['NEVER combine', 'Extreme neurotoxicity', 'Fatal overheating risk', 'Emergency medical care']
      },
      '4-mmc+3-mmc': {
        risk: 'deadly',
        mechanism: '4-MMC and 3-MMC create extreme cathinone toxicity with additive cardiovascular effects. Both substances cause uncontrollable redosing and severe addiction.',
        effects: ['Extreme cathinone toxicity', 'Fatal cardiovascular stress', 'Compulsive redosing', 'Hyperthermia'],
        advice: ['NEVER combine cathinones', 'Fatal toxicity certain', 'Cardiovascular overload', 'Emergency medical attention']
      },
      '4-mmc+3-cmc': {
        risk: 'deadly',
        mechanism: '4-MMC and 3-CMC create extreme cathinone toxicity with additive cardiovascular effects. Multiple synthetic cathinones guarantee dangerous toxicity and uncontrollable behavior.',
        effects: ['Extreme cathinone toxicity', 'Fatal cardiovascular stress', 'Compulsive redosing', 'Death'],
        advice: ['NEVER combine cathinones', 'Fatal toxicity guaranteed', 'Multiple organ failure risk', 'Emergency medical care essential']
      },
      '4-mmc+4-cmc': {
        risk: 'deadly',
        mechanism: '4-MMC and 4-CMC create extreme cathinone toxicity with additive cardiovascular effects. Both para-substituted cathinones with extreme addiction potential and cardiac dangers.',
        effects: ['Extreme cathinone toxicity', 'Fatal cardiovascular stress', 'Compulsive redosing', 'Death'],
        advice: ['NEVER combine cathinones', 'Fatal toxicity certain', 'Cardiovascular system failure', 'Emergency medical care required']
      },
      '4-mmc+4-cec': {
        risk: 'deadly',
        mechanism: '4-MMC and 4-CEC create extreme cathinone toxicity with additive cardiovascular effects. Both para-substituted cathinones with unknown toxicity profiles and extreme dangers.',
        effects: ['Extreme cathinone toxicity', 'Fatal cardiovascular stress', 'Unknown organ toxicity', 'Death'],
        advice: ['NEVER combine cathinones', 'Fatal toxicity guaranteed', 'Unknown interaction effects', 'Emergency medical care essential']
      },

      // Hexen (N-Ethylhexedrone) Specific Interactions - Extremely Dangerous Research Chemical
      'hexen+stimulant': {
        risk: 'deadly',
        mechanism: 'Hexen and other stimulants create extreme cardiovascular stress with fatal potential. Hexen is an extremely dangerous research chemical with zero safety data - additional stimulants guarantee life-threatening complications.',
        effects: ['Fatal heart attack risk', 'Extreme hypertension', 'Cardiac arrhythmias', 'Hyperthermia', 'Death'],
        advice: ['NEVER combine stimulants', 'Research chemical danger', 'Emergency medical attention', 'Cardiovascular failure risk']
      },
      'hexen+alcohol': {
        risk: 'dangerous',
        mechanism: 'Hexen and alcohol create dangerous masking effects leading to fatal redosing. Alcohol masks dangerous stimulant toxicity while hexen prevents recognition of alcohol poisoning - extremely dangerous combination.',
        effects: ['Masked stimulant toxicity', 'Fatal redosing cycles', 'Cardiac stress', 'Dehydration', 'Liver toxicity'],
        advice: ['Avoid combination', 'Extreme redosing risk', 'Monitor vital signs', 'Have medical supervision']
      },
      'hexen+maoi': {
        risk: 'deadly',
        mechanism: 'Hexen with MAOIs creates potentially fatal hypertensive crisis. As a research chemical with unknown metabolism, MAOI interactions are completely unpredictable and likely fatal.',
        effects: ['Hypertensive crisis', 'Fatal blood pressure spike', 'Unknown toxic interactions', 'Brain hemorrhage risk'],
        advice: ['NEVER combine - fatal', 'Wait 2+ weeks after MAOI', 'Emergency medical care', 'Life-threatening interaction']
      },
      'hexen+tramadol': {
        risk: 'deadly',
        mechanism: 'Hexen and tramadol create severe cardiovascular stress and potential serotonin syndrome. Both substances lower seizure threshold and create dangerous cardiac effects.',
        effects: ['Serotonin syndrome', 'Seizures', 'Hyperthermia', 'Cardiovascular collapse'],
        advice: ['NEVER combine', 'Fatal interaction potential', 'Seizure risk extreme', 'Emergency care needed']
      },
      'hexen+cannabis': {
        risk: 'risky',
        mechanism: 'Hexen and cannabis can significantly increase anxiety and paranoia, while cannabis may mask dangerous stimulant effects, leading to dangerous overuse and compulsive redosing.',
        effects: ['Extreme anxiety', 'Paranoia', 'Cardiovascular stress', 'Masked toxicity'],
        advice: ['Use extreme caution', 'Monitor heart rate constantly', 'Avoid high doses', 'Stay hydrated']
      },
      'hexen+mdma': {
        risk: 'deadly',
        mechanism: 'Hexen and MDMA create extreme neurotoxicity and cardiovascular stress. Both substances cause severe hyperthermia and cardiac toxicity - combination is potentially fatal.',
        effects: ['Severe neurotoxicity', 'Fatal hyperthermia', 'Cardiac arrest', 'Extreme toxicity'],
        advice: ['NEVER combine', 'Extreme danger', 'Fatal overheating risk', 'Emergency medical care']
      },
      'hexen+3-mmc': {
        risk: 'deadly',
        mechanism: 'Hexen and 3-MMC create extreme cathinone toxicity with additive cardiovascular effects. Both research chemicals with unknown toxicity profiles and extreme addiction potential.',
        effects: ['Extreme cathinone toxicity', 'Fatal cardiovascular stress', 'Compulsive redosing', 'Death'],
        advice: ['NEVER combine cathinones', 'Fatal toxicity certain', 'Cardiovascular overload', 'Emergency medical attention']
      },
      'hexen+3-cmc': {
        risk: 'deadly',
        mechanism: 'Hexen and 3-CMC create extreme cathinone toxicity with additive cardiovascular effects. Multiple research chemical cathinones guarantee dangerous toxicity.',
        effects: ['Extreme cathinone toxicity', 'Fatal cardiovascular stress', 'Compulsive redosing', 'Death'],
        advice: ['NEVER combine cathinones', 'Fatal toxicity guaranteed', 'Multiple organ failure risk', 'Emergency medical care essential']
      },
      'hexen+4-cmc': {
        risk: 'deadly',
        mechanism: 'Hexen and 4-CMC create extreme cathinone toxicity with additive cardiovascular effects. Both dangerous research chemical cathinones with extreme addiction potential.',
        effects: ['Extreme cathinone toxicity', 'Fatal cardiovascular stress', 'Compulsive redosing', 'Death'],
        advice: ['NEVER combine cathinones', 'Fatal toxicity certain', 'Cardiovascular system failure', 'Emergency medical care required']
      },
      'hexen+4-mmc': {
        risk: 'deadly',
        mechanism: 'Hexen and 4-MMC create extreme cathinone toxicity with additive cardiovascular effects. Combination of unknown research chemical with notorious mephedrone creates fatal toxicity.',
        effects: ['Extreme cathinone toxicity', 'Fatal cardiovascular stress', 'Compulsive redosing', 'Death'],
        advice: ['NEVER combine cathinones', 'Fatal toxicity guaranteed', 'Historical and current dangers', 'Emergency medical care essential']
      },
      'hexen+4-cec': {
        risk: 'deadly',
        mechanism: 'Hexen and 4-CEC create extreme cathinone toxicity with additive cardiovascular effects. Both research chemical cathinones with completely unknown safety profiles.',
        effects: ['Extreme cathinone toxicity', 'Fatal cardiovascular stress', 'Unknown organ toxicity', 'Death'],
        advice: ['NEVER combine cathinones', 'Fatal toxicity guaranteed', 'Unknown interaction effects', 'Emergency medical care essential']
      },

      // COMPREHENSIVE PRESCRIPTION MEDICATION INTERACTIONS

      // Antibiotics and Substance Interactions
      'metronidazole+alcohol': {
        risk: 'dangerous',
        mechanism: 'Metronidazole (Flagyl) blocks alcohol metabolism, causing severe disulfiram-like reaction with potentially fatal outcomes.',
        effects: ['Severe nausea and vomiting', 'Facial flushing', 'Rapid heart rate', 'Breathing difficulties', 'Hypotension'],
        advice: ['Never drink alcohol during treatment', 'Reaction can be life-threatening', 'Wait 3 days after stopping metronidazole', 'Emergency care if alcohol consumed']
      },
      'ciprofloxacin+caffeine': {
        risk: 'risky',
        mechanism: 'Ciprofloxacin blocks caffeine metabolism, leading to dangerous caffeine accumulation and toxicity.',
        effects: ['Severe caffeine toxicity', 'Anxiety and panic', 'Rapid heart rate', 'Tremors', 'Insomnia'],
        advice: ['Limit caffeine drastically', 'Monitor for caffeine toxicity', 'Consider switching antibiotics', 'Reduce coffee/energy drinks']
      },
      'clarithromycin+psychedelics': {
        risk: 'risky',
        mechanism: 'Clarithromycin inhibits enzymes that metabolize many substances, potentially causing dangerous accumulation.',
        effects: ['Enhanced psychedelic effects', 'Prolonged duration', 'Increased toxicity risk', 'Unpredictable potentiation'],
        advice: ['Avoid psychedelics during treatment', 'Enzyme inhibition lasts days', 'Unpredictable potentiation', 'Medical consultation required']
      },
      'doxycycline+alcohol': {
        risk: 'risky',
        mechanism: 'Doxycycline with alcohol reduces antibiotic effectiveness and increases side effects.',
        effects: ['Reduced antibiotic effectiveness', 'Increased nausea', 'Liver stress', 'Treatment failure risk'],
        advice: ['Limit alcohol consumption', 'May require longer treatment', 'Monitor for side effects', 'Complete full antibiotic course']
      },

      // Blood Thinners and Substance Interactions
      'warfarin+alcohol': {
        risk: 'dangerous',
        mechanism: 'Alcohol dramatically affects warfarin metabolism, causing dangerous fluctuations in blood clotting.',
        effects: ['Dangerous bleeding', 'Stroke from bleeding', 'INR fluctuations', 'Internal hemorrhage'],
        advice: ['Strictly limit alcohol', 'Frequent INR monitoring', 'Emergency care for bleeding', 'Consistent alcohol intake if any']
      },
      'heparin+nsaids': {
        risk: 'dangerous',
        mechanism: 'NSAIDs with heparin dramatically increase bleeding risk through multiple mechanisms.',
        effects: ['Severe bleeding risk', 'Internal hemorrhage', 'Surgical complications', 'Stroke risk'],
        advice: ['Avoid all NSAIDs', 'Use acetaminophen instead', 'Monitor for bleeding signs', 'Emergency care for bleeding']
      },
      'rivaroxaban+st-johns-wort': {
        risk: 'dangerous',
        mechanism: 'St. John\'s Wort reduces rivaroxaban effectiveness, dramatically increasing stroke and clot risk.',
        effects: ['Reduced anticoagulation', 'Stroke risk', 'Blood clot formation', 'Treatment failure'],
        advice: ['Never combine', 'Stop St. John\'s Wort immediately', 'Monitor for clot symptoms', 'Medical supervision required']
      },
      'apixaban+ginkgo': {
        risk: 'risky',
        mechanism: 'Ginkgo may enhance apixaban\'s anticoagulant effects, increasing bleeding risk.',
        effects: ['Increased bleeding risk', 'Bruising', 'Internal bleeding', 'Surgical complications'],
        advice: ['Avoid ginkgo supplements', 'Monitor for bleeding', 'Stop before surgery', 'Medical consultation needed']
      },

      // Cholesterol Medications
      'atorvastatin+grapefruit': {
        risk: 'dangerous',
        mechanism: 'Grapefruit juice blocks atorvastatin metabolism, causing dangerous drug accumulation and muscle toxicity.',
        effects: ['Severe muscle toxicity', 'Rhabdomyolysis', 'Kidney damage', 'Liver toxicity'],
        advice: ['Never consume grapefruit', 'Monitor for muscle pain', 'Regular liver function tests', 'Emergency care for muscle symptoms']
      },
      'simvastatin+alcohol': {
        risk: 'risky',
        mechanism: 'Alcohol with statins increases liver stress and risk of serious liver damage.',
        effects: ['Liver damage', 'Enhanced side effects', 'Muscle toxicity', 'Liver function abnormalities'],
        advice: ['Limit alcohol consumption', 'Regular liver monitoring', 'Watch for muscle pain', 'Report symptoms immediately']
      },
      'lovastatin+niacin': {
        risk: 'dangerous',
        mechanism: 'High-dose niacin with statins dramatically increases risk of severe muscle breakdown.',
        effects: ['Severe rhabdomyolysis', 'Kidney failure', 'Muscle destruction', 'Life-threatening complications'],
        advice: ['Avoid high-dose niacin', 'Monitor muscle symptoms', 'Regular kidney function tests', 'Emergency care for muscle pain']
      },

      // Immunosuppressants
      'cyclosporine+st-johns-wort': {
        risk: 'deadly',
        mechanism: 'St. John\'s Wort dramatically reduces cyclosporine levels, causing organ rejection in transplant patients.',
        effects: ['Organ rejection', 'Transplant failure', 'Life-threatening complications', 'Treatment failure'],
        advice: ['NEVER combine', 'Immediate medical attention', 'Transplant emergency', 'Stop St. John\'s Wort immediately']
      },
      'tacrolimus+grapefruit': {
        risk: 'dangerous',
        mechanism: 'Grapefruit dramatically increases tacrolimus levels, causing severe toxicity and organ damage.',
        effects: ['Severe tacrolimus toxicity', 'Kidney damage', 'Neurological toxicity', 'Dangerous side effects'],
        advice: ['Never consume grapefruit', 'Monitor drug levels closely', 'Watch for toxicity signs', 'Medical supervision essential']
      },
      'methotrexate+alcohol': {
        risk: 'deadly',
        mechanism: 'Methotrexate with alcohol causes severe liver toxicity that can be fatal.',
        effects: ['Severe liver toxicity', 'Liver failure', 'Death', 'Bone marrow suppression'],
        advice: ['NEVER drink alcohol', 'Regular liver monitoring', 'Fatal liver damage possible', 'Emergency care for symptoms']
      },
      'azathioprine+allopurinol': {
        risk: 'deadly',
        mechanism: 'Allopurinol blocks azathioprine metabolism, causing life-threatening bone marrow toxicity.',
        effects: ['Severe bone marrow suppression', 'Life-threatening infections', 'Bleeding complications', 'Death'],
        advice: ['NEVER combine', 'Dose reduction required if must combine', 'Frequent blood monitoring', 'Medical emergency potential']
      },

      // Migraine Medications
      'sumatriptan+ssris': {
        risk: 'dangerous',
        mechanism: 'Triptans with SSRIs can cause life-threatening serotonin syndrome.',
        effects: ['Serotonin syndrome', 'Hyperthermia', 'Cardiovascular complications', 'Neurological toxicity'],
        advice: ['Monitor for serotonin syndrome', 'Never exceed recommended doses', 'Emergency care for symptoms', 'Medical supervision required']
      },
      'ergotamine+macrolide-antibiotics': {
        risk: 'deadly',
        mechanism: 'Macrolide antibiotics block ergotamine metabolism, causing fatal ergotism.',
        effects: ['Severe vasoconstriction', 'Gangrene', 'Stroke', 'Death', 'Ergotism'],
        advice: ['NEVER combine', 'Fatal vasoconstriction', 'Emergency medical care', 'Life-threatening interaction']
      },
      'rizatriptan+maois': {
        risk: 'deadly',
        mechanism: 'MAOIs with triptans cause dangerous accumulation and severe hypertensive crisis.',
        effects: ['Hypertensive crisis', 'Stroke', 'Brain hemorrhage', 'Death', 'Cardiovascular collapse'],
        advice: ['NEVER combine', 'Wait 2+ weeks after MAOI', 'Fatal blood pressure crisis', 'Emergency care required']
      },

      // Seizure Medications
      'phenytoin+alcohol': {
        risk: 'dangerous',
        mechanism: 'Alcohol reduces phenytoin effectiveness and increases seizure risk while causing dangerous interactions.',
        effects: ['Breakthrough seizures', 'Enhanced alcohol effects', 'Coordination problems', 'Liver toxicity'],
        advice: ['Limit alcohol strictly', 'Monitor seizure control', 'Regular drug level monitoring', 'Avoid binge drinking']
      },
      'lamotrigine+birth-control': {
        risk: 'risky',
        mechanism: 'Birth control pills reduce lamotrigine levels, potentially causing breakthrough seizures.',
        effects: ['Reduced seizure control', 'Breakthrough seizures', 'Mood instability', 'Treatment failure'],
        advice: ['Monitor seizure frequency', 'May need dose adjustment', 'Alternative contraception', 'Neurologist consultation']
      },
      'levetiracetam+alcohol': {
        risk: 'risky',
        mechanism: 'Alcohol with levetiracetam increases sedation and reduces seizure control.',
        effects: ['Increased sedation', 'Reduced seizure control', 'Coordination problems', 'Mood effects'],
        advice: ['Limit alcohol consumption', 'Monitor seizure frequency', 'Watch for excessive sedation', 'Medical guidance needed']
      },

      // DETAILED PSYCHEDELIC INTERACTIONS

      // LSD Specific Interactions
      'lsd+stimulants': {
        risk: 'dangerous',
        mechanism: 'Stimulants with LSD create dangerous cardiovascular stress and increase risk of psychotic episodes.',
        effects: ['Severe cardiovascular stress', 'Psychotic episodes', 'Extreme anxiety', 'Paranoia', 'Cardiac complications'],
        advice: ['Avoid all stimulants', 'High risk of bad trip', 'Cardiovascular monitoring', 'Emergency care for cardiac symptoms']
      },
      'lsd+cannabis': {
        risk: 'moderate',
        mechanism: 'Cannabis significantly intensifies LSD effects and can trigger overwhelming experiences or anxiety.',
        effects: ['Greatly intensified visuals', 'Increased anxiety potential', 'Thought loops', 'Overwhelming experiences'],
        advice: ['Use very small amounts of cannabis', 'May dramatically increase intensity', 'Have CBD available', 'Experienced users only']
      },
      'lsd+alcohol': {
        risk: 'risky',
        mechanism: 'Alcohol can blunt LSD effects while impairing judgment during a psychedelic experience.',
        effects: ['Blunted LSD effects', 'Impaired judgment', 'Nausea', 'Poor decision making'],
        advice: ['Avoid alcohol during trips', 'Impairs harm reduction', 'May waste LSD', 'Stay sober for safety']
      },
      'lsd+dextromethorphan': {
        risk: 'dangerous',
        mechanism: 'DXM with LSD creates dangerous serotonin syndrome risk and unpredictable dissociative-psychedelic interactions.',
        effects: ['Serotonin syndrome', 'Extreme confusion', 'Cardiovascular complications', 'Unpredictable effects'],
        advice: ['NEVER combine', 'Serotonin syndrome risk', 'Emergency care potential', 'Dangerous interaction']
      },
      'lsd+ketamine': {
        risk: 'dangerous',
        mechanism: 'Combining LSD with ketamine creates overwhelming reality dissociation with high risk of psychological trauma.',
        effects: ['Complete reality loss', 'Extreme dissociation', 'High trauma risk', 'Dangerous coordination loss'],
        advice: ['Never combine', 'Extremely overwhelming', 'High psychological trauma risk', 'Physical safety danger']
      },

      // Psilocybin Specific Interactions
      'psilocybin+dextromethorphan': {
        risk: 'dangerous',
        mechanism: 'DXM with psilocybin creates serotonin syndrome risk and dangerous dissociative-psychedelic interactions.',
        effects: ['Serotonin syndrome', 'Extreme confusion', 'Cardiovascular stress', 'Unpredictable psychedelic effects'],
        advice: ['NEVER combine', 'High serotonin syndrome risk', 'Emergency medical care', 'Dangerous interaction']
      },
      'psilocybin+alcohol': {
        risk: 'risky',
        mechanism: 'Alcohol significantly reduces psilocybin effects while impairing judgment and increasing nausea.',
        effects: ['Greatly reduced effects', 'Increased nausea', 'Impaired judgment', 'Wasted experience'],
        advice: ['Avoid alcohol completely', 'Significantly blunts effects', 'Increases nausea', 'Stay sober for safety']
      },
      'psilocybin+stimulants': {
        risk: 'dangerous',
        mechanism: 'Stimulants with psilocybin create cardiovascular stress and increase anxiety/paranoia significantly.',
        effects: ['Severe cardiovascular stress', 'Extreme anxiety', 'Paranoid thoughts', 'Heart rate elevation'],
        advice: ['Avoid all stimulants', 'High anxiety risk', 'Cardiovascular monitoring', 'May trigger panic attacks']
      },
      'psilocybin+ketamine': {
        risk: 'dangerous',
        mechanism: 'Psilocybin with ketamine creates extremely overwhelming dissociative-psychedelic combinations.',
        effects: ['Overwhelming experiences', 'Complete reality loss', 'High trauma potential', 'Dangerous dissociation'],
        advice: ['Never combine', 'Extremely overwhelming', 'High psychological risk', 'Physical safety danger']
      },

      // DMT Specific Interactions
      'dmt+maois': {
        risk: 'deadly',
        mechanism: 'DMT with pharmaceutical MAOIs creates extreme and potentially fatal potentiation and serotonin syndrome.',
        effects: ['Extreme potentiation', 'Fatal serotonin syndrome', 'Cardiovascular collapse', 'Death', 'Hyperthermia'],
        advice: ['NEVER combine with pharmaceutical MAOIs', 'Fatal interaction', 'Emergency medical care', 'Traditional ayahuasca only uses plant MAOIs']
      },
      'dmt+ssris': {
        risk: 'risky',
        mechanism: 'SSRIs may significantly reduce DMT effects and create unpredictable serotonin interactions.',
        effects: ['Greatly reduced effects', 'Unpredictable interactions', 'Possible serotonin effects', 'Wasted substance'],
        advice: ['Taper SSRIs before use', 'Significantly reduced effects likely', 'Consult physician', 'May be completely ineffective']
      },
      'dmt+stimulants': {
        risk: 'dangerous',
        mechanism: 'Stimulants with DMT create dangerous cardiovascular stress during intense psychedelic experiences.',
        effects: ['Severe cardiovascular stress', 'Extreme anxiety', 'Panic reactions', 'Heart complications'],
        advice: ['Avoid all stimulants', 'High cardiovascular risk', 'May trigger panic', 'Emergency care for cardiac symptoms']
      },

      // Mescaline Specific Interactions
      'mescaline+maois': {
        risk: 'deadly',
        mechanism: 'MAOIs with mescaline create potentially fatal potentiation and serotonin syndrome.',
        effects: ['Extreme potentiation', 'Serotonin syndrome', 'Hyperthermia', 'Cardiovascular collapse'],
        advice: ['NEVER combine', 'Fatal interaction potential', 'Emergency medical care', 'Life-threatening combination']
      },
      'mescaline+stimulants': {
        risk: 'dangerous',
        mechanism: 'Stimulants with mescaline create dangerous cardiovascular stress and worsen body load.',
        effects: ['Severe cardiovascular stress', 'Worsened body load', 'Extreme discomfort', 'Cardiac complications'],
        advice: ['Avoid all stimulants', 'Body load becomes unbearable', 'Cardiovascular monitoring', 'High discomfort risk']
      },
      'mescaline+alcohol': {
        risk: 'risky',
        mechanism: 'Alcohol reduces mescaline effects while increasing nausea and dehydration during long experiences.',
        effects: ['Reduced mescaline effects', 'Increased nausea', 'Dehydration', 'Longer come-up'],
        advice: ['Avoid alcohol', 'Increases nausea significantly', 'Dehydration risk', 'May prolong uncomfortable come-up']
      },

      // Ayahuasca Specific Interactions
      'ayahuasca+ssris': {
        risk: 'deadly',
        mechanism: 'Ayahuasca contains MAOIs that create fatal serotonin syndrome with SSRIs.',
        effects: ['Fatal serotonin syndrome', 'Hyperthermia', 'Cardiovascular collapse', 'Death'],
        advice: ['NEVER combine', 'Taper SSRIs weeks before', 'Fatal interaction', 'Medical supervision for tapering']
      },
      'ayahuasca+stimulants': {
        risk: 'deadly',
        mechanism: 'Ayahuasca MAOIs with stimulants create fatal hypertensive crisis and cardiovascular collapse.',
        effects: ['Hypertensive crisis', 'Stroke', 'Brain hemorrhage', 'Death', 'Cardiovascular collapse'],
        advice: ['NEVER combine', 'Fatal blood pressure crisis', 'Emergency medical care', 'Life-threatening interaction']
      },
      'ayahuasca+tramadol': {
        risk: 'deadly',
        mechanism: 'Ayahuasca MAOIs with tramadol create fatal serotonin syndrome and seizure risk.',
        effects: ['Fatal serotonin syndrome', 'Seizures', 'Hyperthermia', 'Death'],
        advice: ['NEVER combine', 'Fatal interaction', 'Emergency medical care', 'Stop tramadol weeks before']
      },
      'ayahuasca+dextromethorphan': {
        risk: 'deadly',
        mechanism: 'Ayahuasca MAOIs with DXM create fatal serotonin syndrome and extreme toxicity.',
        effects: ['Fatal serotonin syndrome', 'Extreme toxicity', 'Hyperthermia', 'Death'],
        advice: ['NEVER combine', 'Fatal interaction', 'Emergency medical care', 'Check all cough medicines']
      },

      // KETAMINE AND DISSOCIATIVE INTERACTIONS

      // Ketamine Specific Interactions
      'ketamine+opioids': {
        risk: 'deadly',
        mechanism: 'Ketamine with opioids creates dangerous respiratory depression and cardiovascular complications.',
        effects: ['Severe respiratory depression', 'Cardiovascular complications', 'Loss of consciousness', 'Death'],
        advice: ['NEVER combine', 'Fatal respiratory depression', 'Emergency medical care', 'High death risk']
      },
      'ketamine+gabapentin': {
        risk: 'dangerous',
        mechanism: 'Gabapentin enhances ketamine\'s dissociative effects and increases risk of dangerous sedation.',
        effects: ['Enhanced dissociation', 'Dangerous sedation', 'Respiratory depression', 'Loss of consciousness'],
        advice: ['Dangerous combination', 'Enhanced dissociative effects', 'Respiratory monitoring', 'High injury risk']
      },
      'ketamine+pregabalin': {
        risk: 'dangerous',
        mechanism: 'Pregabalin significantly enhances ketamine effects, creating dangerous levels of sedation.',
        effects: ['Extreme sedation', 'Enhanced dissociation', 'Respiratory depression', 'High injury risk'],
        advice: ['Very dangerous combination', 'Extreme sedation risk', 'Respiratory monitoring', 'Avoid combination']
      },
      'ketamine+muscle-relaxants': {
        risk: 'deadly',
        mechanism: 'Muscle relaxants with ketamine create severe CNS depression and respiratory failure.',
        effects: ['Severe CNS depression', 'Respiratory failure', 'Muscle weakness', 'Death'],
        advice: ['NEVER combine', 'Fatal respiratory depression', 'Emergency medical care', 'High death risk']
      },

      // DXM Specific Interactions
      'dxm+ssris': {
        risk: 'deadly',
        mechanism: 'DXM with SSRIs creates severe serotonin syndrome that can be fatal.',
        effects: ['Severe serotonin syndrome', 'Hyperthermia', 'Cardiovascular collapse', 'Death'],
        advice: ['NEVER combine', 'Fatal serotonin syndrome', 'Emergency medical care', 'Life-threatening interaction']
      },
      'dxm+alcohol': {
        risk: 'deadly',
        mechanism: 'DXM with alcohol creates dangerous respiratory depression and liver toxicity.',
        effects: ['Severe respiratory depression', 'Liver toxicity', 'Loss of consciousness', 'Death'],
        advice: ['NEVER combine', 'Fatal respiratory depression', 'Emergency medical care', 'High death risk']
      },
      'dxm+opioids': {
        risk: 'deadly',
        mechanism: 'DXM with opioids creates severe respiratory depression through multiple mechanisms.',
        effects: ['Severe respiratory depression', 'CNS depression', 'Coma', 'Death'],
        advice: ['NEVER combine', 'Fatal respiratory failure', 'Emergency medical care', 'Multiple depression pathways']
      },
      'dxm+gabapentin': {
        risk: 'dangerous',
        mechanism: 'Gabapentin enhances DXM\'s dissociative effects and increases sedation risk.',
        effects: ['Enhanced dissociation', 'Dangerous sedation', 'Respiratory effects', 'Loss of coordination'],
        advice: ['Dangerous combination', 'Enhanced effects', 'Monitor breathing', 'High injury risk']
      },

      // PCP Specific Interactions
      'pcp+alcohol': {
        risk: 'deadly',
        mechanism: 'PCP with alcohol creates extreme impairment, respiratory depression, and violence risk.',
        effects: ['Extreme impairment', 'Respiratory depression', 'Violence risk', 'Death', 'Complete loss of control'],
        advice: ['NEVER combine', 'Extreme danger to self and others', 'Fatal respiratory depression', 'Emergency care required']
      },
      'pcp+stimulants': {
        risk: 'deadly',
        mechanism: 'PCP with stimulants creates extreme agitation, hyperthermia, and cardiovascular crisis.',
        effects: ['Extreme agitation', 'Fatal hyperthermia', 'Cardiovascular crisis', 'Violence', 'Death'],
        advice: ['NEVER combine', 'Extreme danger', 'Fatal hyperthermia', 'Law enforcement/medical emergency']
      },
      'pcp+depressants': {
        risk: 'deadly',
        mechanism: 'PCP with depressants creates unpredictable and often fatal CNS depression.',
        effects: ['Unpredictable CNS depression', 'Respiratory failure', 'Coma', 'Death'],
        advice: ['NEVER combine', 'Unpredictable fatal effects', 'Emergency medical care', 'High death risk']
      },

      // MDMA AND EMPATHOGEN INTERACTIONS

      // MDMA Specific Interactions
      'mdma+phenelzine': {
        risk: 'deadly',
        mechanism: 'MDMA with phenelzine (MAOI) creates fatal serotonin syndrome and hypertensive crisis.',
        effects: ['Fatal serotonin syndrome', 'Hypertensive crisis', 'Hyperthermia', 'Death'],
        advice: ['NEVER combine', 'Fatal interaction', 'Emergency medical care', 'Wait 2+ weeks after MAOI']
      },
      'mdma+venlafaxine': {
        risk: 'dangerous',
        mechanism: 'MDMA with venlafaxine (SNRI) blocks MDMA effects and creates serotonin syndrome risk.',
        effects: ['Blocked MDMA effects', 'Serotonin syndrome risk', 'Wasted substance', 'Dangerous interaction'],
        advice: ['MDMA will not work', 'Dangerous serotonin risk', 'Taper medication first', 'Medical supervision']
      },
      'mdma+duloxetine': {
        risk: 'dangerous',
        mechanism: 'MDMA with duloxetine blocks effects and creates serotonin syndrome risk.',
        effects: ['Completely blocked effects', 'Serotonin syndrome risk', 'Wasted MDMA', 'Dangerous interaction'],
        advice: ['MDMA will be ineffective', 'Serotonin syndrome danger', 'Taper medication weeks before', 'Psychiatric consultation']
      },
      'mdma+ritonavir': {
        risk: 'deadly',
        mechanism: 'Ritonavir blocks MDMA metabolism, causing dangerous accumulation and toxicity.',
        effects: ['Dangerous MDMA accumulation', 'Extreme toxicity', 'Hyperthermia', 'Death'],
        advice: ['NEVER combine', 'Dangerous drug accumulation', 'Fatal toxicity risk', 'Emergency medical care']
      },
      'mdma+hypertension-medications': {
        risk: 'dangerous',
        mechanism: 'MDMA\'s cardiovascular effects conflict with blood pressure medications, creating dangerous fluctuations.',
        effects: ['Dangerous blood pressure changes', 'Cardiovascular stress', 'Medication ineffectiveness', 'Cardiac complications'],
        advice: ['Avoid MDMA with heart medications', 'Dangerous cardiovascular effects', 'Medical supervision required', 'Monitor blood pressure']
      },

      // MDA Specific Interactions
      'mda+ssris': {
        risk: 'dangerous',
        mechanism: 'MDA with SSRIs creates serotonin syndrome risk and blocks empathogenic effects.',
        effects: ['Serotonin syndrome risk', 'Blocked empathogenic effects', 'Wasted substance', 'Dangerous interaction'],
        advice: ['Dangerous serotonin interaction', 'Effects will be blocked', 'Taper SSRIs first', 'Medical supervision']
      },
      'mda+stimulants': {
        risk: 'dangerous',
        mechanism: 'MDA with other stimulants creates extreme cardiovascular stress and hyperthermia.',
        effects: ['Extreme cardiovascular stress', 'Fatal hyperthermia', 'Cardiac complications', 'Death risk'],
        advice: ['NEVER combine stimulants', 'Fatal cardiovascular risk', 'Emergency medical care', 'Extreme hyperthermia danger']
      },

      // COMPREHENSIVE CANNABIS INTERACTIONS

      // THC with Prescription Medications
      'thc+warfarin': {
        risk: 'risky',
        mechanism: 'THC may affect warfarin metabolism and increase bleeding risk.',
        effects: ['Possible increased bleeding', 'INR fluctuations', 'Anticoagulation changes'],
        advice: ['Monitor INR closely', 'Inform prescriber of cannabis use', 'Watch for bleeding signs', 'Consistent use patterns']
      },
      'thc+seizure-medications': {
        risk: 'moderate',
        mechanism: 'THC may interact with seizure medications and affect seizure control.',
        effects: ['Possible seizure threshold changes', 'Medication interactions', 'Altered seizure control'],
        advice: ['Monitor seizure frequency', 'Inform neurologist', 'Medical supervision advised', 'Track usage patterns']
      },
      'thc+blood-pressure-medications': {
        risk: 'risky',
        mechanism: 'THC can cause blood pressure changes that interact with hypertension medications.',
        effects: ['Blood pressure fluctuations', 'Medication effectiveness changes', 'Cardiovascular effects'],
        advice: ['Monitor blood pressure regularly', 'Inform cardiologist', 'Watch for dizziness', 'Medical supervision']
      },
      'thc+diabetes-medications': {
        risk: 'moderate',
        mechanism: 'THC may affect blood sugar levels and interact with diabetes medications.',
        effects: ['Blood sugar changes', 'Increased appetite effects', 'Medication timing issues'],
        advice: ['Monitor blood sugar closely', 'Account for increased appetite', 'Inform endocrinologist', 'Timing considerations']
      },

      // CBD Specific Interactions
      'cbd+epilepsy-medications': {
        risk: 'moderate',
        mechanism: 'CBD can increase levels of some epilepsy medications, requiring dose adjustments.',
        effects: ['Increased medication levels', 'Enhanced side effects', 'Possible toxicity'],
        advice: ['Medical supervision required', 'Drug level monitoring', 'Dose adjustments needed', 'Neurologist consultation']
      },
      'cbd+blood-thinners': {
        risk: 'risky',
        mechanism: 'CBD may enhance anticoagulant effects, increasing bleeding risk.',
        effects: ['Increased bleeding risk', 'Enhanced anticoagulation', 'Bruising'],
        advice: ['Monitor for bleeding', 'INR monitoring', 'Medical supervision', 'Report bleeding signs']
      },
      'cbd+liver-medications': {
        risk: 'risky',
        mechanism: 'CBD is metabolized by liver enzymes and may interact with other liver-processed medications.',
        effects: ['Altered medication levels', 'Liver enzyme effects', 'Drug interactions'],
        advice: ['Liver function monitoring', 'Medical supervision', 'Drug level monitoring', 'Hepatologist consultation']
      },

      // STIMULANT MEDICATION INTERACTIONS

      // Methylphenidate (Ritalin) Interactions
      'methylphenidate+antidepressants': {
        risk: 'risky',
        mechanism: 'Methylphenidate with certain antidepressants may cause dangerous cardiovascular effects.',
        effects: ['Increased blood pressure', 'Cardiovascular stress', 'Enhanced side effects'],
        advice: ['Medical supervision required', 'Monitor blood pressure', 'Cardiovascular assessment', 'Dose adjustments needed']
      },
      'methylphenidate+cold-medications': {
        risk: 'dangerous',
        mechanism: 'Methylphenidate with decongestants creates dangerous cardiovascular overstimulation.',
        effects: ['Severe hypertension', 'Cardiovascular crisis', 'Stroke risk', 'Heart attack risk'],
        advice: ['Avoid all decongestants', 'Check all cold medicines', 'Cardiovascular emergency risk', 'Medical supervision']
      },

      // Amphetamine (Adderall) Interactions
      'amphetamine+antacids': {
        risk: 'risky',
        mechanism: 'Antacids increase amphetamine absorption, leading to enhanced effects and toxicity.',
        effects: ['Enhanced amphetamine effects', 'Increased toxicity', 'Prolonged duration'],
        advice: ['Avoid antacids near dose time', 'Space doses apart', 'Monitor for increased effects', 'Medical guidance']
      },
      'amphetamine+vitamin-c': {
        risk: 'moderate',
        mechanism: 'Vitamin C reduces amphetamine absorption and effectiveness.',
        effects: ['Reduced medication effectiveness', 'Shorter duration', 'Treatment failure'],
        advice: ['Avoid vitamin C near dose time', 'Space supplements apart', 'Monitor effectiveness', 'Timing considerations']
      },

      // OPIOID INTERACTION COMBINATIONS

      // Morphine Interactions
      'morphine+cimetidine': {
        risk: 'dangerous',
        mechanism: 'Cimetidine blocks morphine metabolism, causing dangerous accumulation.',
        effects: ['Dangerous morphine accumulation', 'Enhanced respiratory depression', 'Prolonged effects', 'Overdose risk'],
        advice: ['Avoid cimetidine', 'Use alternative H2 blocker', 'Monitor breathing', 'Dose reduction needed']
      },
      'morphine+muscle-relaxants': {
        risk: 'deadly',
        mechanism: 'Morphine with muscle relaxants creates severe CNS depression and respiratory failure.',
        effects: ['Severe respiratory depression', 'CNS depression', 'Coma', 'Death'],
        advice: ['NEVER combine', 'Fatal respiratory failure', 'Emergency medical care', 'High death risk']
      },

      // Oxycodone Interactions
      'oxycodone+grapefruit': {
        risk: 'dangerous',
        mechanism: 'Grapefruit juice blocks oxycodone metabolism, causing dangerous accumulation.',
        effects: ['Dangerous oxycodone accumulation', 'Enhanced respiratory depression', 'Overdose risk'],
        advice: ['Never consume grapefruit', 'Dangerous accumulation', 'Monitor breathing', 'Overdose risk increased']
      },
      'oxycodone+antihistamines': {
        risk: 'dangerous',
        mechanism: 'Antihistamines enhance oxycodone\'s sedative and respiratory depressant effects.',
        effects: ['Enhanced respiratory depression', 'Severe sedation', 'Loss of consciousness', 'Overdose risk'],
        advice: ['Avoid all antihistamines', 'Including Benadryl', 'High overdose risk', 'Monitor breathing']
      },

      // NOVEL PSYCHOACTIVE SUBSTANCES (NPS)

      // NBOMe Series Interactions
      'nbome+stimulants': {
        risk: 'deadly',
        mechanism: 'NBOMe compounds are already deadly alone; stimulants create fatal cardiovascular crisis.',
        effects: ['Fatal cardiovascular crisis', 'Extreme hypertension', 'Stroke', 'Death', 'Cardiac arrest'],
        advice: ['NEVER combine - often fatal', 'NBOMe alone is deadly', 'Emergency medical care', 'Avoid NBOMe entirely']
      },
      'nbome+depressants': {
        risk: 'deadly',
        mechanism: 'NBOMe\'s cardiovascular toxicity with depressants creates unpredictable fatal complications.',
        effects: ['Unpredictable fatal effects', 'Cardiovascular collapse', 'Respiratory depression', 'Death'],
        advice: ['NEVER combine', 'Unpredictable fatal reactions', 'Emergency medical care', 'Avoid NBOMe compounds']
      },
      'nbome+cannabis': {
        risk: 'deadly',
        mechanism: 'Even cannabis with NBOMe can trigger fatal seizures and cardiovascular complications.',
        effects: ['Fatal seizures', 'Cardiovascular crisis', 'Death', 'Unpredictable toxicity'],
        advice: ['NO safe combinations with NBOMe', 'Fatal even with cannabis', 'Avoid NBOMe entirely', 'Emergency care essential']
      },

      // Synthetic Cannabinoid Interactions
      'spice+alcohol': {
        risk: 'deadly',
        mechanism: 'Synthetic cannabinoids with alcohol create unpredictable and often fatal reactions.',
        effects: ['Unpredictable fatal reactions', 'Severe psychosis', 'Respiratory depression', 'Death'],
        advice: ['NEVER combine', 'Unpredictable toxicity', 'Emergency medical care', 'Avoid synthetic cannabinoids']
      },
      'k2+stimulants': {
        risk: 'deadly',
        mechanism: 'K2/Spice with stimulants creates fatal seizures and cardiovascular complications.',
        effects: ['Fatal seizures', 'Cardiovascular crisis', 'Extreme agitation', 'Death'],
        advice: ['NEVER combine', 'Fatal seizure risk', 'Emergency medical care', 'Avoid synthetic cannabinoids']
      },

      // COMPREHENSIVE HERB AND SUPPLEMENT INTERACTIONS

      // St. John's Wort Interactions
      'st-johns-wort+ssris': {
        risk: 'dangerous',
        mechanism: 'St. John\'s Wort with SSRIs creates dangerous serotonin syndrome.',
        effects: ['Serotonin syndrome', 'Hyperthermia', 'Cardiovascular complications', 'Neurological effects'],
        advice: ['NEVER combine', 'Serotonin syndrome risk', 'Medical supervision required', 'Taper one before starting other']
      },
      'st-johns-wort+heart-medications': {
        risk: 'dangerous',
        mechanism: 'St. John\'s Wort reduces effectiveness of many heart medications.',
        effects: ['Reduced medication effectiveness', 'Cardiovascular complications', 'Treatment failure'],
        advice: ['Avoid combination', 'Inform cardiologist', 'Monitor heart function', 'Alternative treatments needed']
      },

      // Kava Interactions
      'kava+hepatotoxic-medications': {
        risk: 'dangerous',
        mechanism: 'Kava with liver-toxic medications creates severe liver damage risk.',
        effects: ['Severe liver damage', 'Liver failure', 'Hepatotoxicity', 'Jaundice'],
        advice: ['Avoid combination', 'Liver function monitoring', 'Medical supervision', 'Alternative treatments']
      },
      'kava+acetaminophen': {
        risk: 'dangerous',
        mechanism: 'Kava with acetaminophen creates enhanced liver toxicity risk.',
        effects: ['Enhanced liver toxicity', 'Liver damage', 'Hepatic complications'],
        advice: ['Avoid combination', 'Use alternative pain relief', 'Liver monitoring', 'Medical consultation']
      },

      // FOOD AND SUBSTANCE INTERACTIONS

      // Tyramine-Rich Foods with MAOIs
      'aged-cheese+maois': {
        risk: 'deadly',
        mechanism: 'Tyramine in aged cheese with MAOIs causes fatal hypertensive crisis.',
        effects: ['Hypertensive crisis', 'Stroke', 'Brain hemorrhage', 'Death'],
        advice: ['NEVER consume aged cheese', 'Fatal blood pressure crisis', 'Emergency medical care', 'Strict dietary restrictions']
      },
      'cured-meats+maois': {
        risk: 'deadly',
        mechanism: 'Tyramine in cured meats with MAOIs creates life-threatening blood pressure spikes.',
        effects: ['Fatal hypertensive crisis', 'Stroke', 'Brain hemorrhage', 'Death'],
        advice: ['NEVER consume cured meats', 'Life-threatening interaction', 'Emergency care', 'Strict dietary compliance']
      },
      'red-wine+maois': {
        risk: 'deadly',
        mechanism: 'Tyramine in red wine with MAOIs causes fatal hypertensive reactions.',
        effects: ['Fatal hypertensive crisis', 'Stroke', 'Cardiovascular collapse', 'Death'],
        advice: ['NEVER consume red wine', 'Fatal blood pressure spike', 'Emergency medical care', 'All alcohol dangerous']
      },

      // EXPANDED DEADLY COMBINATIONS

      // Tramadol Deadly Combinations
      'tramadol+ssris': {
        risk: 'deadly',
        mechanism: 'Tramadol inhibits serotonin reuptake and combined with SSRIs can cause fatal serotonin syndrome.',
        effects: ['Serotonin syndrome', 'Hyperthermia', 'Seizures', 'Cardiac arrhythmias', 'Death'],
        advice: ['NEVER combine', 'Seek immediate emergency care', 'Serotonin syndrome is medical emergency', 'May require ICU care']
      },
      'tramadol+maois': {
        risk: 'deadly',
        mechanism: 'MAOIs dramatically increase serotonin syndrome risk with tramadol\'s dual mechanism.',
        effects: ['Severe serotonin syndrome', 'Fatal hyperthermia', 'Seizures', 'Cardiovascular collapse', 'Death'],
        advice: ['Absolutely contraindicated', 'Wait 14 days after MAOI discontinuation', 'Emergency medical care if combined', 'Fatal interaction']
      },
      'tramadol+dextromethorphan': {
        risk: 'deadly',
        mechanism: 'Both substances affect serotonin and can cause fatal serotonin syndrome together.',
        effects: ['Serotonin syndrome', 'Seizures', 'Hyperthermia', 'Cardiac complications', 'Death'],
        advice: ['NEVER combine', 'Check cough medicine ingredients', 'Seek emergency care', 'Life-threatening interaction']
      },

      // Xylazine (Tranq) Deadly Combinations
      'xylazine+heroin': {
        risk: 'deadly',
        mechanism: 'Xylazine makes opioid overdoses much more difficult to reverse and increases necrosis risk.',
        effects: ['Naloxone-resistant overdose', 'Severe skin necrosis', 'Respiratory failure', 'Death', 'Zombie drug effects'],
        advice: ['Extremely dangerous combination', 'Naloxone less effective', 'Multiple naloxone doses needed', 'Immediate emergency care']
      },
      'xylazine+fentanyl': {
        risk: 'deadly',
        mechanism: 'Creates naloxone-resistant overdoses with severe tissue death and respiratory depression.',
        effects: ['Naloxone-resistant overdose', 'Severe necrosis', 'Respiratory failure', 'Prolonged unconsciousness', 'Death'],
        advice: ['Life-threatening combination', 'Give naloxone anyway', 'Call 911 immediately', 'Tissue death common']
      },
      'xylazine+alcohol': {
        risk: 'deadly',
        mechanism: 'Both are CNS depressants creating dangerous respiratory depression that naloxone cannot reverse.',
        effects: ['Severe respiratory depression', 'Prolonged unconsciousness', 'Skin necrosis', 'Death'],
        advice: ['NEVER combine', 'Naloxone ineffective for xylazine', 'Emergency medical care', 'Multiple organ failure risk']
      },

      // U-47700 (Pink) Deadly Combinations
      'u-47700+alcohol': {
        risk: 'deadly',
        mechanism: 'U-47700 is an extremely potent synthetic opioid that causes fatal respiratory depression with alcohol.',
        effects: ['Immediate respiratory failure', 'Cardiac arrest', 'Death within minutes', 'Naloxone resistance'],
        advice: ['Extremely lethal combination', 'Call 911 immediately', 'Multiple naloxone doses', 'Often fatal']
      },
      'u-47700+benzodiazepines': {
        risk: 'deadly',
        mechanism: 'Synthetic opioid with benzodiazepines creates nearly certain fatal respiratory depression.',
        effects: ['Respiratory arrest', 'Coma', 'Death', 'Prolonged unconsciousness'],
        advice: ['Almost always fatal', 'Emergency medical care', 'Multiple antidotes needed', 'ICU level care required']
      },
      'u-47700+anything': {
        risk: 'deadly',
        mechanism: 'U-47700 is so potent that any additional CNS depressant makes overdose extremely likely.',
        effects: ['Fatal overdose', 'Respiratory failure', 'Cardiac arrest', 'Death'],
        advice: ['Never combine with ANYTHING', 'Emergency only drug', 'Fatal with any depressant', 'Avoid completely']
      },

      // NBOMe Deadly Combinations
      'nbome+stimulants': {
        risk: 'deadly',
        mechanism: 'NBOMe with stimulants causes fatal seizures, hyperthermia, and cardiovascular collapse.',
        effects: ['Fatal seizures', 'Extreme hyperthermia', 'Heart attack', 'Stroke', 'Death'],
        advice: ['NEVER combine', 'Often fatal', 'Emergency medical care', 'Test substances before use']
      },
      'nbome+mdma': {
        risk: 'deadly',
        mechanism: 'NBOMe sold as LSD combined with MDMA causes fatal hyperthermia and seizures.',
        effects: ['Fatal hyperthermia', 'Seizures', 'Cardiac arrest', 'Multi-organ failure', 'Death'],
        advice: ['Extremely dangerous', 'Test all substances', 'Emergency care needed', 'Often lethal combination']
      },
      'nbome+amphetamine': {
        risk: 'deadly',
        mechanism: 'NBOMe\'s stimulant properties with amphetamines cause fatal cardiovascular events.',
        effects: ['Heart attack', 'Stroke', 'Fatal arrhythmias', 'Hyperthermia', 'Death'],
        advice: ['Fatal combination', 'Cardiovascular emergency', 'Call 911', 'Never combine']
      },
      'nbome+caffeine': {
        risk: 'deadly',
        mechanism: 'Even caffeine with NBOMe can trigger fatal seizures and cardiovascular collapse.',
        effects: ['Fatal seizures', 'Heart attack', 'Stroke', 'Hyperthermia', 'Death'],
        advice: ['Avoid all stimulants', 'Even caffeine dangerous', 'Emergency care', 'Test all psychedelics']
      },

      // More MAOI Deadly Combinations
      'maois+tyramine-foods': {
        risk: 'deadly',
        mechanism: 'Tyramine in aged foods causes hypertensive crisis with MAOIs that can be fatal.',
        effects: ['Hypertensive crisis', 'Stroke', 'Brain hemorrhage', 'Cardiac complications', 'Death'],
        advice: ['Strict dietary restrictions', 'Avoid aged cheeses, wines, meats', 'Medical emergency if symptoms', 'Know food restrictions']
      },
      'maois+over-the-counter-drugs': {
        risk: 'deadly',
        mechanism: 'Many OTC drugs contain sympathomimetics that cause fatal reactions with MAOIs.',
        effects: ['Hypertensive emergency', 'Stroke', 'Heart attack', 'Death'],
        advice: ['Check ALL medications', 'Avoid decongestants', 'Read labels carefully', 'Medical supervision']
      },
      'maois+st-johns-wort': {
        risk: 'deadly',
        mechanism: 'St. John\'s Wort acts as an MAOI and creates dangerous serotonin syndrome when combined.',
        effects: ['Severe serotonin syndrome', 'Hyperthermia', 'Seizures', 'Death'],
        advice: ['NEVER combine', 'Natural doesn\'t mean safe', 'Serotonin emergency', 'Check herbal supplements']
      },

      // DANGEROUS COMBINATIONS (High Risk)

      // Cocaine Dangerous Combinations
      'cocaine+sildenafil': {
        risk: 'dangerous',
        mechanism: 'Cocaine with Viagra causes dangerous cardiovascular interactions and prolonged erections.',
        effects: ['Dangerous hypotension', 'Cardiovascular stress', 'Priapism', 'Heart attack risk', 'Stroke risk'],
        advice: ['High cardiovascular risk', 'Monitor heart rate/BP', 'Seek medical care for priapism', 'Avoid combination']
      },
      'cocaine+nitroglycerin': {
        risk: 'dangerous',
        mechanism: 'Cocaine blocks sodium channels while nitroglycerin affects nitric oxide, creating cardiovascular chaos.',
        effects: ['Severe hypotension', 'Cardiovascular collapse', 'Paradoxical chest pain', 'Heart attack'],
        advice: ['Medical emergency', 'Inform emergency responders', 'Dangerous interaction', 'ICU monitoring needed']
      },
      'cocaine+propranolol': {
        risk: 'dangerous',
        mechanism: 'Beta-blockers with cocaine can cause unopposed alpha stimulation and severe hypertension.',
        effects: ['Severe hypertension', 'Stroke risk', 'Cardiovascular emergency', 'Paradoxical effects'],
        advice: ['Dangerous cardiovascular effects', 'Emergency medical care', 'Inform about cocaine use', 'Monitor blood pressure']
      },

      // Methamphetamine Dangerous Combinations
      'methamphetamine+antidepressants': {
        risk: 'dangerous',
        mechanism: 'Methamphetamine with antidepressants can cause serotonin syndrome and cardiovascular complications.',
        effects: ['Serotonin syndrome risk', 'Severe hypertension', 'Hyperthermia', 'Cardiac arrhythmias'],
        advice: ['High risk combination', 'Monitor for serotonin syndrome', 'Cardiovascular monitoring', 'Medical supervision']
      },
      'methamphetamine+anesthetics': {
        risk: 'dangerous',
        mechanism: 'Methamphetamine interferes with anesthetics and causes dangerous cardiovascular effects during surgery.',
        effects: ['Anesthetic complications', 'Severe hypertension', 'Cardiac arrhythmias', 'Surgical complications'],
        advice: ['Inform anesthesiologist', 'Surgery postponement needed', 'Medical emergency potential', 'Honest disclosure essential']
      },
      'methamphetamine+ephedrine': {
        risk: 'dangerous',
        mechanism: 'Combining stimulants dramatically increases cardiovascular stress and hyperthermia risk.',
        effects: ['Severe cardiovascular stress', 'Fatal hyperthermia', 'Heart attack', 'Stroke', 'Seizures'],
        advice: ['Extremely dangerous', 'High overdose risk', 'Cardiovascular emergency', 'Avoid all stimulant combinations']
      },

      // Ketamine Dangerous Combinations
      'ketamine+tramadol': {
        risk: 'dangerous',
        mechanism: 'Both affect NMDA receptors and serotonin, potentially causing dangerous interactions.',
        effects: ['Enhanced dissociation', 'Serotonin effects', 'Respiratory depression', 'Confusion'],
        advice: ['Dangerous combination', 'Monitor breathing', 'Enhanced dissociative effects', 'Medical supervision']
      },
      'ketamine+dxm': {
        risk: 'dangerous',
        mechanism: 'Both are NMDA antagonists that can cause dangerous levels of dissociation and confusion.',
        effects: ['Extreme dissociation', 'Complete loss of reality', 'Dangerous behavior', 'Injury risk'],
        advice: ['Very dangerous combination', 'Complete reality disconnect', 'Constant supervision needed', 'High injury risk']
      },
      'ketamine+pcp': {
        risk: 'dangerous',
        mechanism: 'Two powerful dissociatives create extremely dangerous levels of dissociation and unpredictable behavior.',
        effects: ['Extreme dissociation', 'Violent behavior', 'Complete reality loss', 'Severe injury risk'],
        advice: ['Extremely dangerous', 'Unpredictable violent behavior', 'Constant restraint may be needed', 'Emergency care']
      },

      // DXM Dangerous Combinations
      'dxm+alcohol': {
        risk: 'dangerous',
        mechanism: 'DXM with alcohol causes dangerous respiratory depression and liver toxicity from acetaminophen.',
        effects: ['Respiratory depression', 'Liver damage', 'Extreme sedation', 'Nausea/vomiting'],
        advice: ['High respiratory risk', 'Check for acetaminophen', 'Monitor breathing', 'Recovery position']
      },
      'dxm+grapefruit': {
        risk: 'dangerous',
        mechanism: 'Grapefruit inhibits enzymes that break down DXM, causing dangerous overdose levels.',
        effects: ['DXM overdose', 'Extreme dissociation', 'Serotonin syndrome', 'Dangerous behavior'],
        advice: ['Avoid grapefruit completely', 'Can cause accidental overdose', 'Monitor for overdose signs', 'Dangerous potentiation']
      },

      // Cannabis Dangerous Combinations
      'thc+warfarin': {
        risk: 'dangerous',
        mechanism: 'THC may enhance anticoagulant effects and increase bleeding risk significantly.',
        effects: ['Increased bleeding risk', 'Enhanced anticoagulation', 'Bruising', 'Internal bleeding'],
        advice: ['Monitor INR closely', 'Watch for bleeding signs', 'Medical supervision', 'Dose adjustments needed']
      },
      'thc+lithium': {
        risk: 'dangerous',
        mechanism: 'Cannabis may increase lithium levels and cause lithium toxicity.',
        effects: ['Lithium toxicity', 'Tremors', 'Confusion', 'Kidney damage', 'Cardiac effects'],
        advice: ['Monitor lithium levels', 'Watch for toxicity signs', 'Medical supervision essential', 'Dose adjustments']
      },

      // MDMA Dangerous Combinations
      'mdma+antidepressants': {
        risk: 'dangerous',
        mechanism: 'MDMA with antidepressants can cause serotonin syndrome and reduce MDMA effects.',
        effects: ['Serotonin syndrome', 'Reduced MDMA effects', 'Hyperthermia', 'Dangerous interactions'],
        advice: ['Taper antidepressants safely', 'Medical supervision', 'Monitor for serotonin syndrome', 'Plan withdrawal period']
      },
      'mdma+lithium': {
        risk: 'dangerous',
        mechanism: 'MDMA may interact with lithium causing seizures and lithium toxicity.',
        effects: ['Seizure risk', 'Lithium toxicity', 'Cardiac effects', 'Neurological complications'],
        advice: ['High seizure risk', 'Medical supervision essential', 'Monitor lithium levels', 'Emergency plan needed']
      },

      // MODERATE RISK COMBINATIONS

      // LSD Moderate Combinations
      'lsd+lithium': {
        risk: 'moderate',
        mechanism: 'LSD may interact with lithium affecting mood stabilization and causing mild complications.',
        effects: ['Mood destabilization', 'Enhanced trip effects', 'Possible lithium level changes'],
        advice: ['Medical supervision recommended', 'Monitor mood closely', 'Adjust lithium if needed', 'Psychiatric follow-up']
      },
      'lsd+cannabis': {
        risk: 'moderate',
        mechanism: 'Cannabis can intensify LSD effects and may cause anxiety or thought loops.',
        effects: ['Intensified visuals', 'Increased anxiety', 'Thought loops', 'Extended duration'],
        advice: ['Start with small cannabis amounts', 'Have CBD available', 'Safe environment essential', 'Experienced sitter recommended']
      },
      'lsd+caffeine': {
        risk: 'moderate',
        mechanism: 'Caffeine may increase anxiety and jitteriness during LSD experiences.',
        effects: ['Increased anxiety', 'Jitteriness', 'Enhanced stimulation', 'Difficulty relaxing'],
        advice: ['Limit caffeine intake', 'Monitor anxiety levels', 'Have calming techniques ready', 'Consider decaf alternatives']
      },

      // Psilocybin Moderate Combinations
      'psilocybin-psilocin+cannabis': {
        risk: 'moderate',
        mechanism: 'Cannabis can intensify psilocybin effects and may increase anxiety or enhance visuals.',
        effects: ['Enhanced visuals', 'Increased introspection', 'Possible anxiety', 'Intensified experience'],
        advice: ['Use small cannabis amounts', 'Have CBD available', 'Calm environment needed', 'Experienced guidance helpful']
      },
      'psilocybin-psilocin+alcohol': {
        risk: 'moderate',
        mechanism: 'Alcohol may reduce beneficial effects and increase nausea during mushroom experiences.',
        effects: ['Reduced therapeutic effects', 'Increased nausea', 'Impaired judgment', 'Diminished introspection'],
        advice: ['Avoid alcohol completely', 'Maximizes therapeutic potential', 'Reduces nausea risk', 'Better integration']
      },

      // DMT Moderate Combinations
      'dmt+cannabis': {
        risk: 'moderate',
        mechanism: 'Cannabis may extend and intensify DMT experiences, making them more difficult to integrate.',
        effects: ['Extended experience', 'Intensified visuals', 'Difficult integration', 'Overwhelming effects'],
        advice: ['Use sparingly if at all', 'Prepare for intensity', 'Integration support needed', 'Experienced guidance essential']
      },

      // Mescaline Moderate Combinations
      'mescaline+cannabis': {
        risk: 'moderate',
        mechanism: 'Cannabis may intensify mescaline visuals but can increase anxiety and confusion.',
        effects: ['Enhanced visuals', 'Possible anxiety', 'Increased confusion', 'Intensified experience'],
        advice: ['Use minimal amounts', 'Have CBD available', 'Safe environment crucial', 'Experienced guidance helpful']
      },
      'mescaline+alcohol': {
        risk: 'moderate',
        mechanism: 'Alcohol increases nausea and may interfere with the spiritual aspects of mescaline experiences.',
        effects: ['Severe nausea', 'Reduced spiritual effects', 'Dehydration', 'Impaired experience'],
        advice: ['Avoid alcohol completely', 'Traditional contraindication', 'Increases nausea significantly', 'Stay hydrated']
      },

      // Salvia Moderate Combinations
      'salvia-divinorum+cannabis': {
        risk: 'moderate',
        mechanism: 'Cannabis may extend salvia effects and increase confusion during the intense but brief experience.',
        effects: ['Extended confusion', 'Intensified effects', 'Difficult integration', 'Overwhelming experience'],
        advice: ['Use one substance only', 'Salvia is intense enough alone', 'Safe environment essential', 'Sitter required']
      },
      'salvia-divinorum+alcohol': {
        risk: 'moderate',
        mechanism: 'Alcohol may increase the risk of injury during salvia\'s intense but brief dissociative effects.',
        effects: ['Increased injury risk', 'Impaired coordination', 'Dangerous behavior', 'Memory issues'],
        advice: ['High injury potential', 'Remove all hazards', 'Padded environment', 'Constant supervision']
      },

      // Ibogaine Moderate Combinations
      'ibogaine+medications': {
        risk: 'moderate',
        mechanism: 'Ibogaine has complex pharmacology and may interact with many medications.',
        effects: ['Unpredictable interactions', 'Cardiac effects', 'Altered medication levels'],
        advice: ['Medical supervision essential', 'Comprehensive drug screening', 'Cardiac monitoring', 'Experienced provider needed']
      },

      // LOW RISK COMBINATIONS

      // CBD Low Risk Combinations
      'cbd+thc': {
        risk: 'low',
        mechanism: 'CBD may reduce THC anxiety and paranoia while maintaining therapeutic effects.',
        effects: ['Reduced anxiety', 'Balanced effects', 'Enhanced therapeutic benefits', 'Reduced paranoia'],
        advice: ['Generally beneficial combination', 'Adjust ratios as needed', 'Monitor effects', 'May reduce THC tolerance']
      },
      'cbd+caffeine': {
        risk: 'low',
        mechanism: 'CBD may reduce caffeine jitters and anxiety while maintaining alertness.',
        effects: ['Reduced jitters', 'Calmer alertness', 'Potential enhanced focus', 'Less anxiety'],
        advice: ['Generally well tolerated', 'Monitor caffeine sensitivity', 'May improve focus', 'Start with small amounts']
      },

      // Caffeine Low Risk Combinations
      'caffeine+l-theanine': {
        risk: 'low',
        mechanism: 'L-theanine reduces caffeine jitters and anxiety while maintaining alertness.',
        effects: ['Calm alertness', 'Reduced jitters', 'Enhanced focus', 'Less anxiety'],
        advice: ['Excellent combination', 'Natural in green tea', 'Enhances cognitive benefits', 'Start with 2:1 theanine:caffeine ratio']
      },
      'caffeine+nicotine': {
        risk: 'low',
        mechanism: 'Common combination that enhances cognitive effects but increases cardiovascular stress.',
        effects: ['Enhanced focus', 'Increased alertness', 'Mild cardiovascular stress', 'Habit formation'],
        advice: ['Monitor heart rate', 'Common but addictive', 'Limit total stimulant intake', 'Stay hydrated']
      },

      // Melatonin Low Risk Combinations
      'melatonin+cbd': {
        risk: 'low',
        mechanism: 'Both substances promote relaxation and sleep through different mechanisms.',
        effects: ['Enhanced sleep quality', 'Faster sleep onset', 'Improved relaxation'],
        advice: ['Beneficial for sleep', 'Start with low doses', 'Natural sleep enhancement', 'Monitor morning grogginess']
      },
      'melatonin+chamomile': {
        risk: 'low',
        mechanism: 'Both are natural sleep aids that work synergistically for better sleep.',
        effects: ['Enhanced sleep quality', 'Natural relaxation', 'Reduced sleep latency'],
        advice: ['Natural sleep combination', 'Generally safe', 'Monitor for morning drowsiness', 'Start with low doses']
      },

      // PRESCRIPTION MEDICATION INTERACTIONS

      // Antidepressant Interactions
      'ssris+nsaids': {
        risk: 'dangerous',
        mechanism: 'SSRIs with NSAIDs significantly increase bleeding risk, especially gastrointestinal bleeding.',
        effects: ['Increased bleeding risk', 'GI bleeding', 'Bruising', 'Internal bleeding'],
        advice: ['Monitor for bleeding signs', 'Use alternatives to NSAIDs', 'Medical supervision', 'Emergency care for bleeding']
      },
      'ssris+aspirin': {
        risk: 'dangerous',
        mechanism: 'SSRIs impair platelet function and combined with aspirin create dangerous bleeding risk.',
        effects: ['Severe bleeding risk', 'Easy bruising', 'GI bleeding', 'Internal bleeding'],
        advice: ['High bleeding risk', 'Monitor closely', 'Medical supervision', 'Consider alternatives']
      },

      // Blood Thinner Interactions
      'warfarin+alcohol': {
        risk: 'dangerous',
        mechanism: 'Alcohol affects warfarin metabolism and dramatically increases bleeding risk.',
        effects: ['Dangerous bleeding', 'INR fluctuations', 'Internal bleeding', 'Bruising'],
        advice: ['Limit alcohol severely', 'Monitor INR closely', 'Medical supervision', 'Emergency care for bleeding']
      },
      'warfarin+antibiotics': {
        risk: 'dangerous',
        mechanism: 'Many antibiotics increase warfarin effects and cause dangerous bleeding.',
        effects: ['Increased anticoagulation', 'Bleeding risk', 'INR elevation'],
        advice: ['Monitor INR closely', 'Dose adjustments needed', 'Medical supervision', 'Frequent testing']
      },
      'warfarin+nsaids': {
        risk: 'dangerous',
        mechanism: 'NSAIDs with warfarin create extremely high bleeding risk through multiple mechanisms.',
        effects: ['Severe bleeding risk', 'GI bleeding', 'Internal bleeding', 'Fatal hemorrhage'],
        advice: ['Avoid NSAIDs completely', 'Use alternatives', 'Emergency care for bleeding', 'High mortality risk']
      },

      // FOOD AND HERBAL INTERACTIONS

      // Grapefruit Interactions
      'grapefruit+medications': {
        risk: 'dangerous',
        mechanism: 'Grapefruit inhibits CYP3A4 enzyme, dramatically increasing levels of many medications.',
        effects: ['Medication overdose', 'Increased side effects', 'Toxicity', 'Dangerous levels'],
        advice: ['Avoid grapefruit with medications', 'Check drug labels', 'Medical consultation', 'Can last 72+ hours']
      },
      'grapefruit+simvastatin': {
        risk: 'dangerous',
        mechanism: 'Grapefruit increases statin levels dramatically, causing muscle breakdown and kidney damage.',
        effects: ['Muscle breakdown', 'Kidney damage', 'Liver toxicity', 'Potentially fatal'],
        advice: ['Never combine', 'Muscle pain is warning sign', 'Emergency care for symptoms', 'Switch to different statin']
      },

      // St. John\'s Wort Interactions
      'st-johns-wort+birth-control': {
        risk: 'dangerous',
        mechanism: 'St. John\'s Wort reduces birth control effectiveness by increasing metabolism.',
        effects: ['Birth control failure', 'Unplanned pregnancy', 'Breakthrough bleeding'],
        advice: ['Use backup contraception', 'Consider alternative treatments', 'Medical consultation', 'Plan accordingly']
      },
      'st-johns-wort+transplant-drugs': {
        risk: 'deadly',
        mechanism: 'St. John\'s Wort dramatically reduces immunosuppressive drug levels, causing organ rejection.',
        effects: ['Organ rejection', 'Transplant failure', 'Death', 'Treatment failure'],
        advice: ['NEVER combine', 'Inform transplant team', 'Medical emergency', 'Life-threatening interaction']
      },

      // RESEARCH CHEMICAL INTERACTIONS

      // Novel Psychoactive Substances
      'research-chemicals+anything': {
        risk: 'unknown',
        mechanism: 'Research chemicals have unknown pharmacology and unpredictable interactions.',
        effects: ['Unknown interaction profile', 'Unpredictable effects', 'Potential toxicity', 'Unknown risks'],
        advice: ['Extreme caution required', 'No safety data available', 'Avoid combinations', 'Medical supervision recommended']
      },

      // Synthetic Cathinones
      'synthetic-cathinones+alcohol': {
        risk: 'dangerous',
        mechanism: 'Bath salts with alcohol increase cardiovascular stress and unpredictable behavior.',
        effects: ['Severe cardiovascular stress', 'Unpredictable behavior', 'Hyperthermia', 'Violence'],
        advice: ['High risk combination', 'Unpredictable effects', 'Medical supervision', 'Emergency plan needed']
      },
      'synthetic-cathinones+stimulants': {
        risk: 'deadly',
        mechanism: 'Combining synthetic stimulants creates extreme cardiovascular stress and hyperthermia.',
        effects: ['Fatal hyperthermia', 'Heart attack', 'Stroke', 'Seizures', 'Death'],
        advice: ['Extremely dangerous', 'Often fatal', 'Emergency medical care', 'Avoid all combinations']
      },

      // EMERGING INTERACTIONS

      // Kratom Interactions
      'kratom+alcohol': {
        risk: 'dangerous',
        mechanism: 'Kratom with alcohol increases respiratory depression and liver toxicity risks.',
        effects: ['Respiratory depression', 'Liver damage', 'Enhanced sedation', 'Overdose risk'],
        advice: ['High risk combination', 'Monitor breathing', 'Liver toxicity risk', 'Reduce doses']
      },
      'kratom+benzodiazepines': {
        risk: 'dangerous',
        mechanism: 'Kratom\'s opioid-like effects with benzodiazepines create dangerous respiratory depression.',
        effects: ['Severe respiratory depression', 'Unconsciousness', 'Overdose', 'Death risk'],
        advice: ['Very dangerous combination', 'Monitor breathing closely', 'Emergency plan needed', 'Avoid combination']
      },
      'kratom+opioids': {
        risk: 'deadly',
        mechanism: 'Kratom acts on opioid receptors and combined with opioids creates fatal respiratory depression.',
        effects: ['Severe respiratory depression', 'Overdose', 'Death', 'Prolonged sedation'],
        advice: ['Potentially fatal', 'Never combine', 'Emergency medical care', 'Naloxone may help']
      },

      // Tianeptine Interactions
      'tianeptine+opioids': {
        risk: 'deadly',
        mechanism: 'Tianeptine has opioid activity at high doses and combined with opioids causes fatal overdose.',
        effects: ['Fatal respiratory depression', 'Overdose', 'Death', 'Prolonged sedation'],
        advice: ['Extremely dangerous', 'Often fatal', 'Emergency medical care', 'Naloxone needed']
      },
      'tianeptine+alcohol': {
        risk: 'dangerous',
        mechanism: 'Tianeptine\'s CNS depressant effects with alcohol increase respiratory depression risk.',
        effects: ['Respiratory depression', 'Enhanced sedation', 'Overdose risk', 'Liver toxicity'],
        advice: ['High risk combination', 'Monitor breathing', 'Medical supervision', 'Reduce alcohol intake']
      }
    };
  }

  initializeEventListeners() {
    const substance1Select = document.getElementById('substance1');
    const substance2Select = document.getElementById('substance2');
    const checkButton = document.getElementById('checkInteraction');

    // Enable/disable check button based on selections
    const updateButtonState = () => {
      const hasSelections = substance1Select.value && substance2Select.value;
      checkButton.disabled = !hasSelections;
    };

    substance1Select.addEventListener('change', updateButtonState);
    substance2Select.addEventListener('change', updateButtonState);

    // Check interaction when button is clicked
    checkButton.addEventListener('click', () => {
      this.checkInteraction(substance1Select.value, substance2Select.value);
    });
  }

  checkInteraction(substance1, substance2) {
    if (!substance1 || !substance2) return;

    // Create lookup keys (alphabetical order for consistency)
    const key1 = `${substance1}+${substance2}`;
    const key2 = `${substance2}+${substance1}`;
    
    // Find interaction data
    let interaction = this.interactions[key1] || this.interactions[key2];
    
    // If no specific interaction found, provide general category-based assessment
    if (!interaction) {
      interaction = this.generateGeneralInteraction(substance1, substance2);
    }

    this.displayResults(substance1, substance2, interaction);
  }

  generateGeneralInteraction(substance1, substance2) {
    // Map substances to categories for general interactions
    const categories = {
      // Depressants
      'absinthe': 'depressant',
      'aerosols': 'depressant',
      'inhalants': 'depressant',
      'huffing': 'depressant',
      'duster': 'depressant',
      'dusting': 'depressant',
      'whippets': 'depressant',
      'alcohol': 'depressant',
      'alkyl-nitrites': 'vasodilator',
      'alprazolam': 'depressant',
      'amanita': 'depressant',
      'barbiturates': 'depressant',
      'belladonna': 'deliriant',
      'blue-lotus': 'herb',
      'datura': 'deliriant',
      'bromazepam': 'depressant',
      'buprenorphine': 'depressant',
      'carisoprodol': 'depressant',
      'soma': 'depressant',
      'carisoma': 'depressant',
      'somas': 'depressant',
      'dance': 'depressant',
      'las-vegas-cocktail': 'depressant',
      'muscle-relaxer': 'depressant',
      'chloral-hydrate': 'depressant',
      'chlorodiazepoxide': 'depressant',
      'librium': 'depressant',
      'libs': 'depressant',
      'greens': 'depressant',
      'green-and-blacks': 'depressant',
      'clonazepam': 'depressant',
      'codeine': 'depressant',
      'desomorphine': 'depressant',
      'diazepam': 'depressant',
      'dihydrocodeine': 'depressant',
      'dimenhydrinate': 'depressant',
      'diphenhydramine': 'depressant',
      'ether': 'depressant',
      'fentanyl': 'depressant',
      'gabapentin': 'depressant',
      'ghb': 'depressant',
      'heroin': 'depressant',
      'hydrocodone': 'depressant',
      'hydromorphone': 'depressant',
      'lorazepam': 'depressant',
      'melatonin': 'depressant',
      'methadone': 'depressant',
      'methaqualone': 'depressant',
      'morphine': 'depressant',
      'opium': 'depressant',
      'opium-poppy': 'depressant',
      'oxycodone': 'depressant',
      'oxymorphone': 'depressant',
      'phenazepam': 'depressant',
      'fenazepam': 'depressant',
      'phenzepam': 'depressant',
      'rohypnol': 'depressant',
      'flunitrazepam': 'depressant',
      'roofies': 'depressant',
      'roofie': 'depressant',
      'poppers': 'vasodilator',
      'pregabalin': 'depressant',
      'quetiapine': 'depressant',
      'seroquel': 'depressant',
      'scopolamine': 'deliriant',
      'tilidin': 'depressant',
      'tramadol': 'depressant',
      'triazolam': 'depressant',
      'halcion': 'depressant',
      'blues': 'depressant',
      'sleepers': 'depressant',
      'knockout-pills': 'depressant',
      'zolpidem': 'depressant',
      'etizolam': 'depressant',
      'flualprazolam': 'depressant',
      'kava': 'depressant',
      'kratom': 'depressant',
      'lean': 'depressant',
      'purple-drank': 'depressant',
      'purple-lean': 'depressant',
      'sizzurp': 'depressant',
      'dirty-sprite': 'depressant',
      'syrup': 'depressant',
      'drank': 'depressant',
      'barre': 'depressant',
      'wock': 'depressant',
      'tris': 'depressant',
      'mud': 'depressant',
      'oil': 'depressant',
      'sippin': 'depressant',
      'actavis': 'depressant',
      'texas-tea': 'depressant',
      'purple-jelly': 'depressant',
      'codeine-syrup': 'depressant',
      'phenibut': 'depressant',
      'baclofen': 'depressant',
      'carisoprodol': 'depressant',
      'cyclobenzaprine': 'depressant',
      'eszopiclone': 'depressant',
      'zaleplon': 'depressant',
      'hydroxyzine': 'depressant',
      'promethazine': 'depressant',
      'chlorpheniramine': 'depressant',
      'doxylamine': 'depressant',
      
      // U-47700 (Extremely Lethal Synthetic Opioid)
      'u-47700': 'depressant',
      'u47700': 'depressant',
      'u-4770': 'depressant',
      'u4770': 'depressant',
      'u-4': 'depressant',
      'u4': 'depressant',
      'pink': 'depressant',
      'pinky': 'depressant',
      'pink-powder': 'depressant',
      'pink-death': 'depressant',
      'synthetic-heroin': 'depressant',
      'designer-opioid': 'depressant',
      'rc-opioid': 'depressant',
      'research-chemical-opioid': 'depressant',
      'benzamide-opioid': 'depressant',
      'novel-synthetic-opioid': 'depressant',
      'nso': 'depressant',
      'ah-7921-analog': 'depressant',
      
      // Xylazine (Zombie Drug - Veterinary Adulterant)
      'xylazine': 'depressant',
      'xyla': 'depressant',
      'zombie-drug': 'depressant',
      'tranq': 'depressant',
      'zombie-dope': 'depressant',
      'rompun': 'depressant',
      'anased': 'depressant',
      'tranq-dope': 'depressant',
      'flesh-eating-drug': 'depressant',
      'sleep-cut': 'depressant',
      'skin-rot': 'depressant',
      'sedazine': 'depressant',
      'philadelphia-zombie': 'depressant',
      'necrosis-drug': 'depressant',
      'zombie': 'depressant',
      'flesh-eating': 'depressant',
      
      // Stimulants
      '4-fluoroamphetamine': 'stimulant',
      '4-fa': 'stimulant',
      'alpha-pvp': 'stimulant',
      'a-pvp': 'stimulant',
      'anabolic-steroids': 'stimulant',
      'anabolic': 'stimulant',
      'steroids': 'stimulant',
      'testosterone': 'stimulant',
      'roid': 'stimulant',
      'roids': 'stimulant',
      'juice': 'stimulant',
      'gear': 'stimulant',
      'amphetamine': 'stimulant',
      'caffeine': 'stimulant',
      'cathinone': 'stimulant',
      'cocaine': 'stimulant',
      'erythroxylum-coca': 'stimulant',
      'ephedrine': 'stimulant',
      'ethylphenidate': 'stimulant',
      'mdpv': 'stimulant',
      'methamphetamine': 'stimulant',
      'methylphenidate': 'stimulant',
      'nicotine': 'stimulant',
      'khat': 'stimulant',
      '3-mmc': 'stimulant',
      'hexen': 'stimulant',
      'modafinil': 'stimulant',
      'bzp': 'stimulant',
      'piperazines': 'stimulant',
      'pmma': 'stimulant',
      'pma': 'stimulant',
      'pmma/pma': 'stimulant',
      'albuterol': 'stimulant',
      'theophylline': 'stimulant',
      
      // Tianeptine (Opioid-Active Nootropic)
      'tianeptine': 'stimulant',
      'stablon': 'stimulant',
      'coaxil': 'stimulant',
      'tatinol': 'stimulant',
      'tia': 'stimulant',
      'gas-station-heroin': 'stimulant',
      'zaza-red': 'stimulant',
      'zaza-silver': 'stimulant',
      'tianna': 'stimulant',
      'tianeptine-sodium': 'stimulant',
      'tianeptine-sulfate': 'stimulant',
      'tianeptine-free-acid': 'stimulant',
      'td-red': 'stimulant',
      'pegasus': 'stimulant',
      'phenibut-plus': 'stimulant',
      
      // Synthetic Cathinones (Bath Salts)
      'synthetic-cathinones': 'stimulant',
      'bath-salts': 'stimulant',
      'plant-food': 'stimulant',
      'flakka': 'stimulant',
      'gravel': 'stimulant',
      'monkey-dust': 'stimulant',
      'cloud-nine': 'stimulant',
      'vanilla-sky': 'stimulant',
      'white-lightning': 'stimulant',
      'drone': 'stimulant',
      'meph': 'stimulant',
      'meow-meow': 'stimulant',
      'scooby-snax': 'stimulant',
      'ivory-wave': 'stimulant',
      'red-dove': 'stimulant',
      'mephedrone': 'stimulant',
      '4-mmc': 'stimulant',
      'alpha-pvp': 'stimulant',
      'a-pvp': 'stimulant',
      'methylone': 'stimulant',
      'pentylone': 'stimulant',
      'n-ethylpentylone': 'stimulant',
      'eutylone': 'stimulant',
      'butylone': 'stimulant',
      'ethylone': 'stimulant',
      '3-mmc': 'stimulant',
      '4-mec': 'stimulant',
      'neb': 'stimulant',
      'buphedrone': 'stimulant',
      'pentedrone': 'stimulant',
      'alpha-php': 'stimulant',
      'pyrovalerone': 'stimulant',
      'neb': 'stimulant',
      
      // Psychedelics
      '2c-b': 'psychedelic',
      '2c-b-fly': 'psychedelic',
      '2cbfly': 'psychedelic',
      '2cb-fly': 'psychedelic',
      'bromo-fly': 'psychedelic',
      'b-fly': 'psychedelic',
      'butterfly': 'psychedelic',
      'benzodifuran': 'psychedelic',
      '2c-e': 'psychedelic',
      '2ce': 'psychedelic',
      'europa': 'psychedelic',
      'eternity': 'psychedelic',
      'aquarust': 'psychedelic',
      'hummingbird': 'psychedelic',
      '2c-i': 'psychedelic',
      '2ci': 'psychedelic',
      'smiles': 'psychedelic',
      'i-series': 'psychedelic',
      'infinity': 'psychedelic',
      'crystal': 'psychedelic',
      'visual storm': 'psychedelic',
      '2c-t-7': 'psychedelic',
      '2ct7': 'psychedelic',
      '2c-t7': 'psychedelic',
      'blue mystic': 'psychedelic',
      'lucky 7': 'psychedelic',
      't-7': 'psychedelic',
      'seven': 'psychedelic',
      'heaven': 'psychedelic',
      'propylthio-2c': 'psychedelic',
      // 3-CMC aliases
      '3-cmc': 'stimulant',
      '3cmc': 'stimulant',
      '3-chloromethcathinone': 'stimulant',
      'clophedrone': 'stimulant',
      'white rush': 'stimulant',
      'meta-chloromethcathinone': 'stimulant',
      '3-chloro-n-methylcathinone': 'stimulant',
      // 3-MMC aliases
      '3-mmc': 'stimulant',
      '3mmc': 'stimulant',
      '3-methylmethcathinone': 'stimulant',
      'metaphedrone': 'stimulant',
      '3-methyl-n-methylcathinone': 'stimulant',
      'meta-methylmethcathinone': 'stimulant',
      // 4-CMC aliases
      '4-cmc': 'stimulant',
      '4cmc': 'stimulant',
      '4-chloromethcathinone': 'stimulant',
      'clephedrone': 'stimulant',
      '4-chloro-n-methylcathinone': 'stimulant',
      'para-chloromethcathinone': 'stimulant',
      'p-chloromethcathinone': 'stimulant',
      'chloromethylcathinone': 'stimulant',
      // 4-CEC aliases
      '4-cec': 'stimulant',
      '4cec': 'stimulant',
      '4-chloroethcathinone': 'stimulant',
      'ethyl-cat': 'stimulant',
      '4-chloro-n-ethylcathinone': 'stimulant',
      'para-chloroethcathinone': 'stimulant',
      'p-chloroethcathinone': 'stimulant',
      'chloroethylcathinone': 'stimulant',
      // 4-MMC aliases
      '4-mmc': 'stimulant',
      '4mmc': 'stimulant',
      'mephedrone': 'stimulant',
      'meow meow': 'stimulant',
      'meow-meow': 'stimulant',
      'm-cat': 'stimulant',
      'mcat': 'stimulant',
      'drone': 'stimulant',
      'meph': 'stimulant',
      '4-methylmethcathinone': 'stimulant',
      '4-methyl-n-methylcathinone': 'stimulant',
      'para-methylmethcathinone': 'stimulant',
      'plant food': 'stimulant',
      'white magic': 'stimulant',
      'bubbles': 'stimulant',
      // Hexen aliases
      'hexen': 'stimulant',
      'neh': 'stimulant',
      'n-ethylhexedrone': 'stimulant',
      'n-ethyl-hexedrone': 'stimulant',
      '2-(ethylamino)-1-phenylhexan-1-one': 'stimulant',
      'ethyl-hexedrone': 'stimulant',
      'research chemical': 'stimulant',
      'designer stimulant': 'stimulant',
      'hexedrone analog': 'stimulant',
      'synthetic cathinone': 'stimulant',
      'bath salts': 'stimulant',
      'novel psychoactive substance': 'stimulant',
      'α-ethylaminohexanophenone': 'stimulant',
      'legal high': 'stimulant',
      '5-meo-amt': 'psychedelic',
      '5-meo-dipt': 'psychedelic',
      '5-meo-dmt': 'psychedelic',
      '5-meo-mipt': 'psychedelic',
      'aet': 'psychedelic',
      'amt': 'psychedelic',
      'ayahuasca': 'psychedelic',
      'bufotenin': 'psychedelic',
      'dmt': 'psychedelic',
      'dom': 'psychedelic',
      'ibogaine': 'psychedelic',
      'lsa': 'psychedelic',
      'hawaiian-baby-woodrose': 'psychedelic',
      'lsd': 'psychedelic',
      '1p-lsd': 'psychedelic',
      'mescal-bean': 'psychedelic',
      'mescaline': 'psychedelic',
      'nbome': 'psychedelic',
      'psilocybin': 'psychedelic',
      'psilocybin-psilocin': 'psychedelic',
      'psychoactivecacti': 'psychedelic',
      'toad-venom': 'psychedelic',
      'peyote': 'psychedelic',
      'morning-glory': 'psychedelic',
      'mimosa-spp': 'psychedelic',
      'acacia': 'psychedelic',
      '4-aco-dmt': 'psychedelic',
      '4-ho-met': 'psychedelic',
      '4-ho-mipt': 'psychedelic',
      
      // Dissociatives
      '3-meo-pcp': 'dissociative',
      'dxm': 'dissociative',
      'ketamine': 'dissociative',
      'methoxetamine': 'dissociative',
      'methoxphenidine': 'dissociative',
      'nitrous': 'dissociative',
      'nitrous-oxide': 'dissociative',
      'pcp': 'dissociative',
      'salvia-divinorum': 'dissociative',
      'memantine': 'dissociative',
      'dck': 'dissociative',
      '2-fdck': 'dissociative',
      
      // Empathogens
      '6-apb': 'empathogen',
      'mbdb': 'empathogen',
      'mcpp': 'empathogen',
      'mda': 'empathogen',
      'mdma': 'empathogen',
      
      // Cannabinoids
      'cannabis-concentrates': 'cannabinoid',
      'cbd': 'cannabinoid',
      'cbn': 'cannabinoid',
      'delta-8-thc': 'cannabinoid',
      'dronabinol': 'cannabinoid',
      'hhc': 'cannabinoid',
      'jwh-018': 'cannabinoid',
      'ab-chminaca': 'cannabinoid',
      'spice-k2': 'cannabinoid',
      'thc': 'cannabinoid',
      
      // Psychiatric Medications
      'amitriptyline': 'antidepressant',
      'maois': 'antidepressant',
      'ssris': 'antidepressant',
      'phenelzine': 'antidepressant',
      'tranylcypromine': 'antidepressant',
      'moclobemide': 'antidepressant',
      'venlafaxine': 'antidepressant',
      'duloxetine': 'antidepressant',
      'mirtazapine': 'antidepressant',
      'trazodone': 'antidepressant',
      'lithium': 'mood-stabilizer',
      'lamotrigine': 'mood-stabilizer',
      'valproate': 'mood-stabilizer',
      'carbamazepine': 'anticonvulsant',
      'olanzapine': 'antipsychotic',
      'risperidone': 'antipsychotic',
      'risperdal': 'antipsychotic',
      'haloperidol': 'antipsychotic',
      'aripiprazole': 'antipsychotic',
      'seroquel': 'antipsychotic',
      'buspirone': 'anxiolytic',
      
      // Herbs and Natural Products
      'kanna': 'herb',
      'lions-tail': 'herb',
      'passionflower': 'herb',
      'st-johns-wort': 'herb',
      'rhodiola': 'herb',
      'ginseng': 'herb',
      'green-tea-extract': 'herb',
      'ginkgo': 'herb',
      'valerian': 'herb',
      'mucuna-pruriens': 'herb',
      'mandrake': 'deliriant',
      'nutmeg': 'deliriant',
      'calea-zacatechichi': 'herb',
      'wild-dagga': 'herb',
      'mugwort': 'herb',
      
      // Pharmaceutical Compounds
      'acetaminophen': 'analgesic',
      'acetylfentanyl': 'depressant',
      'naloxone': 'antagonist',
      'sildenafil': 'vasodilator',
      'viagra': 'vasodilator',
      'propranolol': 'beta-blocker',
      'verapamil': 'calcium-channel-blocker',
      'digoxin': 'cardiac-glycoside',
      'ace-inhibitors': 'cardiovascular',
      'omeprazole': 'ppi',
      'ranitidine': 'h2-blocker',
      'insulin': 'hormone',
      'metformin': 'antidiabetic',
      'levothyroxine': 'hormone',
      'testosterone': 'hormone',
      'birth-control': 'hormone',
      'cetirizine': 'antihistamine',
      'tianeptine': 'atypical-antidepressant',
      'tapentadol': 'analgesic',
      'suboxone': 'depressant',
      'ritonavir': 'protease-inhibitor',
      'harmaline': 'maoi',
      'harmane': 'maoi',
      '5-htp': 'supplement',
      'grapefruit-juice': 'supplement',
      'vitamin-c': 'supplement',
      'l-tyrosine': 'supplement',
      'magnesium': 'supplement',
      
      // Others
      'adrenochrome': 'other',
      'carbogen': 'other',
      'chloroform': 'depressant'
    };

    const cat1 = categories[substance1];
    const cat2 = categories[substance2];

    // Specific high-risk category combinations
    if (cat1 === 'depressant' && cat2 === 'depressant') {
      return {
        risk: 'dangerous',
        mechanism: 'Both substances depress the central nervous system, potentially causing dangerous respiratory depression.',
        effects: ['Severe respiratory depression', 'Loss of consciousness', 'Coma', 'Death risk', 'Extreme sedation'],
        advice: ['Extremely dangerous combination', 'High overdose risk', 'Never combine depressants', 'Emergency medical care if combined']
      };
    }
    
    if ((cat1 === 'deliriant' && cat2 === 'depressant') || (cat1 === 'depressant' && cat2 === 'deliriant')) {
      return {
        risk: 'deadly',
        mechanism: 'Deliriant substances combined with depressants create extreme toxicity with respiratory depression.',
        effects: ['Severe respiratory depression', 'Complete delirium', 'Hyperthermia', 'Death', 'Multi-organ failure'],
        advice: ['Never combine', 'Fatal interaction potential', 'Emergency medical care required', 'Life-threatening combination']
      };
    }
    
    if (cat1 === 'deliriant' && cat2 === 'deliriant') {
      return {
        risk: 'deadly',
        mechanism: 'Combining deliriant substances creates extreme anticholinergic toxicity with high fatality rate.',
        effects: ['Extreme anticholinergic poisoning', 'Complete loss of reality', 'Hyperthermia', 'Death', 'Cardiovascular collapse'],
        advice: ['Never combine deliriants', 'Frequently fatal', 'Medical emergency', 'Call 911 immediately']
      };
    }
    
    if ((cat1 === 'deliriant' && cat2 === 'stimulant') || (cat1 === 'stimulant' && cat2 === 'deliriant')) {
      return {
        risk: 'deadly',
        mechanism: 'Stimulants dramatically worsen deliriant hyperthermia and cardiovascular toxicity.',
        effects: ['Fatal hyperthermia', 'Cardiovascular collapse', 'Extreme delirium', 'Death', 'Heat stroke'],
        advice: ['Never combine', 'Fatal hyperthermia risk', 'Medical emergency', 'Death highly likely']
      };
    }
    
    if ((cat1 === 'antidepressant' && cat2 === 'psychedelic') || (cat1 === 'psychedelic' && cat2 === 'antidepressant')) {
      if (cat1 === 'antidepressant' && substance1.includes('maoi') || cat2 === 'antidepressant' && substance2.includes('maoi')) {
        return {
          risk: 'deadly',
          mechanism: 'MAOIs with psychedelics can cause fatal serotonin syndrome and dangerous potentiation.',
          effects: ['Severe serotonin syndrome', 'Extreme potentiation', 'Hyperthermia', 'Death', 'Cardiovascular collapse'],
          advice: ['Never combine', 'Life-threatening interaction', 'Fatal potential', 'Emergency medical care required']
        };
      }
      return {
        risk: 'risky',
        mechanism: 'Antidepressants may reduce psychedelic effects and create unpredictable serotonin interactions.',
        effects: ['Reduced psychedelic effects', 'Unpredictable interactions', 'Possible serotonin effects', 'Blunted experience'],
        advice: ['Significantly reduced effects likely', 'Consult physician', 'May need medication break', 'Unknown safety profile']
      };
    }
    
    if ((cat1 === 'mood-stabilizer' && cat2 === 'psychedelic') || (cat1 === 'psychedelic' && cat2 === 'mood-stabilizer')) {
      return {
        risk: 'dangerous',
        mechanism: 'Mood stabilizers, especially lithium, dramatically increase seizure risk with psychedelics.',
        effects: ['Severe seizure risk', 'Neurological complications', 'Enhanced toxicity', 'Potential brain damage'],
        advice: ['Never combine with lithium', 'Extremely high seizure risk', 'Consult psychiatrist', 'Dangerous neurological effects']
      };
    }

    if ((cat1 === 'stimulant' && cat2 === 'depressant') || (cat1 === 'depressant' && cat2 === 'stimulant')) {
      return {
        risk: 'dangerous',
        mechanism: 'Stimulants can mask depressant effects, leading to overdose when the stimulant wears off.',
        effects: ['Masked intoxication', 'Hidden overdose risk', 'Cardiac stress', 'Unpredictable effects', 'Delayed recognition of overdose'],
        advice: ['Very dangerous combination', 'Effects may be hidden', 'Monitor for overdose signs', 'Avoid this combination']
      };
    }

    if (cat1 === 'stimulant' && cat2 === 'stimulant') {
      return {
        risk: 'dangerous',
        mechanism: 'Multiple stimulants cause extreme cardiovascular stress and risk of cardiac events.',
        effects: ['Severe hypertension', 'Cardiac arrhythmias', 'Heart attack risk', 'Stroke risk', 'Hyperthermia'],
        advice: ['Never combine stimulants', 'Extreme cardiac danger', 'Monitor heart rate and blood pressure', 'Emergency care may be needed']
      };
    }

    if (cat1 === 'psychedelic' && cat2 === 'psychedelic') {
      return {
        risk: 'dangerous',
        mechanism: 'Combining psychedelics creates unpredictable and potentially overwhelming experiences.',
        effects: ['Unpredictable potentiation', 'Overwhelming experiences', 'Extended duration', 'High psychological risk', 'Reality loss'],
        advice: ['Never combine psychedelics', 'Unpredictable and dangerous', 'High psychological trauma risk', 'One substance at a time only']
      };
    }

    if (cat1 === 'dissociative' && cat2 === 'dissociative') {
      return {
        risk: 'dangerous',
        mechanism: 'Combining dissociatives creates extremely dangerous levels of dissociation with high injury risk.',
        effects: ['Extreme dissociation', 'Complete reality loss', 'High fall/injury risk', 'Dangerous coordination loss', 'Extended duration'],
        advice: ['Never combine dissociatives', 'Extremely dangerous', 'High physical injury risk', 'Complete loss of reality possible']
      };
    }

    if ((cat1 === 'dissociative' && cat2 === 'depressant') || (cat1 === 'depressant' && cat2 === 'dissociative')) {
      return {
        risk: 'dangerous',
        mechanism: 'Dissociatives with depressants create dangerous sedation and respiratory depression.',
        effects: ['Severe respiratory depression', 'Dangerous sedation', 'Loss of consciousness', 'High injury risk'],
        advice: ['Dangerous combination', 'Respiratory monitoring essential', 'High overdose risk', 'Avoid combination']
      };
    }

    if ((cat1 === 'cannabinoid' && cat2 === 'depressant') || (cat1 === 'depressant' && cat2 === 'cannabinoid')) {
      return {
        risk: 'moderate',
        mechanism: 'Cannabinoids may enhance sedative effects of depressants and impair coordination.',
        effects: ['Enhanced sedation', 'Impaired coordination', 'Increased drowsiness', 'Respiratory effects possible'],
        advice: ['Use caution', 'Monitor for excessive sedation', 'Start with lower doses', 'Avoid driving']
      };
    }

    if ((cat1 === 'herb' || cat2 === 'herb') && (cat1 !== cat2)) {
      return {
        risk: 'caution',
        mechanism: 'Herbal substances may have unpredictable interactions with other psychoactive substances.',
        effects: ['Unknown interaction profile', 'Unpredictable effects', 'Possible enhancement or reduction', 'Variable quality'],
        advice: ['Limited safety data', 'Start with low doses', 'Monitor for unexpected effects', 'Natural doesn\'t mean safe']
      };
    }

    // Default for unknown combinations
    return {
      risk: 'unknown',
      mechanism: 'Interaction data for this specific combination is limited. Exercise extreme caution.',
      effects: ['Unknown interaction profile', 'Unpredictable effects', 'Potential for adverse reactions', 'Safety data lacking'],
      advice: ['Exercise extreme caution', 'Start with lowest possible doses', 'Have medical support available', 'Consider avoiding combination entirely']
    };
  }

  displayResults(substance1, substance2, interaction) {
    const resultsDiv = document.getElementById('interactionResults');
    const substance1Name = document.getElementById('substance1Name');
    const substance2Name = document.getElementById('substance2Name');
    const riskLevel = document.getElementById('riskLevel');
    const riskDescription = document.getElementById('riskDescription');
    const mechanismText = document.getElementById('mechanismText');
    const effectsList = document.getElementById('effectsList');
    const adviceList = document.getElementById('adviceList');

    // Get display names
    const getDisplayName = (value) => {
      const option = document.querySelector(`option[value="${value}"]`);
      return option ? option.textContent : value;
    };

    // Update substance names
    substance1Name.textContent = getDisplayName(substance1);
    substance2Name.textContent = getDisplayName(substance2);

    // Update risk level with appropriate styling and emoji
    const riskEmoji = riskLevel.querySelector('.risk-emoji');
    const riskText = riskLevel.querySelector('.risk-text');
    
    riskLevel.className = 'risk-indicator ' + interaction.risk;
    
    switch (interaction.risk) {
      case 'deadly':
        riskEmoji.textContent = '💀';
        riskText.textContent = 'DEADLY - Do Not Combine';
        riskDescription.innerHTML = '<strong>This combination can be fatal.</strong> Avoid at all costs and seek immediate medical attention if already combined.';
        break;
      case 'dangerous':
        riskEmoji.textContent = '🔴';
        riskText.textContent = 'DANGEROUS - High Risk';
        riskDescription.innerHTML = '<strong>This combination carries significant risks.</strong> Should generally be avoided or used only with extreme caution and medical supervision.';
        break;
      case 'moderate':
        riskEmoji.textContent = '🟡';
        riskText.textContent = 'MODERATE RISK - Use Caution';
        riskDescription.innerHTML = '<strong>This combination has moderate risks.</strong> Can be managed with proper precautions and harm reduction measures.';
        break;
      case 'low':
        riskEmoji.textContent = '🟢';
        riskText.textContent = 'LOW RISK - Generally Safe';
        riskDescription.innerHTML = '<strong>This combination is generally considered safer.</strong> Still requires caution and proper dosing.';
        break;
      case 'unknown':
        riskEmoji.textContent = '⚪';
        riskText.textContent = 'UNKNOWN - Insufficient Data';
        riskDescription.innerHTML = '<strong>Limited information available.</strong> Exercise extreme caution due to unknown interaction profile.';
        break;
    }

    // Update mechanism
    mechanismText.textContent = interaction.mechanism;

    // Update effects list
    effectsList.innerHTML = '';
    interaction.effects.forEach(effect => {
      const li = document.createElement('li');
      li.textContent = effect;
      effectsList.appendChild(li);
    });

    // Update advice list
    adviceList.innerHTML = '';
    interaction.advice.forEach(advice => {
      const li = document.createElement('li');
      li.textContent = advice;
      adviceList.appendChild(li);
    });

    // Show results
    resultsDiv.style.display = 'block';
    resultsDiv.scrollIntoView({ behavior: 'smooth' });
  }
}

// Initialize the interaction checker when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new DrugInteractionChecker();
});