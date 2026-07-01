# Requirements Document

## Introduction

This document specifies the requirements for **Phase 1: Digital Citizen**, the first phase of a custom, AI-assisted digital literacy curriculum built for a Nepal-based NGO serving students aged 12–18 (Grades 9–11) from economically disadvantaged, marginalized, and minority communities.

Phase 1 deliberately rejects external certification courses (which assume strong English, stable internet, prior computer experience, and independent study habits). Instead it builds a custom curriculum that bridges learners from "smartphone and social media user with low digital confidence" to "safe, independent, AI-assisted, critical-thinking digital citizen."

The pedagogical model is **Hybrid AI-Assisted Learning**: AI acts as a learning companion, tutor, translator, research assistant, and practice partner, while human teachers act as facilitators, mentors, and learning architects. A core principle taught explicitly throughout is that **AI is useful but not always correct** — the curriculum aims for AI-assisted thinking, not AI-dependent thinking.

This requirements document covers **Phase 1 only**. It specifies the curriculum architecture, the learning content across six domains plus cross-cutting and future-focused threads, the standard lesson structure, language and accessibility constraints, the AI-assistance behavior, facilitator supportability, and the capstone artifact. Later phases (Digital Worker, Digital Creator, Technology Builder) are out of scope.

The "system" specified here is the curriculum as a deliverable product: its architecture, content artifacts, lesson templates, AI-assistance design, and facilitator materials. Requirements describe what these artifacts must contain and do, not the software platform that may later host them.

## Glossary

- **Curriculum**: The complete Phase 1 Digital Citizen curriculum, including its architecture, learning content, lesson materials, AI prompts, and facilitator guidance.
- **Curriculum_Architecture**: The structural design artifact that defines domains, learning modules, sequencing, learning outcomes, and their relationships, produced before any detailed lesson content.
- **Domain**: One of the major thematic learning areas of Phase 1 (for example, "Understanding the Internet").
- **Learning_Module**: A grouped unit of related lessons within a Domain.
- **Lesson**: The smallest standalone unit of learning content built from the Lesson_Template.
- **Lesson_Template**: The standard required structure every Lesson follows (Learning Goal, Starter Question, Guided AI Exploration, Practical Activity, Reflection, Mini Project).
- **Content_System**: The body of text-based learning content authored for Phase 1, including its Nepali translations.
- **AI_Companion**: The AI tool integrated into lessons that serves as tutor, translator, research assistant, and practice partner for learners.
- **AI_Prompt_Set**: The collection of structured, pre-written AI prompts authored for each Lesson to guide learner exploration with the AI_Companion.
- **Facilitator_Guide**: The supporting material that enables a teacher or facilitator with low prior technical skill to deliver a Lesson.
- **Learner**: A student aged 12–18 participating in Phase 1.
- **Facilitator**: A teacher, mentor, or visiting volunteer who delivers and supports lessons.
- **Capstone_Project**: The final Phase 1 project in which each Learner produces a real artifact demonstrating the Phase 1 outcomes.
- **Capstone_Artifact**: The concrete output (a researched answer or short explainer) each Learner creates during the Capstone_Project.
- **Computer_Lab**: The NGO's shared facility of 5–6 computers, with planned expansion.
- **Phase_1_Outcome**: A defined learner capability expected by the end of Phase 1 (the master goals).
- **Misinformation**: Information that is false or misleading, whether shared intentionally or unintentionally.
- **AI_Hallucination**: A confident but incorrect or fabricated response produced by an AI tool.
- **Digital_Footprint**: The traceable record of a person's online activity and shared information.
- **Synthetic_Media**: AI-generated or AI-altered images, audio, or video, including deepfakes.

## Requirements

### Requirement 1: Curriculum Architecture First

**User Story:** As a curriculum designer, I want the curriculum architecture defined before any detailed lesson content, so that learning outcomes drive content creation and the build sequence stays disciplined.

#### Acceptance Criteria

1. THE Curriculum_Architecture SHALL assign every Domain and every Learning_Module a unique identifier, a title, and an explicit ordinal sequence position, and SHALL record these before any Lesson detail content is authored.
2. THE Curriculum_Architecture SHALL map each Learning_Module to at least one Phase_1_Outcome by referencing that outcome's unique identifier.
3. IF a Learning_Module is not mapped to at least one Phase_1_Outcome, THEN THE Curriculum_Architecture SHALL flag the Learning_Module and withhold it from approval until it is mapped.
4. THE Curriculum SHALL be authored in the following ordered stages, with no stage beginning before its predecessor stage is complete: (1) Curriculum_Architecture, (2) text-based Content_System, (3) AI_Prompt_Set, (4) converted presentation materials.
5. THE Content_System SHALL be considered complete only when every Learning_Module has authored text-based content.
6. IF authoring of a stage begins before its predecessor stage is complete, THEN THE Curriculum SHALL reject the out-of-sequence work and indicate the incomplete predecessor stage.
7. THE Curriculum SHALL exclude slides, presentations, animations, and videos from the initial authored deliverables.
8. WHERE presentation materials are produced, THE Curriculum SHALL derive presentation materials from the previously authored text-based Content_System and SHALL reference the source Content_System identifier.
9. THE Curriculum SHALL define the set of Phase_1_Outcomes that learners are expected to achieve by the end of Phase 1, and SHALL assign each Phase_1_Outcome a unique identifier.

### Requirement 2: Phase 1 Scope Boundary

**User Story:** As an NGO program lead, I want Phase 1 scoped strictly to digital citizenship, so that the curriculum stays appropriate for the learners and defers technical careers to later phases.

#### Acceptance Criteria

1. THE Curriculum SHALL limit Phase 1 learning outcomes to digital citizenship competencies demonstrated through Learner-observable behaviors in the following four categories only: confident use (Learner independently completes a defined smartphone task such as opening an app, sending a message, or making a call without assistance), safe use (Learner identifies at least one scam, fraud, or privacy risk in a given example and states the protective action), independent use (Learner completes a defined task with zero facilitator interventions), and critical thinking (Learner classifies a given piece of online content as trustworthy or suspicious and states one supporting reason).
2. THE Curriculum SHALL exclude all of the following from Phase 1 content, activities, and assessments: coding or programming, spreadsheet or office productivity tools, any certification or exam preparation, and technical career or vocational job training.
3. WHEN Phase 1 covers a hardware, software, or operating system topic, THE Curriculum SHALL present it at a conceptual level limited to naming the component, stating its everyday purpose, and recognizing it in use, and SHALL NOT require the Learner to perform installation, system settings changes, permissions management, or other administrative configuration tasks.
4. WHERE a proposed topic maps to a later phase, THE Curriculum_Architecture SHALL record the topic in a deferred-topics register with its assigned later phase and SHALL exclude the topic from Phase 1 content.
5. IF a proposed Phase 1 topic or activity matches any exclusion in criterion 2 or requires an administrative configuration task in criterion 3, THEN THE Curriculum_Architecture SHALL reject the topic from Phase 1 and record it in the deferred-topics register with an indication of the violated boundary.

### Requirement 3: Domain 1 — Understanding Devices and the Digital World

**User Story:** As a Learner, I want to understand devices and how the digital world works, so that I can use computers and smartphones with confidence.

#### Acceptance Criteria

1. THE Curriculum SHALL include a Domain (Domain 1) that teaches at least three categories of digital devices (including smartphones and computers) and lists, for each category, at least two everyday uses, with all content delivered in Nepali and using no more than five English loanwords per learning page.
2. THE Curriculum SHALL explain the conceptual difference between hardware and software using at least two concrete everyday examples per concept (for example, a phone's screen and battery as hardware, a calling or messaging app as software), without requiring any technical or English-language prerequisite knowledge.
3. THE Curriculum SHALL explain the purpose of an operating system at a conceptual level, defining it in non-technical Nepali as the program that lets a Learner control the device and open other apps, illustrated with at least one example drawn from a smartphone.
4. WHEN a Learner completes Domain 1, THE Curriculum SHALL provide a Practical Activity that requires the Learner to operate a smartphone or computer to complete at least one basic task that has observable, verifiable success criteria (for example, powering the device on and off, locating and opening a named app, or adjusting screen brightness or volume), with step-by-step Nepali instructions.
5. WHERE AI-assisted guidance is enabled, THE Curriculum SHALL provide the Learner with on-demand prompts or hints in Nepali during the Practical Activity, and SHALL restrict AI responses to the Domain 1 task scope without requesting personal or sensitive information.
6. IF a Learner cannot complete the Practical Activity task within three attempts, THEN THE Curriculum SHALL present a simplified guided walkthrough of the same task and SHALL allow the Learner to retry without losing prior progress.

### Requirement 4: Domain 2 — Understanding the Internet

**User Story:** As a Learner, I want to understand the internet and how to search it, so that I can find information effectively.

#### Acceptance Criteria

1. THE Curriculum SHALL explain what the internet is and how websites and browsers relate to it, in Nepali language using vocabulary at or below the Phase 1 low-English reading level, illustrated with at least 3 examples drawn from rural daily life.
2. THE Curriculum SHALL teach the Learner to perform searches across each of the following 6 result types: web, images, videos, maps, news, and shopping, with at least one guided smartphone-based practice activity per result type.
3. THE Curriculum SHALL explain how AI-powered search differs from traditional keyword search, contrasting at least 2 observable differences (such as conversational/full-sentence queries versus keyword queries, and summarized answers versus a list of links).
4. THE Curriculum SHALL explain how recommendation algorithms decide what content a person sees, including at least 2 named factors (such as past viewing history and content popularity) and at least 1 consequence for the Learner (such as repeated or narrowed content).
5. WHEN a Learner performs a search activity, THE Curriculum SHALL guide the Learner to refine search terms using at least 2 named techniques (such as adding location, adding specific keywords, or rephrasing the question) so that results match the Learner's stated information goal.
6. IF a search returns no results or results unrelated to the Learner's stated goal, THEN THE Curriculum SHALL guide the Learner through at least 2 recovery steps (such as checking spelling, simplifying terms, or trying alternative words).
7. WHILE guiding any search activity, THE Curriculum SHALL instruct the Learner to enable safe-search settings and to avoid opening results that request personal information or payment, consistent with the Phase 1 safety-first principle.

### Requirement 5: Domain 3 — Information Literacy and Critical Thinking

**User Story:** As a Learner, I want to judge whether information is trustworthy, so that I can think critically instead of believing everything I see online.

#### Acceptance Criteria

1. THE Curriculum SHALL teach the difference between facts and opinions in Nepali at the Phase 1 reading level, providing an observable test a Learner can apply and at least 3 paired fact-and-opinion examples drawn from rural daily life.
2. THE Curriculum SHALL teach a single named, ordered checklist of at least 4 observable questions (such as who created it, when, why, and what evidence supports it) that a Learner applies the same way each time to evaluate whether an information source is trustworthy.
3. THE Curriculum SHALL teach how to recognize Misinformation using at least 2 observable warning signs, and SHALL teach the Learner to cross-check a claim against at least two independent sources, where independent sources are sources that do not all originate from the same author or publisher.
4. THE Curriculum SHALL teach that the AI_Companion can produce AI_Hallucinations, defining AI_Hallucination in simple Nepali, and SHALL teach at least 2 concrete techniques for verifying an AI answer.
5. WHEN a Learner receives an answer from the AI_Companion, THE Curriculum SHALL guide the Learner to verify the answer by cross-checking it against at least two independent sources before relying on it.
6. IF a claim cannot be confirmed or independent sources conflict, THEN THE Curriculum SHALL instruct the Learner to treat the claim as unverified, to not share it as true, and to consult a trusted person.
7. THE Curriculum SHALL allocate Domain 3 strictly more Lessons than any other Phase 1 Domain.
8. THE Curriculum SHALL include at least four Lessons in Domain 3.

### Requirement 6: Domain 4 — Digital Safety, Privacy, and Security

**User Story:** As a Learner, I want to protect my privacy and security online, so that I stay safe from scams and misuse of my information.

#### Acceptance Criteria

1. THE Curriculum SHALL define Digital_Footprint in Nepali using language at or below the Phase 1 reading level, and SHALL illustrate it with at least 3 everyday smartphone actions (for example: posting a photo, sharing a phone number, searching online) that add to a Learner's Digital_Footprint.
2. THE Curriculum SHALL identify at least 5 categories of personal information to keep private (for example: full name, home address, phone number, financial or banking details, government ID numbers), and for each category SHALL state at least one concrete risk of sharing it publicly.
3. WHEN teaching password practices, THE Curriculum SHALL specify that a strong password contains at least 8 characters and combines at least 3 of the following 4 types: uppercase letters, lowercase letters, numbers, and symbols.
4. THE Curriculum SHALL teach at least 3 account-security actions a Learner can perform on a smartphone (for example: setting a screen lock, enabling two-step verification, not reusing the same password across accounts).
5. THE Curriculum SHALL teach how to recognize at least 4 common online scams relevant to the Nepali rural context (for example: prize or lottery messages, fake job or loan offers, requests for OTP or password, impersonation of family or officials), and for each SHALL state at least one observable warning sign.
6. THE Curriculum SHALL teach how to recognize Synthetic_Media, including deepfakes and AI-generated images and voices, and SHALL provide at least 2 observable cues a Learner can use to question whether media is genuine.
7. IF a Learner encounters a suspected scam or unsafe situation, THEN THE Curriculum SHALL instruct the Learner to perform these 3 actions in order: (a) stop and not respond, (b) avoid sharing any personal information or money, and (c) consult a named trusted person (such as a family member, teacher, or facilitator) before taking further action.

### Requirement 7: Domain 5 — Responsible Social Media Use

**User Story:** As a Learner, I want to use social media responsibly, so that I build a positive digital identity and communicate respectfully.

#### Acceptance Criteria

1. THE Curriculum SHALL explain the purpose of at least three social media platforms commonly used in rural Nepal, using Nepali-language explanations and at least one worked example per platform.
2. THE Curriculum SHALL explain how the attention economy influences platform design by describing at least three specific design techniques (such as infinite scroll, notifications, and autoplay) and how each technique increases time spent on the platform.
3. THE Curriculum SHALL provide an enumerated list of at least five categories of content a Learner should avoid posting (such as personal identification documents, home address, financial details, others' private information without consent, and harmful or hateful content), with a Nepali-language explanation of the risk for each category.
4. THE Curriculum SHALL teach respectful online communication by defining at least four observable behaviors (such as avoiding insults, not sharing unverified information, respecting disagreement, and not forwarding harmful messages), each illustrated with one positive example and one negative example in Nepali.
5. WHEN a Learner completes the responsible communication lesson, THE Curriculum SHALL present at least three practice scenarios in which the Learner identifies the respectful response.
6. THE Curriculum SHALL teach how to build a positive digital identity by listing at least three concrete actions a Learner can take (such as choosing an appropriate profile photo, writing a respectful bio, and reviewing privacy settings before posting).
7. THE Curriculum SHALL explain that a Learner is already using AI within search, keyboards, and social applications by providing at least one concrete everyday example for each of these three contexts.
8. IF a lesson presents an interactive social media activity, THEN THE Curriculum SHALL use only simulated or example content and SHALL NOT require the Learner to post to a live public platform, preserving Learner safety.

### Requirement 8: Domain 6 — Becoming an Independent Learner (Capstone)

**User Story:** As a Learner, I want to learn new things on my own with AI support, so that I can keep growing after Phase 1 ends.

#### Acceptance Criteria

1. THE Curriculum SHALL teach how to set a learning goal and plan a personal learning project, where the plan states the goal, the steps, and a target timeframe.
2. THE Curriculum SHALL teach how to ask better questions when learning online and with the AI_Companion, including how to formulate a clear, specific question and how to rephrase or narrow the question when it is not answered.
3. THE Curriculum SHALL teach how to find trustworthy resources for self-directed learning, including checking who created a resource, comparing it across at least two independent sources, and recognizing signs of unreliable content.
4. THE Curriculum SHALL require each Learner to complete a Capstone_Project that produces a Capstone_Artifact on a Learner-chosen topic, created by the Learner and presented in Nepali or the Learner's primary language.
5. THE Capstone_Artifact SHALL be a researched answer or short explainer created by the Learner.
6. WHERE a Learner proposes an alternative artifact format, THE Capstone_Project SHALL allow the alternative format provided the artifact demonstrates the skills required in criterion 7.
7. THE Capstone_Project SHALL require the Learner to demonstrate at least one observable skill from each Phase 1 Domain.
8. WHEN a Learner produces a Capstone_Artifact, THE Curriculum SHALL require the Learner to cite at least two sources used and to describe the steps taken to verify the information.
9. WHEN a Learner is ready to share a Capstone_Artifact, THE Curriculum SHALL require the Learner to first check that the artifact contains no personal or sensitive information that should remain private.
10. IF a Learner cannot complete the Capstone_Project independently, THEN THE Curriculum SHALL provide guided facilitator support while still requiring the Learner to perform the required skills.

### Requirement 9: AI Literacy as a Cross-Cutting Thread

**User Story:** As a Learner, I want AI literacy woven through the whole curriculum, so that I understand AI as something I already use, not just one topic.

#### Acceptance Criteria

1. THE Curriculum SHALL include, in every one of the six Phase 1 Domains, at least one explicitly labeled AI literacy element (a teaching point, activity, or AI_Companion interaction) that connects that Domain's topic to AI use, rather than confining AI literacy to a single Domain.
2. THE Curriculum SHALL teach AI-assisted thinking by stating at least two principles that distinguish AI-assisted thinking (the Learner forms an independent judgment and verifies the AI_Companion's output before relying on it) from AI-dependent thinking (the Learner accepts the AI_Companion's output without verification), and SHALL illustrate the distinction with at least one contrasting example.
3. WHEN a Lesson introduces a new task, THE Curriculum SHALL show at least one way the AI_Companion can assist with the task.
4. WHEN a Lesson introduces a new task that uses the AI_Companion, THE Curriculum SHALL identify at least one specific point at which the AI_Companion's output must be verified by the Learner before the Learner relies on it.
5. THE Curriculum SHALL identify, in at least three Domains, at least one everyday tool or feature the Learner already uses that includes AI (such as search, keyboard text suggestions, or social media content feeds), so that the Learner recognizes AI as already in use.

### Requirement 10: Emotional and Attention Self-Defense

**User Story:** As a Learner, I want to understand how apps affect my feelings and attention, so that I can protect my wellbeing online.

#### Acceptance Criteria

1. THE Curriculum SHALL explain at least three specific design techniques that applications use to capture and hold attention, with each technique illustrated by at least one smartphone-based example relevant to rural Nepali Learners.
2. THE Curriculum SHALL teach how comparison, fear of missing out, and rage-baiting content can affect a Learner's emotions, defining each of the three concepts in Nepali using low-English vocabulary and providing at least one concrete example per concept.
3. THE Curriculum SHALL teach at least two practical strategies a Learner can apply to manage attention and emotional response to online content, with each strategy described as a sequence of observable steps a Learner can perform on a smartphone.
4. WHEN a Learner completes the module, THE Curriculum SHALL provide a self-check activity containing at least three questions that require the Learner to identify a design technique, name an emotional effect, and select an applicable management strategy.
5. IF a Learner encounters content that triggers distress during an activity, THEN THE Curriculum SHALL present a safety-first prompt in Nepali directing the Learner to pause the activity and seek a trusted adult or facilitator.

### Requirement 11: Digital Money Awareness

**User Story:** As a Learner, I want to understand mobile money and its scams, so that I can use digital payments safely.

#### Acceptance Criteria

1. THE Curriculum SHALL explain, in Nepali using at least one worked everyday example (such as receiving or sending money), how mobile wallets and digital payments work in the local context, without requiring the Learner to perform a real transaction.
2. THE Curriculum SHALL teach the Learner to recognize at least three common mobile-payment scams, presenting each scam with its warning signs and at least one concrete example.
3. THE Curriculum SHALL present all digital money content explicitly framed as personal safety guidance and SHALL NOT include financial, investment, lending, or earnings advice.
4. THE Curriculum SHALL teach refusal and verification as general safety practices that a Learner applies at all times, independent of whether a suspicious request is currently present.
5. IF a Learner receives an unexpected request to send money or share payment credentials (such as a PIN, OTP, or wallet password), THEN THE Curriculum SHALL instruct the Learner to refuse the request and to verify it through a trusted channel, defined as direct contact with a known person or official provider using contact details the Learner already has rather than details supplied in the request.
6. WHILE the Learner is unable to verify a suspicious money request through a trusted channel, THE Curriculum SHALL instruct the Learner to take no action on the request, share no payment credentials, and seek help from a trusted person.

### Requirement 12: Standard Lesson Structure

**User Story:** As a Facilitator, I want every lesson to follow the same structure, so that lessons are predictable and easy to deliver.

#### Acceptance Criteria

1. THE Lesson_Template SHALL contain exactly the following six sections in this fixed order: Learning Goal, Starter Question, Guided AI Exploration, Practical Activity, Reflection, and Your Turn (an open apply task).
2. THE Curriculum SHALL build every Lesson using the Lesson_Template such that each published Lesson contains all six sections defined in the Lesson_Template, each section appearing in the order defined in criterion 1.
3. THE Guided AI Exploration section SHALL provide between 3 and 7 structured prompts drawn from the AI_Prompt_Set, presented in Nepali, that a Learner can use with the AI_Companion.
4. THE Practical Activity section SHALL define one hands-on task that a Learner can complete in the Computer_Lab without requiring any paid service, and SHALL provide a smartphone-friendly version of the task where practical.
5. THE Learning Goal section SHALL state exactly one Phase_1_Outcome that the Lesson contributes to.
6. IF a Lesson is missing one or more of the six required sections, or presents them out of the order defined in criterion 1, THEN THE Curriculum SHALL flag the Lesson as incomplete and exclude it from publication, retaining the existing draft content for correction.
7. WHERE a Learner has no available smartphone, THE Practical Activity section SHALL provide one offline alternative task that the Learner can complete without a device.

### Requirement 13: Language Accessibility

**User Story:** As a Learner with weak English, I want content in simple language and Nepali, so that language is not a barrier to learning.

#### Acceptance Criteria

1. THE Content_System SHALL write all learning content using sentences of no more than 15 words each and a vocabulary limited to common everyday words, avoiding undefined English jargon.
2. THE Content_System SHALL provide a complete Nepali translation for 100 percent of each Lesson's learning content, including instructions, examples, and assessment questions.
3. IF a Lesson is missing its Nepali translation for any content element, THEN THE Content_System SHALL withhold that Lesson from publication and indicate the missing-translation status to the content author.
4. THE AI_Companion SHALL accept and respond to Learner input in Nepali, in English, and in mixed Nepali-English within a single interaction.
5. THE AI_Companion SHALL support voice input by accepting spoken Nepali and English, and SHALL support voice output by producing spoken Nepali responses.
6. IF the AI_Companion cannot interpret a voice input after 2 attempts, THEN THE AI_Companion SHALL prompt the Learner to retry or switch to text input, and SHALL retain the current interaction context.
7. WHERE a technical term is introduced, THE Content_System SHALL define the term in simple language, accompanied by its Nepali equivalent, before the first use of the term.
8. WHEN a technical term is displayed after its first introduction, THE Content_System SHALL make the term's definition available to the Learner on demand.

### Requirement 14: Rural, Offline-Aware, and Shared-Device Design

**User Story:** As a Learner in a rural area with poor connectivity and shared devices, I want the curriculum to work in my conditions, so that I can still learn.

#### Acceptance Criteria

1. THE Curriculum SHALL treat the Computer_Lab as the primary delivery tier where the full experience, including AI_Companion-assisted activities, is available, and SHALL make the core learning content — each Lesson's text in Nepali and English plus its review and reflection activities — available on a single entry-level smartphone as a basic learning tier.
2. THE Curriculum SHALL be deliverable using the Computer_Lab when at least 5 shared computers are available, and SHALL remain fully deliverable when more than 5 computers are available, with no activity requiring a one-Learner-per-computer ratio.
3. WHERE internet connectivity is intermittent, THE Curriculum SHALL provide an offline activity path covering at least 80 percent of each lesson's core learning activities that a Learner can complete without any active internet connection.
4. WHEN a Learner begins an offline activity path, THE Curriculum SHALL state which activities require connectivity and which can be completed offline before the Learner starts the activity.
5. IF an activity requires internet access and connectivity is unavailable, THEN THE Curriculum SHALL allow the Learner to defer that activity and continue with the next offline-capable activity, retaining any progress already completed.
6. THE Curriculum SHALL design every activity so that a Learner can use a shared or family device without storing personal credentials, personal account logins, or personally identifying data on the device.
7. WHEN a Learner finishes an activity on a shared or family device, THE Curriculum SHALL instruct the Learner to remove any personal data entered during the session before the device is passed to another person.
8. THE Curriculum SHALL use Nepal-based local context examples drawn from rural daily life, including local marketplaces, agriculture, and community interests, in at least one activity per lesson, with all example text presented in Nepali.

### Requirement 15: Tone and Age Appropriateness

**User Story:** As an NGO program lead, I want a safety-first but non-fear-based tone, so that learners aged 12–18 feel encouraged rather than frightened.

#### Acceptance Criteria

1. THE Content_System SHALL use a safety-first tone in which any reference to a risk or threat is accompanied by a constructive action, and SHALL exclude language whose primary effect is to alarm, frighten, or shame the Learner (for example, threats of harm without a stated remedy).
2. THE Content_System SHALL present all instructional language and examples in Nepali at a low-English reading level suitable for Learners aged 12 to 18, using rural, smartphone-first scenarios drawn from the Learner's everyday context.
3. WHERE a participant's age is from 10 to 20 (within 2 years of the 12 to 18 target range), THE Curriculum SHALL allow the participant to use the Content_System without restriction.
4. IF a participant's age is below 10 or above 20, THEN THE Curriculum SHALL indicate that the participant is outside the supported age range while still allowing access.
5. WHEN the Curriculum presents a risk or threat, THE Content_System SHALL pair that risk, within the same lesson screen, with at least one specific constructive action the Learner can take to respond to or prevent it.

### Requirement 16: Facilitator Supportability

**User Story:** As a Facilitator with limited technical skill, I want clear guidance for each lesson, so that I can deliver lessons confidently.

#### Acceptance Criteria

1. THE Facilitator_Guide SHALL provide delivery guidance for every Lesson, and that guidance SHALL include the Lesson learning objectives, a numbered step-by-step delivery sequence, the estimated delivery duration in minutes, and the list of required materials and smartphone setup steps.
2. THE Facilitator_Guide SHALL be written in Nepali using plain language understandable by a Facilitator who has completed basic schooling, and SHALL contain no untranslated English technical terms without an accompanying Nepali explanation.
3. THE Facilitator_Guide SHALL state the role of the Facilitator as a mentor and learning architect who guides Learners to find answers, rather than as the sole source of answers.
4. WHERE a Lesson uses the AI_Companion, THE Facilitator_Guide SHALL provide guidance on supervising the Learner's use of the AI_Companion, including how to recognize an unsafe or incorrect AI_Companion response and the specific steps the Facilitator must take in response.
5. WHEN a Lesson includes a hands-on smartphone activity, THE Facilitator_Guide SHALL provide numbered on-screen navigation instructions for each step of that activity.
6. IF a Learner encounters content or an AI_Companion response that the Facilitator identifies as unsafe or distressing, THEN THE Facilitator_Guide SHALL provide a defined escalation procedure stating the actions the Facilitator must take and to whom the issue must be reported.

### Requirement 17: Engagement Through Community Activities

**User Story:** As a Learner, I want projects connected to my interests like football and art, so that learning feels relevant and engaging.

#### Acceptance Criteria

1. THE Curriculum SHALL provide a selectable list of at least 5 project themes drawn from community activities relevant to rural Nepal (such as football, art, farming, local festivals, or local marketplaces), and SHALL present the list to each Learner in Nepali before the Mini Project and Capstone_Project begin.
2. WHEN a Learner selects a project theme from the list, THE Curriculum SHALL apply the selected theme to that Learner's Mini Project and Capstone_Project activities and examples.
3. WHERE a Learner makes no theme selection before starting a project, THE Curriculum SHALL assign a default project theme drawn from the list in criterion 1 so the Mini Project and Capstone_Project can proceed without delay.
4. WHEN a Learner requests to change a previously selected project theme before completing the project, THE Curriculum SHALL allow the Learner to select a different theme from the list in criterion 1 without losing prior project progress.
5. IF a Learner proposes a project theme that is not on the list in criterion 1, THEN THE Curriculum SHALL allow the proposed theme only when it contains no personal or sensitive information and conforms to the Phase 1 safety-first principle, and SHALL otherwise reject the proposed theme and direct the Learner to select a theme from the list.
