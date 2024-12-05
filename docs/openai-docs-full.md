*Note: This is llms-full.txt is not complete, please enter a Firecrawl API key to get the entire llms-full.txt at llmstxt.firecrawl.dev or you can access llms.txt via API with curl -X GET 'http://llmstxt.firecrawl.dev/https://platform.openai.com/docs/overview?FIRECRAWL_API_KEY=YOUR_API_KEY' or llms-full.txt via API with curl -X GET 'http://llmstxt.firecrawl.dev/https://platform.openai.com/docs/overview/full?FIRECRAWL_API_KEY=YOUR_API_KEY'

# https://platform.openai.com/docs/overview llms-full.txt

# Oops!

We ran into an issue while authenticating you. If this issue persists, please contact us through our help center at https://help.openai.com.

Return to homepageLog in [Sign up](/signup)

Authentication required

Please log in to access this page

Log inSign upLog in [Sign up](/signup)

Authentication required

Please log in to access this page

Log inSign upOpenAI

[**ChatGPT**\\
\\
Interact with our flagship language models in a conversational interface](https://chatgpt.com/auth/login) [**API**\\
\\
Integrate OpenAI models into your application or business](/)Log in [Sign up](/signup)Log in [Sign up](/signup)

# Assistants API overview  Beta

Copy page

Build AI Assistants with essential tools and integrations.

The Assistants API allows you to build AI assistants within your own applications. An Assistant has instructions and can leverage models, tools, and files to respond to user queries.
The Assistants API currently supports three types of [tools](/docs/assistants/tools): Code Interpreter, File Search, and Function calling.

You can explore the capabilities of the Assistants API using the [Assistants playground](/playground?mode=assistant) or by building a step-by-step integration outlined in our [Assistants API quickstart](/docs/assistants/quickstart).

## How Assistants work

The Assistants API is designed to help developers build powerful AI assistants capable of performing a variety of tasks.

The Assistants API is in **beta** and we are actively working on adding more functionality. Share your feedback in our [Developer Forum](https://community.openai.com/)!

1. Assistants can call OpenAI’s **[models](/docs/models)** with specific instructions to tune their personality and capabilities.
2. Assistants can access **multiple tools in parallel**. These can be both OpenAI-hosted tools — like [code\_interpreter](/docs/assistants/tools/code-interpreter) and [file\_search](/docs/assistants/tools/file-search) — or tools you build / host (via [function calling](/docs/assistants/tools/function-calling)).
3. Assistants can access **persistent Threads**. Threads simplify AI application development by storing message history and truncating it when the conversation gets too long for the model’s context length. You create a Thread once, and simply append Messages to it as your users reply.
4. Assistants can access files in several formats — either as part of their creation or as part of Threads between Assistants and users. When using tools, Assistants can also create files (e.g., images, spreadsheets, etc) and cite files they reference in the Messages they create.

## Objects

![Assistants object architecture diagram](https://cdn.openai.com/API/docs/images/diagram-assistant.webp)

| Object | What it represents |
| --- | --- |
| Assistant | Purpose-built AI that uses OpenAI’s [models](/docs/models) and calls [tools](/docs/assistants/tools) |
| Thread | A conversation session between an Assistant and a user. Threads store Messages and automatically handle truncation to fit content into a model’s context. |
| Message | A message created by an Assistant or a user. Messages can include text, images, and other files. Messages stored as a list on the Thread. |
| Run | An invocation of an Assistant on a Thread. The Assistant uses its configuration and the Thread’s Messages to perform tasks by calling models and tools. As part of a Run, the Assistant appends Messages to the Thread. |
| Run Step | A detailed list of steps the Assistant took as part of a Run. An Assistant can call tools or create Messages during its run. Examining Run Steps allows you to introspect how the Assistant is getting to its final results. |Log in [Sign up](/signup)

# Advanced usage

Copy page

Use advanced techniques for reproducibility and parameter tuning.

OpenAI's text generation models (often called generative pre-trained transformers or large language models) have been trained to understand natural language, code, and images. The models provide text outputs in response to their inputs. The text inputs to these models are also referred to as "prompts". Designing a prompt is essentially how you “program” a large language model model, usually by providing instructions or some examples of how to successfully complete a task.

## Reproducible outputs

Chat Completions are non-deterministic by default (which means model outputs may differ from request to request). That being said, we offer some control towards deterministic outputs by giving you access to the [seed](/docs/api-reference/chat/create#chat-create-seed) parameter and the [system\_fingerprint](/docs/api-reference/completions/object#completions/object-system_fingerprint) response field.

To receive (mostly) deterministic outputs across API calls, you can:

- Set the [seed](/docs/api-reference/chat/create#chat-create-seed) parameter to any integer of your choice and use the same value across requests you'd like deterministic outputs for.
- Ensure all other parameters (like `prompt` or `temperature`) are the exact same across requests.

Sometimes, determinism may be impacted due to necessary changes OpenAI makes to model configurations on our end. To help you keep track of these changes, we expose the [system\_fingerprint](/docs/api-reference/chat/object#chat/object-system_fingerprint) field. If this value is different, you may see different outputs due to changes we've made on our systems.

[Deterministic outputs\\
\\
Explore the new seed parameter in the OpenAI cookbook](https://cookbook.openai.com/examples/reproducible_outputs_with_the_seed_parameter)

## Managing tokens

Language models read and write text in chunks called tokens. In English, a token can be as short as one character or as long as one word (e.g., `a` or ` apple`), and in some languages tokens can be even shorter than one character or even longer than one word.

As a rough rule of thumb, 1 token is approximately 4 characters or 0.75 words for English text.

Check out our [Tokenizer tool](https://platform.openai.com/tokenizer) to test specific strings and see how they are translated into tokens.

For example, the string `"ChatGPT is great!"` is encoded into six tokens: `["Chat", "G", "PT", " is", " great", "!"]`.

The total number of tokens in an API call affects:

- How much your API call costs, as you pay per token
- How long your API call takes, as writing more tokens takes more time
- Whether your API call works at all, as total tokens must be below the model's maximum limit (4097 tokens for `gpt-3.5-turbo`)

Both input and output tokens count toward these quantities. For example, if your API call used 10 tokens in the message input and you received 20 tokens in the message output, you would be billed for 30 tokens. Note however that for some models the price per token is different for tokens in the input vs. the output (see the [pricing](https://openai.com/api/pricing) page for more information).

To see how many tokens are used by an API call, check the `usage` field in the API response (e.g., `response['usage']['total_tokens']`).

Chat models like `gpt-3.5-turbo` and `gpt-4-turbo-preview` use tokens in the same way as the models available in the completions API, but because of their message-based formatting, it's more difficult to count how many tokens will be used by a conversation.

Deep dive

Counting tokens for chat API calls

To see how many tokens are in a text string without making an API call, use OpenAI’s [tiktoken](https://github.com/openai/tiktoken) Python library. Example code can be found in the OpenAI Cookbook’s guide on [how to count tokens with tiktoken](https://cookbook.openai.com/examples/how_to_count_tokens_with_tiktoken).

Each message passed to the API consumes the number of tokens in the content, role, and other fields, plus a few extra for behind-the-scenes formatting. This may change slightly in the future.

If a conversation has too many tokens to fit within a model’s maximum limit (e.g., more than 4097 tokens for `gpt-3.5-turbo` or more than 128k tokens for `gpt-4o`), you will have to truncate, omit, or otherwise shrink your text until it fits. Beware that if a message is removed from the messages input, the model will lose all knowledge of it.

Note that very long conversations are more likely to receive incomplete replies. For example, a `gpt-3.5-turbo` conversation that is 4090 tokens long will have its reply cut off after just 6 tokens.

## Parameter details

### Frequency and presence penalties

The frequency and presence penalties found in the [Chat Completions API](/docs/api-reference/chat/create) and [Legacy Completions API](/docs/api-reference/completions) can be used to reduce the likelihood of sampling repetitive sequences of tokens.

Deep dive

Penalties behind the scenes

Reasonable values for the penalty coefficients are around 0.1 to 1 if the aim is to just reduce repetitive samples somewhat. If the aim is to strongly suppress repetition, then one can increase the coefficients up to 2, but this can noticeably degrade the quality of samples. Negative values can be used to increase the likelihood of repetition.

### Token log probabilities

The [logprobs](/docs/api-reference/chat/create#chat-create-logprobs) parameter found in the [Chat Completions API](/docs/api-reference/chat/create) and [Legacy Completions API](/docs/api-reference/completions), when requested, provides the log probabilities of each output token, and a limited number of the most likely tokens at each token position alongside their log probabilities. This can be useful in some cases to assess the confidence of the model in its output, or to examine alternative responses the model might have given.

### Other parameters

See the full [API reference documentation](https://platform.openai.com/docs/api-reference/chat) to learn more.Log in [Sign up](/signup)

Authentication required

Please log in to access this page

Log inSign upLog in [Sign up](/signup)

Page not found

We couldn't find the page you were looking for.

Was this expected?Log in [Sign up](/signup)

Page not found

We couldn't find the page you were looking for.

Was this expected?Log in [Sign up](/signup)

Authentication required

Please log in to access this page

Log inSign upLog in [Sign up](/signup)

Authentication required

Please log in to access this page

Log inSign upLog in [Sign up](/signup)

Page not found

We couldn't find the page you were looking for.

Was this expected?Log in [Sign up](/signup)

Page not found

We couldn't find the page you were looking for.

Was this expected?Log in [Sign up](/signup)

Page not found

We couldn't find the page you were looking for.

Was this expected?Log in [Sign up](/signup)

# What's new in Assistants API  Beta

Copy page

Discover new features and improvements in Assistants API.

## April 2024

We are announcing a variety of new features and improvements to the Assistants API and moving our Beta to a new API version, `OpenAI-Beta: assistants=v2`. Here's what's new:

- We're launching an [improved retrieval tool called `file_search`](/docs/assistants/tools/file-search), which can ingest up to 10,000 files per assistant - 500x more than before. It is faster, supports parallel queries through multi-threaded searches, and features enhanced reranking and query rewriting.
- Alongside `file_search`, we're introducing [`vector_store` objects](/docs/assistants/tools/file-search#vector-stores) in the API. Once a file is added to a vector store, it's automatically parsed, chunked, and embedded, made ready to be searched. Vector stores can be used across assistants and threads, simplifying file management and billing.
- You can now [control the maximum number of tokens](/docs/assistants/overview) a run uses in the Assistants API, allowing you to manage token usage costs. You can also set limits on the number of previous / recent messages used in each run.
- We've added support for the [`tool_choice` parameter](/docs/api-reference/runs/object#runs/object-tool_choice) which can be used to force the use of a specific tool (like `file_search`, `code_interpreter`, or a `function`) in a particular run.
- You can now [create messages with the role `assistant`](/docs/api-reference/messages/createMessage#messages-createmessage-role) to create custom conversation histories in Threads.
- Assistant and Run objects now support popular model configuration parameters like [`temperature`](/docs/api-reference/assistants/createAssistant#assistants-createassistant-temperature), [`response_format` (JSON mode)](/docs/api-reference/assistants/createAssistant#assistants-createassistant-response_format), and [`top_p`](/docs/api-reference/assistants/createAssistant#assistants-createassistant-top_p).
- You can now use [fine-tuned models](/docs/guides/fine-tuning) in the Assistants API. At the moment, only fine-tuned versions of `gpt-3.5-turbo-0125` are supported.
- Assistants API now supports [streaming](/docs/assistants/overview#step-4-create-a-run?context=with-streaming).
- We've added several streaming and polling helpers to our [Node](https://github.com/openai/openai-node/blob/master/helpers.md) and [Python](https://github.com/openai/openai-python/blob/main/helpers.md) SDKs.

See our [migration guide](/docs/assistants/migration) to learn more about how to migrate your tool usage to the latest version of the Assistants API.Log in [Sign up](/signup)

# GPT Actions library

Copy page

Build and integrate GPT Actions for common applications.

## Purpose

While GPT Actions should be significantly less work for an API developer to set up than an entire application using those APIs from scratch, there’s still some set up required to get GPT Actions up and running. A Library of GPT Actions is meant to provide guidance for building GPT Actions on common applications.

## Getting started

If you’ve never built an action before, start by reading the [getting started guide](https://platform.openai.com/docs/actions/getting-started) first to understand better how actions work.

Generally, this guide is meant for people with familiarity and comfort with calling API calls. For debugging help, try to explain your issues to ChatGPT - and include screenshots.

## How to access

[The OpenAI Cookbook](https://cookbook.openai.com/) has a [directory](https://cookbook.openai.com/topic/chatgpt) of 3rd party applications and middleware application.

### 3rd party Actions cookbook

GPT Actions can integrate with HTTP services directly. GPT Actions leveraging SaaS API directly will authenticate and request resources directly from SaaS providers, such as [Google Drive](https://cookbook.openai.com/examples/chatgpt/gpt_actions_library/gpt_action_google_drive) or [Snowflake](https://cookbook.openai.com/examples/chatgpt/gpt_actions_library/gpt_action_snowflake_direct).

### Middleware Actions cookbook

GPT Actions can benefit from having a middleware. It allows pre-processing, data formatting, data filtering or even connection to endpoints not exposed through HTTP (e.g: databases). Multiple middleware cookbooks are available describing an example implementation path, such as [Azure](https://cookbook.openai.com/examples/chatgpt/gpt_actions_library/gpt_middleware_azure_function), [GCP](https://cookbook.openai.com/examples/chatgpt/gpt_actions_library/gpt_middleware_google_cloud_function) and [AWS](https://cookbook.openai.com/examples/chatgpt/gpt_actions_library/gpt_middleware_aws_function).

## Give us feedback

Are there integrations that you’d like us to prioritize? Are there errors in our integrations? File a PR or issue on the cookbook page's github, and we’ll take a look.

## Contribute to our library

If you’re interested in contributing to our library, please follow the below guidelines, then submit a PR in github for us to review. In general, follow the template similar to [this example GPT Action](https://cookbook.openai.com/examples/chatgpt/gpt_actions_library/gpt_action_bigquery).

Guidelines - include the following sections:

- Application Information - describe the 3rd party application, and include a link to app website and API docs
- Custom GPT Instructions - include the exact instructions to be included in a Custom GPT
- OpenAPI Schema - include the exact OpenAPI schema to be included in the GPT Action
- Authentication Instructions - for OAuth, include the exact set of items (authorization URL, token URL, scope, etc.); also include instructions on how to write the callback URL in the application (as well as any other steps)
- FAQ and Troubleshooting - what are common pitfalls that users may encounter? Write them here and workarounds

## Disclaimers

This action library is meant to be a guide for interacting with 3rd parties that OpenAI have no control over. These 3rd parties may change their API settings or configurations, and OpenAI cannot guarantee these Actions will work in perpetuity. Please see them as a starting point.

This guide is meant for developers and people with comfort writing API calls. Non-technical users will likely find these steps challenging.Log in [Sign up](/signup)

# Assistants API tools  Beta

Copy page

Explore tools for file search, code, and function calling.

Assistants created using the Assistants API can be equipped with tools that allow them to perform more complex tasks or interact with your application.
We provide built-in tools for assistants, but you can also define your own tools to extend their capabilities using Function Calling.

The Assistants API currently supports the following tools:

[File Search\\
\\
Built-in RAG tool to process and search through files](/docs/assistants/tools/file-search) [Code Interpreter\\
\\
Write and run python code, process files and diverse data](/docs/assistants/tools/code-interpreter) [Function Calling\\
\\
Use your own custom functions to interact with your application](/docs/assistants/tools/function-calling)

## Next steps

- See the API reference to [submit tool outputs](/docs/api-reference/runs/submitToolOutputs)

- Build a tool-using assistant with our [Quickstart app](https://github.com/openai/openai-assistants-quickstart)Log in [Sign up](/signup)

# Prompt engineering

Copy page

Enhance results with prompt engineering strategies.

This guide shares strategies and tactics for getting better results from large language models (sometimes referred to as GPT models) like GPT-4o. The methods described here can sometimes be deployed in combination for greater effect. We encourage experimentation to find the methods that work best for you.

You can also explore example prompts which showcase what our models are capable of:

[Prompt examples\\
\\
Explore prompt examples to learn what GPT models can do](/examples)

## Six strategies for getting better results

### Write clear instructions

These models can’t read your mind. If outputs are too long, ask for brief replies. If outputs are too simple, ask for expert-level writing. If you dislike the format, demonstrate the format you’d like to see. The less the model has to guess at what you want, the more likely you’ll get it.

Tactics:

- [Include details in your query to get more relevant answers](#tactic-include-details-in-your-query-to-get-more-relevant-answers)
- [Ask the model to adopt a persona](#tactic-ask-the-model-to-adopt-a-persona)
- [Use delimiters to clearly indicate distinct parts of the input](#tactic-use-delimiters-to-clearly-indicate-distinct-parts-of-the-input)
- [Specify the steps required to complete a task](#tactic-specify-the-steps-required-to-complete-a-task)
- [Provide examples](#tactic-provide-examples)
- [Specify the desired length of the output](#tactic-specify-the-desired-length-of-the-output)

### Provide reference text

Language models can confidently invent fake answers, especially when asked about esoteric topics or for citations and URLs. In the same way that a sheet of notes can help a student do better on a test, providing reference text to these models can help in answering with fewer fabrications.

Tactics:

- [Instruct the model to answer using a reference text](#tactic-instruct-the-model-to-answer-using-a-reference-text)
- [Instruct the model to answer with citations from a reference text](#tactic-instruct-the-model-to-answer-with-citations-from-a-reference-text)

### Split complex tasks into simpler subtasks

Just as it is good practice in software engineering to decompose a complex system into a set of modular components, the same is true of tasks submitted to a language model. Complex tasks tend to have higher error rates than simpler tasks. Furthermore, complex tasks can often be re-defined as a workflow of simpler tasks in which the outputs of earlier tasks are used to construct the inputs to later tasks.

Tactics:

- [Use intent classification to identify the most relevant instructions for a user query](#tactic-use-intent-classification-to-identify-the-most-relevant-instructions-for-a-user-query)
- [For dialogue applications that require very long conversations, summarize or filter previous dialogue](#tactic-for-dialogue-applications-that-require-very-long-conversations-summarize-or-filter-previous-dialogue)
- [Summarize long documents piecewise and construct a full summary recursively](#tactic-summarize-long-documents-piecewise-and-construct-a-full-summary-recursively)

### Give the model time to "think"

If asked to multiply 17 by 28, you might not know it instantly, but can still work it out with time. Similarly, models make more reasoning errors when trying to answer right away, rather than taking time to work out an answer. Asking for a "chain of thought" before an answer can help the model reason its way toward correct answers more reliably.

Tactics:

- [Instruct the model to work out its own solution before rushing to a conclusion](#tactic-instruct-the-model-to-work-out-its-own-solution-before-rushing-to-a-conclusion)
- [Use inner monologue or a sequence of queries to hide the model's reasoning process](#tactic-use-inner-monologue-or-a-sequence-of-queries-to-hide-the-model-s-reasoning-process)
- [Ask the model if it missed anything on previous passes](#tactic-ask-the-model-if-it-missed-anything-on-previous-passes)

### Use external tools

Compensate for the weaknesses of the model by feeding it the outputs of other tools. For example, a text retrieval system (sometimes called RAG or retrieval augmented generation) can tell the model about relevant documents. A code execution engine like OpenAI's Code Interpreter can help the model do math and run code. If a task can be done more reliably or efficiently by a tool rather than by a language model, offload it to get the best of both.

Tactics:

- [Use embeddings-based search to implement efficient knowledge retrieval](#tactic-use-embeddings-based-search-to-implement-efficient-knowledge-retrieval)
- [Use code execution to perform more accurate calculations or call external APIs](#tactic-use-code-execution-to-perform-more-accurate-calculations-or-call-external-apis)
- [Give the model access to specific functions](#tactic-give-the-model-access-to-specific-functions)

### Test changes systematically

Improving performance is easier if you can measure it. In some cases a modification to a prompt will achieve better performance on a few isolated examples but lead to worse overall performance on a more representative set of examples. Therefore to be sure that a change is net positive to performance it may be necessary to define a comprehensive test suite (also known an as an "eval").

Tactic:

- [Evaluate model outputs with reference to gold-standard answers](#tactic-evaluate-model-outputs-with-reference-to-gold-standard-answers)

## Tactics

Each of the strategies listed above can be instantiated with specific tactics. These tactics are meant to provide ideas for things to try. They are by no means fully comprehensive, and you should feel free to try creative ideas not represented here.

### Strategy: Write clear instructions

#### Tactic: Include details in your query to get more relevant answers

In order to get a highly relevant response, make sure that requests provide any important details or context. Otherwise you are leaving it up to the model to guess what you mean.

|  |  |
| --- | --- |
| **Worse** | **Better** |
| How do I add numbers in Excel? | How do I add up a row of dollar amounts in Excel? I want to do this automatically for a whole sheet of rows with all the totals ending up on the right in a column called "Total". |
| Who’s president? | Who was the president of Mexico in 2021, and how frequently are elections held? |
| Write code to calculate the Fibonacci sequence. | Write a TypeScript function to efficiently calculate the Fibonacci sequence. Comment the code liberally to explain what each piece does and why it's written that way. |
| Summarize the meeting notes. | Summarize the meeting notes in a single paragraph. Then write a markdown list of the speakers and each of their key points. Finally, list the next steps or action items suggested by the speakers, if any. |

#### Tactic: Ask the model to adopt a persona

The system message can be used to specify the persona used by the model in its replies.

SYSTEM

When I ask for help to write something, you will reply with a document that contains at least one joke or playful comment in every paragraph.

USER

Write a thank you note to my steel bolt vendor for getting the delivery in on time and in short notice. This made it possible for us to deliver an important order.

#### Tactic: Use delimiters to clearly indicate distinct parts of the input

Delimiters like triple quotation marks, XML tags, section titles, etc. can help demarcate sections of text to be treated differently.

USER

Summarize the text delimited by triple quotes with a haiku.

"""insert text here"""

SYSTEM

You will be provided with a pair of articles (delimited with XML tags) about the same topic. First summarize the arguments of each article. Then indicate which of them makes a better argument and explain why.

USER

<article> insert first article here </article>

<article> insert second article here </article>

SYSTEM

You will be provided with a thesis abstract and a suggested title for it. The thesis title should give the reader a good idea of the topic of the thesis but should also be eye-catching. If the title does not meet these criteria, suggest 5 alternatives.

USER

Abstract: insert abstract here

Title: insert title here

For straightforward tasks such as these, using delimiters might not make a difference in the output quality. However, the more complex a task is the more important it is to disambiguate task details. Don’t make the model work to understand exactly what you are asking of them.

#### Tactic: Specify the steps required to complete a task

Some tasks are best specified as a sequence of steps. Writing the steps out explicitly can make it easier for the model to follow them.

SYSTEM

Use the following step-by-step instructions to respond to user inputs.

Step 1 - The user will provide you with text in triple quotes. Summarize this text in one sentence with a prefix that says "Summary: ".

Step 2 - Translate the summary from Step 1 into Spanish, with a prefix that says "Translation: ".

USER

"""insert text here"""

#### Tactic: Provide examples

Providing general instructions that apply to all examples is generally more efficient than demonstrating all permutations of a task by example, but in some cases providing examples may be easier. For example, if you intend for the model to copy a particular style of responding to user queries which is difficult to describe explicitly. This is known as "few-shot" prompting.

SYSTEM

Answer in a consistent style.

USER

Teach me about patience.

ASSISTANT

The river that carves the deepest valley flows from a modest spring; the grandest symphony originates from a single note; the most intricate tapestry begins with a solitary thread.

USER

Teach me about the ocean.

#### Tactic: Specify the desired length of the output

You can ask the model to produce outputs that are of a given target length. The targeted output length can be specified in terms of the count of words, sentences, paragraphs, bullet points, etc. Note however that instructing the model to generate a specific number of words does not work with high precision. The model can more reliably generate outputs with a specific number of paragraphs or bullet points.

USER

Summarize the text delimited by triple quotes in about 50 words.

"""insert text here"""

USER

Summarize the text delimited by triple quotes in 2 paragraphs.

"""insert text here"""

USER

Summarize the text delimited by triple quotes in 3 bullet points.

"""insert text here"""

### Strategy: Provide reference text

#### Tactic: Instruct the model to answer using a reference text

If we can provide a model with trusted information that is relevant to the current query, then we can instruct the model to use the provided information to compose its answer.

SYSTEM

Use the provided articles delimited by triple quotes to answer questions. If the answer cannot be found in the articles, write "I could not find an answer."

USER

<insert articles, each delimited by triple quotes>

Question: <insert question here>

Given that all models have limited context windows, we need some way to dynamically lookup information that is relevant to the question being asked. [Embeddings](https://platform.openai.com/docs/guides/embeddings#what-are-embeddings) can be used to implement efficient knowledge retrieval. See the tactic ["Use embeddings-based search to implement efficient knowledge retrieval"](#tactic-use-embeddings-based-search-to-implement-efficient-knowledge-retrieval) for more details on how to implement this.

#### Tactic: Instruct the model to answer with citations from a reference text

If the input has been supplemented with relevant knowledge, it's straightforward to request that the model add citations to its answers by referencing passages from provided documents. Note that citations in the output can then be verified programmatically by string matching within the provided documents.

SYSTEM

You will be provided with a document delimited by triple quotes and a question. Your task is to answer the question using only the provided document and to cite the passage(s) of the document used to answer the question. If the document does not contain the information needed to answer this question then simply write: "Insufficient information." If an answer to the question is provided, it must be annotated with a citation. Use the following format for to cite relevant passages ({"citation": …}).

USER

"""<insert document here>"""

Question: <insert question here>

### Strategy: Split complex tasks into simpler subtasks

#### Tactic: Use intent classification to identify the most relevant instructions for a user query

For tasks in which lots of independent sets of instructions are needed to handle different cases, it can be beneficial to first classify the type of query and to use that classification to determine which instructions are needed. This can be achieved by defining fixed categories and hardcoding instructions that are relevant for handling tasks in a given category. This process can also be applied recursively to decompose a task into a sequence of stages. The advantage of this approach is that each query will contain only those instructions that are required to perform the next stage of a task which can result in lower error rates compared to using a single query to perform the whole task. This can also result in lower costs since larger prompts cost more to run ( [see pricing information](https://openai.com/api/pricing)).

Suppose for example that for a customer service application, queries could be usefully classified as follows:

SYSTEM

You will be provided with customer service queries. Classify each query into a primary category and a secondary category. Provide your output in json format with the keys: primary and secondary.

Primary categories: Billing, Technical Support, Account Management, or General Inquiry.

Billing secondary categories:
\- Unsubscribe or upgrade
\- Add a payment method
\- Explanation for charge
\- Dispute a charge

Technical Support secondary categories:
\- Troubleshooting
\- Device compatibility
\- Software updates

Account Management secondary categories:
\- Password reset
\- Update personal information
\- Close account
\- Account security

General Inquiry secondary categories:
\- Product information
\- Pricing
\- Feedback
\- Speak to a human

USER

I need to get my internet working again.

Based on the classification of the customer query, a set of more specific instructions can be provided to a model for it to handle next steps. For example, suppose the customer requires help with "troubleshooting".

SYSTEM

You will be provided with customer service inquiries that require troubleshooting in a technical support context. Help the user by:

\- Ask them to check that all cables to/from the router are connected. Note that it is common for cables to come loose over time.
\- If all cables are connected and the issue persists, ask them which router model they are using
\- Now you will advise them how to restart their device:
\-\- If the model number is MTD-327J, advise them to push the red button and hold it for 5 seconds, then wait 5 minutes before testing the connection.
\-\- If the model number is MTD-327S, advise them to unplug and replug it, then wait 5 minutes before testing the connection.
\- If the customer's issue persists after restarting the device and waiting 5 minutes, connect them to IT support by outputting {"IT support requested"}.
\- If the user starts asking questions that are unrelated to this topic then confirm if they would like to end the current chat about troubleshooting and classify their request according to the following scheme:

<insert primary/secondary classification scheme from above here>

USER

I need to get my internet working again.

Notice that the model has been instructed to emit special strings to indicate when the state of the conversation changes. This enables us to turn our system into a state machine where the state determines which instructions are injected. By keeping track of state, what instructions are relevant at that state, and also optionally what state transitions are allowed from that state, we can put guardrails around the user experience that would be hard to achieve with a less structured approach.

#### Tactic: For dialogue applications that require very long conversations, summarize or filter previous dialogue

Since models have a fixed context length, dialogue between a user and an assistant in which the entire conversation is included in the context window cannot continue indefinitely.

There are various workarounds to this problem, one of which is to summarize previous turns in the conversation. Once the size of the input reaches a predetermined threshold length, this could trigger a query that summarizes part of the conversation and the summary of the prior conversation could be included as part of the system message. Alternatively, prior conversation could be summarized asynchronously in the background throughout the entire conversation.

An alternative solution is to dynamically select previous parts of the conversation that are most relevant to the current query. See the tactic ["Use embeddings-based search to implement efficient knowledge retrieval"](#tactic-use-embeddings-based-search-to-implement-efficient-knowledge-retrieval).

#### Tactic: Summarize long documents piecewise and construct a full summary recursively

Since models have a fixed context length, they cannot be used to summarize a text longer than the context length minus the length of the generated summary in a single query.

To summarize a very long document such as a book we can use a sequence of queries to summarize each section of the document. Section summaries can be concatenated and summarized producing summaries of summaries. This process can proceed recursively until an entire document is summarized. If it’s necessary to use information about earlier sections in order to make sense of later sections, then a further trick that can be useful is to include a running summary of the text that precedes any given point in the book while summarizing content at that point. The effectiveness of this procedure for summarizing books has been studied in previous [research](https://openai.com/research/summarizing-books) by OpenAI using variants of GPT-3.

### Strategy: Give models time to "think"

#### Tactic: Instruct the model to work out its own solution before rushing to a conclusion

Sometimes we get better results when we explicitly instruct the model to reason from first principles before coming to a conclusion. Suppose for example we want a model to evaluate a student’s solution to a math problem. The most obvious way to approach this is to simply ask the model if the student's solution is correct or not.

SYSTEM

Determine if the student's solution is correct or not.

USER

Problem Statement: I'm building a solar power installation and I need help working out the financials.
\- Land costs $100 / square foot
\- I can buy solar panels for $250 / square foot
\- I negotiated a contract for maintenance that will cost me a flat $100k per year, and an additional $10 / square foot
What is the total cost for the first year of operations as a function of the number of square feet.

Student's Solution: Let x be the size of the installation in square feet.
1\. Land cost: 100x
2\. Solar panel cost: 250x
3\. Maintenance cost: 100,000 + 100x
Total cost: 100x + 250x + 100,000 + 100x = 450x + 100,000

ASSISTANT

The student's solution is correct.

But the student's solution is actually not correct! We can get the model to successfully notice this by prompting the model to generate its own solution first.

SYSTEM

First work out your own solution to the problem. Then compare your solution to the student's solution and evaluate if the student's solution is correct or not. Don't decide if the student's solution is correct until you have done the problem yourself.

USER

Problem Statement: I'm building a solar power installation and I need help working out the financials.
\- Land costs $100 / square foot
\- I can buy solar panels for $250 / square foot
\- I negotiated a contract for maintenance that will cost me a flat $100k per year, and an additional $10 / square foot
What is the total cost for the first year of operations as a function of the number of square feet.

Student's Solution: Let x be the size of the installation in square feet.
1\. Land cost: 100x
2\. Solar panel cost: 250x
3\. Maintenance cost: 100,000 + 100x
Total cost: 100x + 250x + 100,000 + 100x = 450x + 100,000

ASSISTANT

Let x be the size of the installation in square feet.
1\. Land cost: 100x
2\. Solar panel cost: 250x
3\. Maintenance cost: 100,000 + 10x
Total cost: 100x + 250x + 100,000 + 10x = 360x + 100,000

The student's solution is incorrect. They made an error in the maintenance cost calculation, using 100x instead of 10x. The correct total cost for the first year of operations is 360x + 100,000.

#### Tactic: Use inner monologue or a sequence of queries to hide the model's reasoning process

The previous tactic demonstrates that it is sometimes important for the model to reason in detail about a problem before answering a specific question. For some applications, the reasoning process that a model uses to arrive at a final answer would be inappropriate to share with the user. For example, in tutoring applications we may want to encourage students to work out their own answers, but a model’s reasoning process about the student’s solution could reveal the answer to the student.

Inner monologue is a tactic that can be used to mitigate this. The idea of inner monologue is to instruct the model to put parts of the output that are meant to be hidden from the user into a structured format that makes parsing them easy. Then before presenting the output to the user, the output is parsed and only part of the output is made visible.

SYSTEM

Follow these steps to answer the user queries.

Step 1 - First work out your own solution to the problem. Don't rely on the student's solution since it may be incorrect. Enclose all your work for this step within triple quotes (""").

Step 2 - Compare your solution to the student's solution and evaluate if the student's solution is correct or not. Enclose all your work for this step within triple quotes (""").

Step 3 - If the student made a mistake, determine what hint you could give the student without giving away the answer. Enclose all your work for this step within triple quotes (""").

Step 4 - If the student made a mistake, provide the hint from the previous step to the student (outside of triple quotes). Instead of writing "Step 4 - ..." write "Hint:".

USER

Problem Statement: <insert problem statement>

Student Solution: <insert student solution>

Alternatively, this can be achieved with a sequence of queries in which all except the last have their output hidden from the end user.

First, we can ask the model to solve the problem on its own. Since this initial query doesn't require the student’s solution, it can be omitted. This provides the additional advantage that there is no chance that the model’s solution will be biased by the student’s attempted solution.

USER

<insert problem statement>

Next, we can have the model use all available information to assess the correctness of the student’s solution.

SYSTEM

Compare your solution to the student's solution and evaluate if the student's solution is correct or not.

USER

Problem statement: """<insert problem statement>"""

Your solution: """<insert model generated solution>"""

Student’s solution: """<insert student's solution>"""

Finally, we can let the model use its own analysis to construct a reply in the persona of a helpful tutor.

SYSTEM

You are a math tutor. If the student made an error, offer a hint to the student in a way that does not reveal the answer. If the student did not make an error, simply offer them an encouraging comment.

USER

Problem statement: """<insert problem statement>"""

Your solution: """<insert model generated solution>"""

Student’s solution: """<insert student's solution>"""

Analysis: """<insert model generated analysis from previous step>"""

#### Tactic: Ask the model if it missed anything on previous passes

Suppose that we are using a model to list excerpts from a source which are relevant to a particular question. After listing each excerpt the model needs to determine if it should start writing another or if it should stop. If the source document is large, it is common for a model to stop too early and fail to list all relevant excerpts. In that case, better performance can often be obtained by prompting the model with followup queries to find any excerpts it missed on previous passes.

SYSTEM

You will be provided with a document delimited by triple quotes. Your task is to select excerpts which pertain to the following question: "What significant paradigm shifts have occurred in the history of artificial intelligence."

Ensure that excerpts contain all relevant context needed to interpret them - in other words don't extract small snippets that are missing important context. Provide output in JSON format as follows:

\[{"excerpt": "..."},\
...\
{"excerpt": "..."}\]

USER

"""<insert document here>"""

ASSISTANT

\[{"excerpt": "the model writes an excerpt here"},\
...\
{"excerpt": "the model writes another excerpt here"}\]

USER

Are there more relevant excerpts? Take care not to repeat excerpts. Also ensure that excerpts contain all relevant context needed to interpret them - in other words don't extract small snippets that are missing important context.

### Strategy: Use external tools

#### Tactic: Use embeddings-based search to implement efficient knowledge retrieval

A model can leverage external sources of information if provided as part of its input. This can help the model to generate more informed and up-to-date responses. For example, if a user asks a question about a specific movie, it may be useful to add high quality information about the movie (e.g. actors, director, etc…) to the model’s input. Embeddings can be used to implement efficient knowledge retrieval, so that relevant information can be added to the model input dynamically at run-time.

A text embedding is a vector that can measure the relatedness between text strings. Similar or relevant strings will be closer together than unrelated strings. This fact, along with the existence of fast vector search algorithms means that embeddings can be used to implement efficient knowledge retrieval. In particular, a text corpus can be split up into chunks, and each chunk can be embedded and stored. Then a given query can be embedded and vector search can be performed to find the embedded chunks of text from the corpus that are most related to the query (i.e. closest together in the embedding space).

Example implementations can be found in the [OpenAI Cookbook](https://cookbook.openai.com/examples/vector_databases/readme). See the tactic [“Instruct the model to use retrieved knowledge to answer queries”](#tactic-instruct-the-model-to-answer-using-a-reference-text) for an example of how to use knowledge retrieval to minimize the likelihood that a model will make up incorrect facts.

#### Tactic: Use code execution to perform more accurate calculations or call external APIs

Language models cannot be relied upon to perform arithmetic or long calculations accurately on their own. In cases where this is needed, a model can be instructed to write and run code instead of making its own calculations. In particular, a model can be instructed to put code that is meant to be run into a designated format such as triple backtick. After an output is produced, the code can be extracted and run. Finally, if necessary, the output from the code execution engine (i.e. Python interpreter) can be provided as an input to the model for the next query.

SYSTEM

You can write and execute Python code by enclosing it in triple backticks, e.g. \`\`\`code goes here\`\`\`. Use this to perform calculations.

USER

Find all real-valued roots of the following polynomial: 3\*x\*\*5 - 5\*x\*\*4 - 3\*x\*\*3 - 7\*x - 10.

Another good use case for code execution is calling external APIs. If a model is instructed in the proper use of an API, it can write code that makes use of it. A model can be instructed in how to use an API by providing it with documentation and/or code samples showing how to use the API.

SYSTEM

You can write and execute Python code by enclosing it in triple backticks. Also note that you have access to the following module to help users send messages to their friends:

\`\`\`python
import message
message.write(to="John", message="Hey, want to meetup after work?")\`\`\`

**WARNING: Executing code produced by a model is not inherently safe and precautions should be taken in any application that seeks to do this. In particular, a sandboxed code execution environment is needed to limit the harm that untrusted code could cause.**

#### Tactic: Give the model access to specific functions

The Chat Completions API allows passing a list of function descriptions in requests. This enables models to generate function arguments according to the provided schemas. Generated function arguments are returned by the API in JSON format and can be used to execute function calls. Output provided by function calls can then be fed back into a model in the following request to close the loop. This is the recommended way of using OpenAI models to call external functions. To learn more see the [function calling section](/docs/guides/function-calling) in our introductory text generation guide and more [function calling examples](https://cookbook.openai.com/examples/how_to_call_functions_with_chat_models) in the OpenAI Cookbook.

### Strategy: Test changes systematically

Sometimes it can be hard to tell whether a change — e.g., a new instruction or a new design — makes your system better or worse. Looking at a few examples may hint at which is better, but with small sample sizes it can be hard to distinguish between a true improvement or random luck. Maybe the change helps performance on some inputs, but hurts performance on others.

Evaluation procedures (or "evals") are useful for optimizing system designs. Good evals are:

- Representative of real-world usage (or at least diverse)
- Contain many test cases for greater statistical power (see table below for guidelines)
- Easy to automate or repeat

| Difference to detect | Sample size needed for 95% confidence |
| --- | --- |
| 30% | ~10 |
| 10% | ~100 |
| 3% | ~1,000 |
| 1% | ~10,000 |

Evaluation of outputs can be done by computers, humans, or a mix. Computers can automate evals with objective criteria (e.g., questions with single correct answers) as well as some subjective or fuzzy criteria, in which model outputs are evaluated by other model queries. [OpenAI Evals](https://github.com/openai/evals) is an open-source software framework that provides tools for creating automated evals.

Model-based evals can be useful when there exists a range of possible outputs that would be considered equally high in quality (e.g. for questions with long answers). The boundary between what can be realistically evaluated with a model-based eval and what requires a human to evaluate is fuzzy and is constantly shifting as models become more capable. We encourage experimentation to figure out how well model-based evals can work for your use case.

#### Tactic: Evaluate model outputs with reference to gold-standard answers

Suppose it is known that the correct answer to a question should make reference to a specific set of known facts. Then we can use a model query to count how many of the required facts are included in the answer.

For example, using the following system message:

SYSTEM

You will be provided with text delimited by triple quotes that is supposed to be the answer to a question. Check if the following pieces of information are directly contained in the answer:

\- Neil Armstrong was the first person to walk on the moon.
\- The date Neil Armstrong first walked on the moon was July 21, 1969.

For each of these points perform the following steps:

1 - Restate the point.
2 - Provide a citation from the answer which is closest to this point.
3 - Consider if someone reading the citation who doesn't know the topic could directly infer the point. Explain why or why not before making up your mind.
4 - Write "yes" if the answer to 3 was yes, otherwise write "no".

Finally, provide a count of how many "yes" answers there are. Provide this count as {"count": <insert count here>}.

Here's an example input where both points are satisfied:

SYSTEM

<insert system message above>

USER

"""Neil Armstrong is famous for being the first human to set foot on the Moon. This historic event took place on July 21, 1969, during the Apollo 11 mission."""

Here's an example input where only one point is satisfied:

SYSTEM

<insert system message above>

USER

"""Neil Armstrong made history when he stepped off the lunar module, becoming the first person to walk on the moon."""

Here's an example input where none are satisfied:

SYSTEM

<insert system message above>

USER

"""In the summer of '69, a voyage grand,
Apollo 11, bold as legend's hand.
Armstrong took a step, history unfurled,
"One small step," he said, for a new world."""

There are many possible variants on this type of model-based eval. Consider the following variation which tracks the kind of overlap between the candidate answer and the gold-standard answer, and also tracks whether the candidate answer contradicts any part of the gold-standard answer.

SYSTEM

Use the following steps to respond to user inputs. Fully restate each step before proceeding. i.e. "Step 1: Reason...".

Step 1: Reason step-by-step about whether the information in the submitted answer compared to the expert answer is either: disjoint, equal, a subset, a superset, or overlapping (i.e. some intersection but not subset/superset).

Step 2: Reason step-by-step about whether the submitted answer contradicts any aspect of the expert answer.

Step 3: Output a JSON object structured like: {"type\_of\_overlap": "disjoint" or "equal" or "subset" or "superset" or "overlapping", "contradiction": true or false}

Here's an example input with a substandard answer which nonetheless does not contradict the expert answer:

SYSTEM

<insert system message above>

USER

Question: """What event is Neil Armstrong most famous for and on what date did it occur? Assume UTC time."""

Submitted Answer: """Didn't he walk on the moon or something?"""

Expert Answer: """Neil Armstrong is most famous for being the first person to walk on the moon. This historic event occurred on July 21, 1969."""

Here's an example input with answer that directly contradicts the expert answer:

SYSTEM

<insert system message above>

USER

Question: """What event is Neil Armstrong most famous for and on what date did it occur? Assume UTC time."""

Submitted Answer: """On the 21st of July 1969, Neil Armstrong became the second person to walk on the moon, following after Buzz Aldrin."""

Expert Answer: """Neil Armstrong is most famous for being the first person to walk on the moon. This historic event occurred on July 21, 1969."""

Here's an example input with a correct answer that also provides a bit more detail than is necessary:

SYSTEM

<insert system message above>

USER

Question: """What event is Neil Armstrong most famous for and on what date did it occur? Assume UTC time."""

Submitted Answer: """At approximately 02:56 UTC on July 21st 1969, Neil Armstrong became the first human to set foot on the lunar surface, marking a monumental achievement in human history."""

Expert Answer: """Neil Armstrong is most famous for being the first person to walk on the moon. This historic event occurred on July 21, 1969."""

## Other resources

For more inspiration, visit the [OpenAI Cookbook](https://cookbook.openai.com), which contains example code and also links to third-party resources such as:

- [Prompting libraries & tools](https://cookbook.openai.com/related_resources#prompting-libraries--tools)
- [Prompting guides](https://cookbook.openai.com/related_resources#prompting-guides)
- [Video courses](https://cookbook.openai.com/related_resources#video-courses)
- [Papers on advanced prompting to improve reasoning](https://cookbook.openai.com/related_resources#papers-on-advanced-prompting-to-improve-reasoning)Log in [Sign up](/signup)

# OpenAI Subprocessor List

Copy page

This page provides information about the Subprocessors OpenAI has engaged to provide processing activities on Customer Data as defined in the OpenAI Data Processing Agreement.

### Subscribe to new Subprocessor notifications

Customers may sign up to receive notification of new Subprocessors by filling out [this form](https://share.hsforms.com/12eQCIydyQYSBVsV-pan8yQ4sk30).

* * *

| Subprocessor Name | Purpose | Location |
| --- | --- | --- |
| Cloudflare | Content delivery | Worldwide |
| Microsoft | Cloud infrastructure | Worldwide |
| OpenAI affiliates | Services and support | United States |
| Snowflake | Data warehousing | United States |
| TaskUS | User support, safety and monitoring | Worldwide |

Please contact [privacy@openai.com](mailto:privacy@openai.com) with any questions or concerns.Log in [Sign up](/signup)

Page not found

We couldn't find the page you were looking for.

Was this expected?Log in [Sign up](/signup)

# Rate limits

Copy page

Understand API rate limits and restrictions.

Rate limits are restrictions that our API imposes on the number of times a user or client can
access our services within a specified period of time.

## Why do we have rate limits?

Rate limits are a common practice for APIs, and they're put in place for a few different reasons:

- **They help protect against abuse or misuse of the API.** For example, a malicious actor could flood the API with requests in an attempt to overload it or cause disruptions in service. By setting rate limits, OpenAI can prevent this kind of activity.
- **Rate limits help ensure that everyone has fair access to the API.** If one person or organization makes an excessive number of requests, it could bog down the API for everyone else. By throttling the number of requests that a single user can make, OpenAI ensures that the most number of people have an opportunity to use the API without experiencing slowdowns.
- **Rate limits can help OpenAI manage the aggregate load on its infrastructure.** If requests to the API increase dramatically, it could tax the servers and cause performance issues. By setting rate limits, OpenAI can help maintain a smooth and consistent experience for all users.

Please work through this document in its entirety to better understand how OpenAI’s rate limit system works. We include code examples and possible solutions to handle common issues. We also include details around how your rate limits are automatically increased in the usage tiers section below.

## How do these rate limits work?

Rate limits are measured in five ways: **RPM** (requests per minute), **RPD** (requests per day), **TPM** (tokens per minute), **TPD** (tokens per day), and **IPM** (images per minute). Rate limits can be hit across any of the options depending on what occurs first. For example, you might send 20 requests with only 100 tokens to the ChatCompletions endpoint and that would fill your limit (if your RPM was 20), even if you did not send 150k tokens (if your TPM limit was 150k) within those 20 requests.

[Batch API](/docs/api-reference/batch/create) queue limits are calculated based on the total number of input tokens queued for a given model. Tokens from pending batch jobs are counted against your queue limit. Once a batch job is completed, its tokens are no longer counted against that model's limit.

Other important things worth noting:

- Rate limits are defined at the [organization level](/docs/guides/production-best-practices) and at the project level, not user level.
- Rate limits vary by the [model](/docs/models) being used.
- Limits are also placed on the total amount an organization can spend on the API each month. These are also known as "usage limits".
- Some model families have shared rate limits. Any models listed under a "shared limit" in your [organizations limit page](https://platform.openai.com/settings/organization/limits) share a rate limit between them. For example, if the listed shared TPM is 3.5M, all calls to any model in the given "shared limit" list will count towards that 3.5M.

## Usage tiers

You can view the rate and usage limits for your organization under the [limits](/settings/organization/limits) section of your account settings. As your usage of the OpenAI API and your spend on our API goes up, we automatically graduate you to the next usage tier. This usually results in an increase in rate limits across most models.

| Tier | Qualification | Usage limits |
| --- | --- | --- |
| Free | User must be in an [allowed geography](/docs/supported-countries) | $100 / month |
| Tier 1 | $5 paid | $100 / month |
| Tier 2 | $50 paid and 7+ days since first successful payment | $500 / month |
| Tier 3 | $100 paid and 7+ days since first successful payment | $1,000 / month |
| Tier 4 | $250 paid and 14+ days since first successful payment | $5,000 / month |
| Tier 5 | $1,000 paid and 30+ days since first successful payment | $200,000 / month |

Select a tier below to view a high-level summary of rate limits per model.

FreeTier 1Tier 2Tier 3Tier 4Tier 5

#### Free tier rate limits

This is a high level summary and there are per-model exceptions to these limits (e.g. some legacy models or models with larger context windows have different rate limits). To view the exact rate limits per model for your account, visit the [limits](/settings/organization/limits) section of your account settings.

| Model | RPM | RPD | TPM | Batch Queue Limit |
| --- | --- | --- | --- | --- |
| `gpt-3.5-turbo` | 3 | 200 | 40,000 | 200,000 |
| `text-embedding-3-large` | 3,000 | 200 | 1,000,000 | 3,000,000 |
| `text-embedding-3-small` | 3,000 | 200 | 1,000,000 | 3,000,000 |
| `text-embedding-ada-002` | 3,000 | 200 | 1,000,000 | 3,000,000 |
| `omni-moderation-*` | 500 | 10,000 | 10,000 | - |
| `whisper-1` | 3 | 200 | - | - |
| `tts-1` | 3 | 200 | - | - |
| `dall-e-2` | 5 img/min | - | - | - |
| `dall-e-3` | 1 img/min | - | - | - |

### Rate limits in headers

In addition to seeing your rate limit on your [account page](/settings/organization/limits), you can also view important information about your rate limits such as the remaining requests, tokens, and other metadata in the headers of the HTTP response.

You can expect to see the following header fields:

| Field | Sample Value | Description |
| --- | --- | --- |
| x-ratelimit-limit-requests | 60 | The maximum number of requests that are permitted before exhausting the rate limit. |
| x-ratelimit-limit-tokens | 150000 | The maximum number of tokens that are permitted before exhausting the rate limit. |
| x-ratelimit-remaining-requests | 59 | The remaining number of requests that are permitted before exhausting the rate limit. |
| x-ratelimit-remaining-tokens | 149984 | The remaining number of tokens that are permitted before exhausting the rate limit. |
| x-ratelimit-reset-requests | 1s | The time until the rate limit (based on requests) resets to its initial state. |
| x-ratelimit-reset-tokens | 6m0s | The time until the rate limit (based on tokens) resets to its initial state. |

## Error Mitigation

### What are some steps I can take to mitigate this?

The OpenAI Cookbook has a [Python notebook](https://cookbook.openai.com/examples/how_to_handle_rate_limits) that explains how to avoid rate limit errors, as well an example [Python script](https://github.com/openai/openai-cookbook/blob/main/examples/api_request_parallel_processor.py) for staying under rate limits while batch processing API requests.

You should also exercise caution when providing programmatic access, bulk processing features, and automated social media posting - consider only enabling these for trusted customers.

To protect against automated and high-volume misuse, set a usage limit for individual users within a specified time frame (daily, weekly, or monthly). Consider implementing a hard cap or a manual review process for users who exceed the limit.

#### Retrying with exponential backoff

One easy way to avoid rate limit errors is to automatically retry requests with a random exponential backoff. Retrying with exponential backoff means performing a short sleep when a rate limit error is hit, then retrying the unsuccessful request. If the request is still unsuccessful, the sleep length is increased and the process is repeated. This continues until the request is successful or until a maximum number of retries is reached.
This approach has many benefits:

- Automatic retries means you can recover from rate limit errors without crashes or missing data
- Exponential backoff means that your first retries can be tried quickly, while still benefiting from longer delays if your first few retries fail
- Adding random jitter to the delay helps retries from all hitting at the same time.

Note that unsuccessful requests contribute to your per-minute limit, so continuously resending a request won’t work.

Below are a few example solutions **for Python** that use exponential backoff.

Example 1: Using the Tenacity library

Tenacity is an Apache 2.0 licensed general-purpose retrying library, written in Python, to simplify the task of adding retry behavior to just about anything.
To add exponential backoff to your requests, you can use the `tenacity.retry` decorator. The below example uses the `tenacity.wait_random_exponential` function to add random exponential backoff to a request.

Using the Tenacity library

python

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
from openai import OpenAI
client = OpenAI()

from tenacity import (
    retry,
    stop_after_attempt,
    wait_random_exponential,
)  # for exponential backoff

@retry(wait=wait_random_exponential(min=1, max=60), stop=stop_after_attempt(6))
def completion_with_backoff(**kwargs):
    return client.completions.create(**kwargs)

completion_with_backoff(model="gpt-4o-mini", prompt="Once upon a time,")
```

Note that the Tenacity library is a third-party tool, and OpenAI makes no guarantees about
its reliability or security.

Example 2: Using the backoff library

Another python library that provides function decorators for backoff and retry is [backoff](https://pypi.org/project/backoff/):

Using the Tenacity library

python

```python
1
2
3
4
5
6
7
8
9
10
import backoff
import openai
from openai import OpenAI
client = OpenAI()

@backoff.on_exception(backoff.expo, openai.RateLimitError)
def completions_with_backoff(**kwargs):
    return client.completions.create(**kwargs)

completions_with_backoff(model="gpt-4o-mini", prompt="Once upon a time,")
```

Like Tenacity, the backoff library is a third-party tool, and OpenAI makes no guarantees about its reliability or security.

Example 3: Manual backoff implementation

If you don't want to use third-party libraries, you can implement your own backoff logic following this example:

Using manual backoff implementation

python

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
# imports
import random
import time

import openai
from openai import OpenAI
client = OpenAI()

# define a retry decorator
def retry_with_exponential_backoff(
    func,
    initial_delay: float = 1,
    exponential_base: float = 2,
    jitter: bool = True,
    max_retries: int = 10,
    errors: tuple = (openai.RateLimitError,),
):
    """Retry a function with exponential backoff."""

    def wrapper(*args, **kwargs):
        # Initialize variables
        num_retries = 0
        delay = initial_delay

        # Loop until a successful response or max_retries is hit or an exception is raised
        while True:
            try:
                return func(*args, **kwargs)

            # Retry on specific errors
            except errors as e:
                # Increment retries
                num_retries += 1

                # Check if max retries has been reached
                if num_retries > max_retries:
                    raise Exception(
                        f"Maximum number of retries ({max_retries}) exceeded."
                    )

                # Increment the delay
                delay *= exponential_base * (1 + jitter * random.random())

                # Sleep for the delay
                time.sleep(delay)

            # Raise exceptions for any errors not specified
            except Exception as e:
                raise e

    return wrapper

@retry_with_exponential_backoff
def completions_with_backoff(**kwargs):
    return client.completions.create(**kwargs)
```

Again, OpenAI makes no guarantees on the security or efficiency of this solution but it can be a good starting place for your own solution.

#### Reduce the `max_tokens` to match the size of your completions

Your rate limit is calculated as the maximum of `max_tokens` and the estimated number of tokens based on the character count of your request. Try to set the `max_tokens` value as close to your expected response size as possible.

#### Batching requests

If your use case does not require immediate responses, you can use the [Batch API](/docs/guides/batch) to more easily submit and execute large collections of requests without impacting your synchronous request rate limits.

For use cases that _do_ requires synchronous respones, the OpenAI API has separate limits for **requests per minute** and **tokens per minute**.

If you're hitting the limit on requests per minute but have available capacity on tokens per minute, you can increase your throughput by batching multiple tasks into each request. This will allow you to process more tokens per minute, especially with our smaller models.

Sending in a batch of prompts works exactly the same as a normal API call, except you pass in a list of strings to the prompt parameter instead of a single string.

Example without batching

No batching

python

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
from openai import OpenAI
client = OpenAI()

num_stories = 10
prompt = "Once upon a time,"

# serial example, with one story completion per request
for _ in range(num_stories):
    response = client.completions.create(
        model="curie",
        prompt=prompt,
        max_tokens=20,
    )
    # print story
    print(prompt + response.choices[0].text)
```

Example with batching

Batching

python

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
from openai import OpenAI
client = OpenAI()

num_stories = 10
prompts = ["Once upon a time,"] * num_stories

# batched example, with 10 story completions per request
response = client.completions.create(
    model="curie",
    prompt=prompts,
    max_tokens=20,
)

# match completions to prompts by index
stories = [""] * len(prompts)
for choice in response.choices:
    stories[choice.index] = prompts[choice.index] + choice.text

# print stories
for story in stories:
    print(story)
```

Warning: the response object may not return completions in the order of the prompts, so always remember to match responses back to prompts using the index field.Log in [Sign up](/signup)

Page not found

We couldn't find the page you were looking for.

Was this expected?Log in [Sign up](/signup)

# Deprecations

Copy page

Find deprecated features and recommended replacements.

## Overview

As we launch safer and more capable models, we regularly retire older models. Software relying on OpenAI models may need occasional updates to keep working. Impacted customers will always be notified by email and in our documentation along with [blog posts](https://openai.com/blog) for larger changes.

This page lists all API deprecations, along with recommended replacements.

## Deprecation vs Legacy

We use the term "deprecation" to refer to the process of retiring a model or endpoint. When we announce that a model or endpoint is being deprecated, it immediately becomes deprecated. All deprecated models and endpoints will also have a shut down date. At the time of the shut down, the model or endpoint will no longer be accessible.

We use the term "legacy" to refer to models and endpoints that will no longer receive updates. We tag endpoints and models as legacy to signal to developers where we are moving as a platform and that they should likely migrate to newer models or endpoints. You can expect that a legacy model or endpoint will be deprecated at some point in the future.

## Incremental model updates

As [announced](https://openai.com/blog/introducing-chatgpt-and-whisper-apis#:~:text=Chat%20guide.-,ChatGPT%20upgrades,-We%20are%20constantly) in March 2023, we regularly release new versions of `gpt-4` and `gpt-3.5-turbo`.

Each model version is dated with either `-MMDD` or a `YYYY-MM-DD` suffix; e.g., `gpt-4-0613` or `gpt-4o-2024-05-13`. The undated model name, e.g., `gpt-4o`, will typically point to the latest version dated version. Users of undated model names will be notified by email typically 2 weeks before any change takes place.

## Migrating to replacements

Once a model is deprecated, be sure to migrate all usage to a suitable replacement before the shutdown date. Requests to models past the shutdown date will fail.

To help measure the performance of replacement models on your tasks, we have open-sourced [Evals](https://github.com/openai/evals), a Python framework for evaluating language models.

If new models perform worse on your tasks, let us know by submitting a [pull request](https://github.com/openai/evals/pulls) to our Evals repo with examples of the task.

## Deprecation history

All deprecations are listed below, with the most recent announcements at the top.

### 2024-10-02: Assistants API beta v1

In [April 2024](/docs/assistants/whats-new) when we released the v2 beta version of the Assistants API, we announced that access to the v1 beta would be shut off by the end of 2024. Access to the v1 beta will be discontinued on December 18, 2024.

See the Assistants API v2 beta [migration guide](/docs/assistants/migration) to learn more about how to migrate your tool usage to the latest version of the Assistants API.

| Shutdown date | Model / system | Recommended replacement |
| --- | --- | --- |
| 2024-12-18 | OpenAI-Beta: assistants=v1 | OpenAI-Beta: assistants=v2 |

### 2024-08-29: Fine-tuning training on babbage-002 and davinci-002 models

On August 29th, 2024, we notified developers fine-tuning `babbage-002` and `davinci-002` that new fine-tuning training runs on these models will no longer be supported starting October 28, 2024.

Fine-tuned models created from these base models are not affected by this deprecation, but you will no longer be able to create new fine-tuned versions with these models.

| Shutdown date | Model / system | Recommended replacement |
| --- | --- | --- |
| 2024-10-28 | New fine-tuning training on `babbage-002` | `gpt-4o-mini` |
| 2024-10-28 | New fine-tuning training on `davinci-002` | `gpt-4o-mini` |

### 2024-06-06: GPT-4-32K and Vision Preview models

On June 6th, 2024, we notified developers using `gpt-4-32k` and `gpt-4-vision-preview` of their upcoming deprecations in one year and six months respectively. As of June 17, 2024, only existing users of these models will be able to continue using them.

| Shutdown date | Deprecated model | Deprecated model price | Recommended replacement |
| --- | --- | --- | --- |
| 2025-06-06 | `gpt-4-32k` | $60.00 / 1M input tokens + $120 / 1M output tokens | `gpt-4o` |
| 2025-06-06 | `gpt-4-32k-0613` | $60.00 / 1M input tokens + $120 / 1M output tokens | `gpt-4o` |
| 2025-06-06 | `gpt-4-32k-0314` | $60.00 / 1M input tokens + $120 / 1M output tokens | `gpt-4o` |
| 2024-12-06 | `gpt-4-vision-preview` | $10.00 / 1M input tokens + $30 / 1M output tokens | `gpt-4o` |
| 2024-12-06 | `gpt-4-1106-vision-preview` | $10.00 / 1M input tokens + $30 / 1M output tokens | `gpt-4o` |

### 2023-11-06: Chat model updates

On November 6th, 2023, we [announced](https://openai.com/blog/new-models-and-developer-products-announced-at-devday) the release of an updated GPT-3.5-Turbo model (which now comes by default with 16k context) along with deprecation of `gpt-3.5-turbo-0613` and ` gpt-3.5-turbo-16k-0613`. As of June 17, 2024, only existing users of these models will be able to continue using them.

| Shutdown date | Deprecated model | Deprecated model price | Recommended replacement |
| --- | --- | --- | --- |
| 2024-09-13 | `gpt-3.5-turbo-0613` | $1.50 / 1M input tokens + $2.00 / 1M output tokens | `gpt-3.5-turbo` |
| 2024-09-13 | `gpt-3.5-turbo-16k-0613` | $3.00 / 1M input tokens + $4.00 / 1M output tokens | `gpt-3.5-turbo` |

Fine-tuned models created from these base models are not affected by this deprecation, but you will no longer be able to create new fine-tuned versions with these models.

### 2023-08-22: Fine-tunes endpoint

On August 22nd, 2023, we [announced](https://openai.com/blog/gpt-3-5-turbo-fine-tuning-and-api-updates) the new fine-tuning API ( `/v1/fine_tuning/jobs`) and that the original `/v1/fine-tunes` API along with legacy models (including those fine-tuned with the `/v1/fine-tunes` API) will be shut down on January 04, 2024. This means that models fine-tuned using the `/v1/fine-tunes` API will no longer be accessible and you would have to fine-tune new models with the updated endpoint and associated base models.

#### Fine-tunes endpoint

| Shutdown date | System | Recommended replacement |
| --- | --- | --- |
| 2024-01-04 | `/v1/fine-tunes` | `/v1/fine_tuning/jobs` |

### 2023-07-06: GPT and embeddings

On July 06, 2023, we [announced](https://openai.com/blog/gpt-4-api-general-availability) the upcoming retirements of older GPT-3 and GPT-3.5 models served via the completions endpoint. We also announced the upcoming retirement of our first-generation text embedding models. They will be shut down on January 04, 2024.

#### InstructGPT models

| Shutdown date | Deprecated model | Deprecated model price | Recommended replacement |
| --- | --- | --- | --- |
| 2024-01-04 | `text-ada-001` | $0.40 / 1M tokens | `gpt-3.5-turbo-instruct` |
| 2024-01-04 | `text-babbage-001` | $0.50 / 1M tokens | `gpt-3.5-turbo-instruct` |
| 2024-01-04 | `text-curie-001` | $2.00 / 1M tokens | `gpt-3.5-turbo-instruct` |
| 2024-01-04 | `text-davinci-001` | $20.00 / 1M tokens | `gpt-3.5-turbo-instruct` |
| 2024-01-04 | `text-davinci-002` | $20.00 / 1M tokens | `gpt-3.5-turbo-instruct` |
| 2024-01-04 | `text-davinci-003` | $20.00 / 1M tokens | `gpt-3.5-turbo-instruct` |

Pricing for the replacement `gpt-3.5-turbo-instruct` model can be found on the [pricing page](https://openai.com/api/pricing).

#### Base GPT models

| Shutdown date | Deprecated model | Deprecated model price | Recommended replacement |
| --- | --- | --- | --- |
| 2024-01-04 | `ada` | $0.40 / 1M tokens | `babbage-002` |
| 2024-01-04 | `babbage` | $0.50 / 1M tokens | `babbage-002` |
| 2024-01-04 | `curie` | $2.00 / 1M tokens | `davinci-002` |
| 2024-01-04 | `davinci` | $20.00 / 1M tokens | `davinci-002` |
| 2024-01-04 | `code-davinci-002` | \-\-\- | `gpt-3.5-turbo-instruct` |

Pricing for the replacement `babbage-002` and `davinci-002` models can be found on the [pricing page](https://openai.com/api/pricing).

#### Edit models & endpoint

| Shutdown date | Model / system | Recommended replacement |
| --- | --- | --- |
| 2024-01-04 | `text-davinci-edit-001` | `gpt-4o` |
| 2024-01-04 | `code-davinci-edit-001` | `gpt-4o` |
| 2024-01-04 | `/v1/edits` | `/v1/chat/completions` |

#### Fine-tuning GPT models

| Shutdown date | Deprecated model | Training price | Usage price | Recommended replacement |
| --- | --- | --- | --- | --- |
| 2024-01-04 | `ada` | $0.40 / 1M tokens | $1.60 / 1M tokens | `babbage-002` |
| 2024-01-04 | `babbage` | $0.60 / 1M tokens | $2.40 / 1M tokens | `babbage-002` |
| 2024-01-04 | `curie` | $3.00 / 1M tokens | $12.00 / 1M tokens | `davinci-002` |
| 2024-01-04 | `davinci` | $30.00 / 1M tokens | $120.00 / 1K tokens | `davinci-002`, `gpt-3.5-turbo`, `gpt-4o` |

#### First-generation text embedding models

| Shutdown date | Deprecated model | Deprecated model price | Recommended replacement |
| --- | --- | --- | --- |
| 2024-01-04 | `text-similarity-ada-001` | $4.00 / 1M tokens | `text-embedding-3-small` |
| 2024-01-04 | `text-search-ada-doc-001` | $4.00 / 1M tokens | `text-embedding-3-small` |
| 2024-01-04 | `text-search-ada-query-001` | $4.00 / 1M tokens | `text-embedding-3-small` |
| 2024-01-04 | `code-search-ada-code-001` | $4.00 / 1M tokens | `text-embedding-3-small` |
| 2024-01-04 | `code-search-ada-text-001` | $4.00 / 1M tokens | `text-embedding-3-small` |
| 2024-01-04 | `text-similarity-babbage-001` | $5.00 / 1M tokens | `text-embedding-3-small` |
| 2024-01-04 | `text-search-babbage-doc-001` | $5.00 / 1M tokens | `text-embedding-3-small` |
| 2024-01-04 | `text-search-babbage-query-001` | $5.00 / 1M tokens | `text-embedding-3-small` |
| 2024-01-04 | `code-search-babbage-code-001` | $5.00 / 1M tokens | `text-embedding-3-small` |
| 2024-01-04 | `code-search-babbage-text-001` | $5.00 / 1M tokens | `text-embedding-3-small` |
| 2024-01-04 | `text-similarity-curie-001` | $20.00 / 1M tokens | `text-embedding-3-small` |
| 2024-01-04 | `text-search-curie-doc-001` | $20.00 / 1M tokens | `text-embedding-3-small` |
| 2024-01-04 | `text-search-curie-query-001` | $20.00 / 1M tokens | `text-embedding-3-small` |
| 2024-01-04 | `text-similarity-davinci-001` | $200.00 / 1M tokens | `text-embedding-3-small` |
| 2024-01-04 | `text-search-davinci-doc-001` | $200.00 / 1M tokens | `text-embedding-3-small` |
| 2024-01-04 | `text-search-davinci-query-001` | $200.00 / 1M tokens | `text-embedding-3-small` |

### 2023-06-13: Updated chat models

On June 13, 2023, we announced new chat model versions in the [Function calling and other API updates](https://openai.com/blog/function-calling-and-other-api-updates) blog post. The three original versions will be retired in June 2024 at the earliest. As of January 10, 2024, only existing users of these models will be able to continue using them.

| Shutdown date | Legacy model | Legacy model price | Recommended replacement |
| --- | --- | --- | --- |
| at earliest 2024-06-13 | `gpt-4-0314` | $30.00 / 1M input tokens + $60.00 / 1M output tokens | `gpt-4o` |

| Shutdown date | Deprecated model | Deprecated model price | Recommended replacement |
| --- | --- | --- | --- |
| 2024-09-13 | `gpt-3.5-turbo-0301` | $15.00 / 1M input tokens + $20.00 / 1M output tokens | `gpt-3.5-turbo` |
| 2025-06-06 | `gpt-4-32k-0314` | $60.00 / 1M input tokens + $120.00 / 1M output tokens | `gpt-4o` |

### 2023-03-20: Codex models

| Shutdown date | Deprecated model | Recommended replacement |
| --- | --- | --- |
| 2023-03-23 | `code-davinci-002` | `gpt-4o` |
| 2023-03-23 | `code-davinci-001` | `gpt-4o` |
| 2023-03-23 | `code-cushman-002` | `gpt-4o` |
| 2023-03-23 | `code-cushman-001` | `gpt-4o` |

### 2022-06-03: Legacy endpoints

| Shutdown date | System | Recommended replacement |
| --- | --- | --- |
| 2022-12-03 | `/v1/engines` | [/v1/models](https://platform.openai.com/docs/api-reference/models/list) |
| 2022-12-03 | `/v1/search` | [View transition guide](https://help.openai.com/en/articles/6272952-search-transition-guide) |
| 2022-12-03 | `/v1/classifications` | [View transition guide](https://help.openai.com/en/articles/6272941-classifications-transition-guide) |
| 2022-12-03 | `/v1/answers` | [View transition guide](https://help.openai.com/en/articles/6233728-answers-transition-guide) |Log in [Sign up](/signup)

Page not found

We couldn't find the page you were looking for.

Was this expected?Log in [Sign up](/signup)

Page not found

We couldn't find the page you were looking for.

Was this expected?Log in [Sign up](/signup)

# Prompt examples

Explore what's possible with some example prompts

All categories

Grammar correction

Convert ungrammatical statements into standard English.

Summarize for a 2nd grader

Simplify text to a level appropriate for a second-grade student.

Parse unstructured data

Create tables from unstructured text.

Emoji Translation

Translate regular text into emoji text.

Calculate time complexity

Find the time complexity of a function.

Explain code

Explain a complicated piece of code.

Keywords

Extract keywords from a block of text.

Product name generator

Generate product names from a description and seed words.

Python bug fixer

Find and fix bugs in source code.

Spreadsheet creator

Create spreadsheets of various kinds of data.

Tweet classifier

Detect sentiment in a tweet.

Airport code extractor

Extract airport codes from text.

Mood to color

Turn a text description into a color.

VR fitness idea generator

Generate ideas for fitness promoting virtual reality games.

Marv the sarcastic chat bot

Marv is a factual chatbot that is also sarcastic.

Turn by turn directions

Convert natural language to turn-by-turn directions.

Interview questions

Create interview questions.

Function from specification

Create a Python function from a specification.

Improve code efficiency

Provide ideas for efficiency improvements to Python code.

Single page website creator

Create a single page website.

Rap battle writer

Generate a rap battle between two characters.

Memo writer

Generate a company memo based on provided points.

Emoji chatbot

Generate conversational replies using emojis only.

Translation

Translate natural language text.

Socratic tutor

Generate responses as a Socratic tutor.

Natural language to SQL

Convert natural language into SQL queries.

Meeting notes summarizer

Summarize meeting notes including overall discussion, action items, and future topics.

Review classifier

Classify user reviews based on a set of tags.

Pro and con discusser

Analyze the pros and cons of a given topic.

Lesson plan writer

Generate a lesson plan for a specific topic.

Grammar correction

Transform

Natural Language

Convert ungrammatical statements into standard English.

Prompt

SYSTEM

You will be provided with statements, and your task is to convert them to standard English.

USER

She no went to the market.

Sample response

She did not go to the market.

API request

python

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
from openai import OpenAI
client = OpenAI()

response = client.chat.completions.create(
  model="gpt-4o",
  messages=[\
    {\
      "role": "system",\
      "content": "You will be provided with statements, and your task is to convert them to standard English."\
    },\
    {\
      "role": "user",\
      "content": "She no went to the market."\
    }\
  ],
  temperature=1,
  max_tokens=256,
  top_p=1
)
```

```javascript
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [\
    {\
      "role": "system",\
      "content": "You will be provided with statements, and your task is to convert them to standard English."\
    },\
    {\
      "role": "user",\
      "content": "She no went to the market."\
    }\
  ],
  temperature: 1,
  max_tokens: 256,
  top_p: 1,
});
```

```bash
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
  "model": "gpt-4o",
  "messages": [\
    {\
      "role": "system",\
      "content": "You will be provided with statements, and your task is to convert them to standard English."\
    },\
    {\
      "role": "user",\
      "content": "She no went to the market."\
    }\
  ],
  "temperature": 1,
  "max_tokens": 256,
  "top_p": 1
}'
```

```json
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
{
  "model": "gpt-4o",
  "messages": [\
    {\
      "role": "system",\
      "content": "You will be provided with statements, and your task is to convert them to standard English."\
    },\
    {\
      "role": "user",\
      "content": "She no went to the market."\
    }\
  ],
  "temperature": 1,
  "max_tokens": 256,
  "top_p": 1
}
```Log in [Sign up](/signup)

# Key concepts

Copy page

Key concepts to understand when working with the OpenAI API.

At OpenAI, protecting user data is fundamental to our mission. We do not train our
models on inputs and outputs through our API. Learn more on our
[API data privacy page](https://openai.com/api-data-privacy).

### Text generation models

OpenAI's text generation models (often referred to as generative pre-trained transformers or "GPT" models for short), like GPT-4 and GPT-3.5, have been trained to understand natural and formal language. Models like GPT-4 allows text outputs in response to their inputs. The inputs to these models are also referred to as "prompts". Designing a prompt is essentially how you "program" a model like GPT-4, usually by providing instructions or some examples of how to successfully complete a task. Models like GPT-4 can be used across a great variety of tasks including content or code generation, summarization, conversation, creative writing, and more. Read more in our introductory [text generation guide](/docs/guides/text-generation) and in our [prompt engineering guide](/docs/guides/prompt-engineering).

### Assistants

Assistants refer to entities, which in the case of the OpenAI API are powered by large language models like GPT-4, that are capable of performing tasks for users. These assistants operate based on the instructions embedded within the context window of the model. They also usually have access to tools which allows the assistants to perform more complex tasks like running code or retrieving information from a file. Read more about assistants in our [Assistants API Overview](/docs/assistants).

### Embeddings

An embedding is a vector representation of a piece of data (e.g. some text) that is meant to preserve aspects of its content and/or its meaning. Chunks of data that are similar in some way will tend to have embeddings that are closer together than unrelated data. OpenAI offers text embedding models that take as input a text string and produce as output an embedding vector. Embeddings are useful for search, clustering, recommendations, anomaly detection, classification, and more. Read more about embeddings in our [embeddings guide](/docs/guides/embeddings).

### Tokens

Text generation and embeddings models process text in chunks called tokens. Tokens represent commonly occurring sequences of characters. For example, the string " tokenization" is decomposed as " token" and "ization", while a short and common word like " the" is represented as a single token. Note that in a sentence, the first token of each word typically starts with a space character. Check out our [tokenizer tool](/tokenizer) to test specific strings and see how they are translated into tokens. As a rough rule of thumb, 1 token is approximately 4 characters or 0.75 words for English text.

One limitation to keep in mind is that for a text generation model the prompt and the generated output combined must be no more than the model's maximum context length. For embeddings models (which do not output tokens), the input must be shorter than the model's maximum context length. The maximum context lengths for each text generation and embeddings model can be found in the [model index](/docs/models).Log in [Sign up](/signup)

Page not found

We couldn't find the page you were looking for.

Was this expected?Log in [Sign up](/signup)

# Audio generation

Copy page

Learn how to generate audio from a text or audio prompt.

In addition to generating [text](/docs/guides/text-generation) and [images](/docs/guides/images), some [models](/docs/models) enable you to generate a spoken audio response to a prompt, and to use audio inputs to prompt the model. Audio inputs can contain richer data than text alone, allowing the model to detect tone, inflection, and other nuances within the input.

You can use these audio capabilities to:

- Generate a spoken audio summary of a body of text (text in, audio out)
- Perform sentiment analysis on a recording (audio in, text out)
- Async speech to speech interactions with a model (audio in, audio out)

OpenAI provides other models for simple [speech to text](/docs/guides/speech-to-text) and [text to speech](/docs/guides/text-to-speech) \- when your task requires those conversions (and not dynamic content from a model), the TTS and STT models will be more performant and cost-efficient.

## Quickstart

To generate audio or use audio as an input, you can use the [chat completions endpoint](/docs/api-reference/chat/) in the REST API, as seen in the examples below. You can either use the [REST API](/docs/api-reference) from the HTTP client of your choice, or use one of OpenAI's [official SDKs](/docs/libraries) for your preferred programming language.

Audio output from modelAudio input to model

Audio output from model

Create a human-like audio response to a prompt

javascript

```javascript
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
import { writeFileSync } from "node:fs";
import OpenAI from "openai";

const openai = new OpenAI();

// Generate an audio response to the given prompt
const response = await openai.chat.completions.create({
  model: "gpt-4o-audio-preview",
  modalities: ["text", "audio"],
  audio: { voice: "alloy", format: "wav" },
  messages: [\
    {\
      role: "user",\
      content: "Is a golden retriever a good family dog?"\
    }\
  ]
});

// Inspect returned data
console.log(response.choices[0]);

// Write audio data to a file
writeFileSync(
  "dog.wav",
  Buffer.from(response.choices[0].message.audio.data, 'base64'),
  { encoding: "utf-8" }
);
```

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
import base64
from openai import OpenAI

client = OpenAI()

completion = client.chat.completions.create(
    model="gpt-4o-audio-preview",
    modalities=["text", "audio"],
    audio={"voice": "alloy", "format": "wav"},
    messages=[\
        {\
            "role": "user",\
            "content": "Is a golden retriever a good family dog?"\
        }\
    ]
)

print(completion.choices[0])

wav_bytes = base64.b64decode(completion.choices[0].message.audio.data)
with open("dog.wav", "wb") as f:
    f.write(wav_bytes)
```

```bash
1
2
3
4
5
6
7
8
9
10
11
12
13
14
curl "https://api.openai.com/v1/chat/completions" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
      "model": "gpt-4o-audio-preview",
      "modalities": ["text", "audio"],
      "audio": { "voice": "alloy", "format": "wav" },
      "messages": [\
        {\
          "role": "user",\
          "content": "Is a golden retriever a good family dog?"\
        }\
      ]
    }'
```

Audio input to model

Use audio inputs for prompting a model

javascript

```javascript
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
import OpenAI from "openai";
const openai = new OpenAI();

// Fetch an audio file and convert it to a base64 string
const url = "https://openaiassets.blob.core.windows.net/$web/API/docs/audio/alloy.wav";
const audioResponse = await fetch(url);
const buffer = await audioResponse.arrayBuffer();
const base64str = Buffer.from(buffer).toString("base64");

const response = await openai.chat.completions.create({
  model: "gpt-4o-audio-preview",
  modalities: ["text", "audio"],
  audio: { voice: "alloy", format: "wav" },
  messages: [\
    {\
      role: "user",\
      content: [\
        { type: "text", text: "What is in this recording?" },\
        { type: "input_audio", input_audio: { data: base64str, format: "wav" }}\
      ]\
    }\
  ]
});

console.log(response.choices[0]);
```

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
import base64
import requests
from openai import OpenAI

client = OpenAI()

# Fetch the audio file and convert it to a base64 encoded string
url = "https://openaiassets.blob.core.windows.net/$web/API/docs/audio/alloy.wav"
response = requests.get(url)
response.raise_for_status()
wav_data = response.content
encoded_string = base64.b64encode(wav_data).decode('utf-8')

completion = client.chat.completions.create(
    model="gpt-4o-audio-preview",
    modalities=["text", "audio"],
    audio={"voice": "alloy", "format": "wav"},
    messages=[\
        {\
            "role": "user",\
            "content": [\
                {\
                    "type": "text",\
                    "text": "What is in this recording?"\
                },\
                {\
                    "type": "input_audio",\
                    "input_audio": {\
                        "data": encoded_string,\
                        "format": "wav"\
                    }\
                }\
            ]\
        },\
    ]
)

print(completion.choices[0].message)
```

```bash
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
curl "https://api.openai.com/v1/chat/completions" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
      "model": "gpt-4o-audio-preview",
      "modalities": ["text", "audio"],
      "audio": { "voice": "alloy", "format": "wav" },
      "messages": [\
        {\
          "role": "user",\
          "content": [\
            { "type": "text", "text": "What is in this recording?" },\
            {\
              "type": "input_audio",\
              "input_audio": {\
                "data": "<base64 bytes here>",\
                "format": "wav"\
              }\
            }\
          ]\
        }\
      ]
    }'
```

## Multi-turn conversations

Using audio outputs from the model as inputs to multi-turn conversations requires a generated ID that appears in the response data for an audio generation. Below is an example JSON data structure for a [message you might receive](/docs/api-reference/chat/object#chat/object-choices) from `/chat/completions`:

```json
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
{
  "index": 0,
  "message": {
    "role": "assistant",
    "content": null,
    "refusal": null,
    "audio": {
      "id": "audio_abc123",
      "expires_at": 1729018505,
      "data": "<bytes omitted>",
      "transcript": "Yes, golden retrievers are known to be ..."
    }
  },
  "finish_reason": "stop"
}
```

The value of `message.audio.id` above provides an identifier you can use in an `assistant` message for a new `/chat/completions` request, as in the example below.

```bash
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
curl "https://api.openai.com/v1/chat/completions" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
        "model": "gpt-4o-audio-preview",
        "modalities": ["text", "audio"],
        "audio": { "voice": "alloy", "format": "wav" },
        "messages": [\
            {\
                "role": "user",\
                "content": "Is a golden retriever a good family dog?"\
            },\
            {\
                "role": "assistant",\
                "audio": {\
                    "id": "audio_abc123"\
                }\
            },\
            {\
                "role": "user",\
                "content": "Why do you say they are loyal?"\
            }\
        ]
    }'
```

## FAQ

### What modalities are supported by gpt-4o-audio-preview

`gpt-4o-audio-preview` requires either audio output or audio input to be used at this time. Acceptable combinations of input and output are:

- text in → text + audio out
- audio in → text + audio out
- audio in → text out
- text + audio in → text + audio out
- text + audio in → text out

### How is audio in Chat Completions different from the Realtime API?

The underlying GPT-4o audio model is exactly the same. The Realtime API operates the same model at lower latency.

### How do I think about audio input to the model in terms of tokens?

We are working on better tooling to expose this, but roughly one hour of audio input is equal to 128k tokens, the max context window currently supported by this model.

### How do I control which output modalities I receive?

Currently the model only programmatically allows modalities = `[“text”, “audio”]`. In the future, this parameter will give more controls.

### How does tool/function calling work?

Tool (and function) calling works the same as it does for other models in Chat Completions - [learn more](/docs/guides/function-calling).

## Next steps

Now that you know how to generate audio outputs and send audio inputs, there are a few other techniques you might want to master.

[Text to speech\\
\\
Use a specialized model to turn text into speech.](/docs/guides/text-to-speech) [Speech to text\\
\\
Use a specialized model to turn audio files with speech into text.](/docs/guides/speech-to-text) [Realtime API\\
\\
Learn to use the Realtime API to prompt a model over a WebSocket.](/docs/guides/realtime) [Full API reference\\
\\
Check out all the options for audio generation in the API reference.](/docs/api-reference/chat)Log in [Sign up](/signup)

Page not found

We couldn't find the page you were looking for.

Was this expected?Log in [Sign up](/signup)

# Assistants API deep dive  Beta

Copy page

In-depth guide to creating and managing assistants.

As described in the [Assistants Overview](/docs/assistants/overview), there are several concepts involved in building an app with the Assistants API.

This guide goes deeper into each of these concepts.

If you want to get started coding right away, check out the [Assistants API Quickstart](/docs/assistants/quickstart).

## Creating Assistants

We recommend using OpenAI's
[latest models](/docs/models#gpt-4-turbo-and-gpt-4) with the Assistants API
for best results and maximum compatibility with tools.

To get started, creating an Assistant only requires specifying the `model` to use. But you can further customize the behavior of the Assistant:

1. Use the `instructions` parameter to guide the personality of the Assistant and define its goals. Instructions are similar to system messages in the Chat Completions API.
2. Use the `tools` parameter to give the Assistant access to up to 128 tools. You can give it access to OpenAI-hosted tools like `code_interpreter` and `file_search`, or call a third-party tools via a `function` calling.
3. Use the `tool_resources` parameter to give the tools like `code_interpreter` and `file_search` access to files. Files are uploaded using the `File` [upload endpoint](/docs/api-reference/files/create) and must have the `purpose` set to `assistants` to be used with this API.

For example, to create an Assistant that can create data visualization based on a `.csv` file, first upload a file.

python

```python
1
2
3
4
file = client.files.create(
  file=open("revenue-forecast.csv", "rb"),
  purpose='assistants'
)
```

```javascript
1
2
3
4
const file = await openai.files.create({
  file: fs.createReadStream("revenue-forecast.csv"),
  purpose: "assistants",
});
```

```bash
1
2
3
4
curl https://api.openai.com/v1/files \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F purpose="assistants" \
  -F file="@revenue-forecast.csv"
```

Then, create the Assistant with the `code_interpreter` tool enabled and provide the file as a resource to the tool.

python

```python
1
2
3
4
5
6
7
8
9
10
11
assistant = client.beta.assistants.create(
  name="Data visualizer",
  description="You are great at creating beautiful data visualizations. You analyze data present in .csv files, understand trends, and come up with data visualizations relevant to those trends. You also share a brief text summary of the trends observed.",
  model="gpt-4o",
  tools=[{"type": "code_interpreter"}],
  tool_resources={
    "code_interpreter": {
      "file_ids": [file.id]
    }
  }
)
```

```javascript
1
2
3
4
5
6
7
8
9
10
11
const assistant = await openai.beta.assistants.create({
  name: "Data visualizer",
  description: "You are great at creating beautiful data visualizations. You analyze data present in .csv files, understand trends, and come up with data visualizations relevant to those trends. You also share a brief text summary of the trends observed.",
  model: "gpt-4o",
  tools: [{"type": "code_interpreter"}],
  tool_resources: {
    "code_interpreter": {
      "file_ids": [file.id]
    }
  }
});
```

```bash
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
curl https://api.openai.com/v1/assistants \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -H "OpenAI-Beta: assistants=v2" \
  -d '{
    "name": "Data visualizer",
    "description": "You are great at creating beautiful data visualizations. You analyze data present in .csv files, understand trends, and come up with data visualizations relevant to those trends. You also share a brief text summary of the trends observed.",
    "model": "gpt-4o",
    "tools": [{"type": "code_interpreter"}],
    "tool_resources": {
      "code_interpreter": {
        "file_ids": ["file-BK7bzQj3FfZFXr7DbL6xJwfo"]
      }
    }
  }'
```

You can attach a maximum of 20 files to `code_interpreter` and 10,000 files to `file_search` (using `vector_store` [objects](/docs/api-reference/vector-stores/object)).

Each file can be at most 512 MB in size and have a maximum of 5,000,000 tokens. By default, the size of all the files uploaded in your project cannot exceed 100 GB, but you can reach out to our support team to increase this limit.

## Managing Threads and Messages

Threads and Messages represent a conversation session between an Assistant and a user. There is a limit of 100,000 Messages per Thread. Once the size of the Messages exceeds the context window of the model, the Thread will attempt to smartly truncate messages, before fully dropping the ones it considers the least important.

You can create a Thread with an initial list of Messages like this:

python

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
thread = client.beta.threads.create(
  messages=[\
    {\
      "role": "user",\
      "content": "Create 3 data visualizations based on the trends in this file.",\
      "attachments": [\
        {\
          "file_id": file.id,\
          "tools": [{"type": "code_interpreter"}]\
        }\
      ]\
    }\
  ]
)
```

```javascript
1
2
3
4
5
6
7
8
9
10
11
12
13
14
const thread = await openai.beta.threads.create({
  messages: [\
    {\
      "role": "user",\
      "content": "Create 3 data visualizations based on the trends in this file.",\
      "attachments": [\
        {\
          file_id: file.id,\
          tools: [{type: "code_interpreter"}]\
        }\
      ]\
    }\
  ]
});
```

```bash
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
curl https://api.openai.com/v1/threads \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -H "OpenAI-Beta: assistants=v2" \
  -d '{
    "messages": [\
      {\
        "role": "user",\
        "content": "Create 3 data visualizations based on the trends in this file.",\
        "attachments": [\
          {\
            "file_id": "file-ACq8OjcLQm2eIG0BvRM4z5qX",\
            "tools": [{"type": "code_interpreter"}]\
          }\
        ]\
      }\
    ]
  }'
```

Messages can contain text, images, or file attachment. Message `attachments` are helper methods that add files to a thread's `tool_resources`. You can also choose to add files to the `thread.tool_resources` directly.

### Creating image input content

Message content can contain either external image URLs or File IDs uploaded via the [File API](/docs/api-reference/files/create). Only [models](/docs/models) with Vision support can accept image input. Supported image content types include png, jpg, gif, and webp. When creating image files, pass `purpose="vision"` to allow you to later download and display the input content. Currently, there is a 100GB limit per project. Please contact us to request a limit increase.

Tools cannot access image content unless specified. To pass image files to Code Interpreter, add the file ID in the message `attachments` list to allow the tool to read and analyze the input. Image URLs cannot be downloaded in Code Interpreter today.

python

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
file = client.files.create(
  file=open("myimage.png", "rb"),
  purpose="vision"
)
thread = client.beta.threads.create(
  messages=[\
    {\
      "role": "user",\
      "content": [\
        {\
          "type": "text",\
          "text": "What is the difference between these images?"\
        },\
        {\
          "type": "image_url",\
          "image_url": {"url": "https://example.com/image.png"}\
        },\
        {\
          "type": "image_file",\
          "image_file": {"file_id": file.id}\
        },\
      ],\
    }\
  ]
)
```

```javascript
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
import fs from "fs";
const file = await openai.files.create({
  file: fs.createReadStream("myimage.png"),
  purpose: "vision",
});
const thread = await openai.beta.threads.create({
  messages: [\
    {\
      "role": "user",\
      "content": [\
        {\
          "type": "text",\
          "text": "What is the difference between these images?"\
        },\
        {\
          "type": "image_url",\
          "image_url": {"url": "https://example.com/image.png"}\
        },\
        {\
          "type": "image_file",\
          "image_file": {"file_id": file.id}\
        },\
      ]\
    }\
  ]
});
```

```bash
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
# Upload a file with an "vision" purpose
curl https://api.openai.com/v1/files \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F purpose="vision" \
  -F file="@/path/to/myimage.png"

## Pass the file ID in the content
curl https://api.openai.com/v1/threads \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -H "OpenAI-Beta: assistants=v2" \
  -d '{
    "messages": [\
      {\
        "role": "user",\
        "content": [\
          {\
            "type": "text",\
            "text": "What is the difference between these images?"\
          },\
          {\
            "type": "image_url",\
            "image_url": {"url": "https://example.com/image.png"}\
          },\
          {\
            "type": "image_file",\
            "image_file": {"file_id": file.id}\
          }\
        ]\
      }\
    ]
  }'
```

#### Low or high fidelity image understanding

By controlling the `detail` parameter, which has three options, `low`, `high`, or `auto`, you have control over how the model processes the image and generates its textual understanding.

- `low` will enable the "low res" mode. The model will receive a low-res 512px x 512px version of the image, and represent the image with a budget of 85 tokens. This allows the API to return faster responses and consume fewer input tokens for use cases that do not require high detail.
- `high` will enable "high res" mode, which first allows the model to see the low res image and then creates detailed crops of input images based on the input image size. Use the [pricing calculator](https://openai.com/api/pricing/) to see token counts for various image sizes.

python

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
thread = client.beta.threads.create(
  messages=[\
    {\
      "role": "user",\
      "content": [\
        {\
          "type": "text",\
          "text": "What is this an image of?"\
        },\
        {\
          "type": "image_url",\
          "image_url": {\
            "url": "https://example.com/image.png",\
            "detail": "high"\
          }\
        },\
      ],\
    }\
  ]
)
```

```javascript
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
const thread = await openai.beta.threads.create({
  messages: [\
    {\
      "role": "user",\
      "content": [\
          {\
            "type": "text",\
            "text": "What is this an image of?"\
          },\
          {\
            "type": "image_url",\
            "image_url": {\
              "url": "https://example.com/image.png",\
              "detail": "high"\
            }\
          },\
      ]\
    }\
  ]
});
```

```bash
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
curl https://api.openai.com/v1/threads \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -H "OpenAI-Beta: assistants=v2" \
  -d '{
    "messages": [\
      {\
        "role": "user",\
        "content": [\
          {\
            "type": "text",\
            "text": "What is this an image of?"\
          },\
          {\
            "type": "image_url",\
            "image_url": {\
              "url": "https://example.com/image.png",\
              "detail": "high"\
            }\
          },\
        ]\
      }\
    ]
  }'
```

### Context window management

The Assistants API automatically manages the truncation to ensure it stays within the model's maximum context length. You can customize this behavior by specifying the maximum tokens you'd like a run to utilize and/or the maximum number of recent messages you'd like to include in a run.

#### Max Completion and Max Prompt Tokens

To control the token usage in a single Run, set `max_prompt_tokens` and `max_completion_tokens` when creating the Run. These limits apply to the total number of tokens used in all completions throughout the Run's lifecycle.

For example, initiating a Run with `max_prompt_tokens` set to 500 and `max_completion_tokens` set to 1000 means the first completion will truncate the thread to 500 tokens and cap the output at 1000 tokens. If only 200 prompt tokens and 300 completion tokens are used in the first completion, the second completion will have available limits of 300 prompt tokens and 700 completion tokens.

If a completion reaches the `max_completion_tokens` limit, the Run will terminate with a status of `incomplete`, and details will be provided in the `incomplete_details` field of the Run object.

When using the File Search tool, we recommend setting the max\_prompt\_tokens to no less
than 20,000. For longer conversations or multiple interactions with File Search,
consider increasing this limit to 50,000, or ideally, removing the max\_prompt\_tokens
limits altogether to get the highest quality results.

#### Truncation Strategy

You may also specify a truncation strategy to control how your thread should be rendered into the model's context window.
Using a truncation strategy of type `auto` will use OpenAI's default truncation strategy. Using a truncation strategy of type `last_messages` will allow you to specify the number of the most recent messages to include in the context window.

### Message annotations

Messages created by Assistants may contain [`annotations`](/docs/api-reference/messages/object#messages/object-content) within the `content` array of the object. Annotations provide information around how you should annotate the text in the Message.

There are two types of Annotations:

1. `file_citation`: File citations are created by the [`file_search`](/docs/assistants/tools/file-search) tool and define references to a specific file that was uploaded and used by the Assistant to generate the response.
2. `file_path`: File path annotations are created by the [`code_interpreter`](/docs/assistants/tools/code-interpreter) tool and contain references to the files generated by the tool.

When annotations are present in the Message object, you'll see illegible model-generated substrings in the text that you should replace with the annotations. These strings may look something like `【13†source】` or `sandbox:/mnt/data/file.csv`. Here’s an example python code snippet that replaces these strings with information present in the annotations.

python

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
# Retrieve the message object
message = client.beta.threads.messages.retrieve(
  thread_id="...",
  message_id="..."
)
# Extract the message content
message_content = message.content[0].text
annotations = message_content.annotations
citations = []
# Iterate over the annotations and add footnotes
for index, annotation in enumerate(annotations):
    # Replace the text with a footnote
    message_content.value = message_content.value.replace(annotation.text, f' [{index}]')
    # Gather citations based on annotation attributes
    if (file_citation := getattr(annotation, 'file_citation', None)):
        cited_file = client.files.retrieve(file_citation.file_id)
        citations.append(f'[{index}] {file_citation.quote} from {cited_file.filename}')
    elif (file_path := getattr(annotation, 'file_path', None)):
        cited_file = client.files.retrieve(file_path.file_id)
        citations.append(f'[{index}] Click <here> to download {cited_file.filename}')
        # Note: File download functionality not implemented above for brevity
# Add footnotes to the end of the message before displaying to user
message_content.value += '\n' + '\n'.join(citations)
```

## Runs and Run Steps

When you have all the context you need from your user in the Thread, you can run the Thread with an Assistant of your choice.

python

```python
1
2
3
4
run = client.beta.threads.runs.create(
  thread_id=thread.id,
  assistant_id=assistant.id
)
```

```javascript
1
2
3
4
const run = await openai.beta.threads.runs.create(
  thread.id,
  { assistant_id: assistant.id }
);
```

```bash
1
2
3
4
5
6
7
curl https://api.openai.com/v1/threads/THREAD_ID/runs \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -H "OpenAI-Beta: assistants=v2" \
  -d '{
    "assistant_id": "asst_ToSF7Gb04YMj8AMMm50ZLLtY"
  }'
```

By default, a Run will use the `model` and `tools` configuration specified in Assistant object, but you can override most of these when creating the Run for added flexibility:

python

```python
1
2
3
4
5
6
7
run = client.beta.threads.runs.create(
  thread_id=thread.id,
  assistant_id=assistant.id,
  model="gpt-4o",
  instructions="New instructions that override the Assistant instructions",
  tools=[{"type": "code_interpreter"}, {"type": "file_search"}]
)
```

```javascript
1
2
3
4
5
6
7
8
9
const run = await openai.beta.threads.runs.create(
  thread.id,
  {
    assistant_id: assistant.id,
    model: "gpt-4o",
    instructions: "New instructions that override the Assistant instructions",
    tools: [{"type": "code_interpreter"}, {"type": "file_search"}]
  }
);
```

```bash
1
2
3
4
5
6
7
8
9
10
curl https://api.openai.com/v1/threads/THREAD_ID/runs \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -H "OpenAI-Beta: assistants=v2" \
  -d '{
    "assistant_id": "ASSISTANT_ID",
    "model": "gpt-4o",
    "instructions": "New instructions that override the Assistant instructions",
    "tools": [{"type": "code_interpreter"}, {"type": "file_search"}]
  }'
```

Note: `tool_resources` associated with the Assistant cannot be overridden during Run creation. You must use the [modify Assistant](/docs/api-reference/assistants/modifyAssistant) endpoint to do this.

#### Run lifecycle

Run objects can have multiple statuses.

![Run lifecycle - diagram showing possible status transitions](https://cdn.openai.com/API/docs/images/diagram-run-statuses-v2.png)

| Status | Definition |
| --- | --- |
| `queued` | When Runs are first created or when you complete the `required_action`, they are moved to a queued status. They should almost immediately move to `in_progress`. |
| `in_progress` | While in\_progress, the Assistant uses the model and tools to perform steps. You can view progress being made by the Run by examining the [Run Steps](/docs/api-reference/runs/step-object). |
| `completed` | The Run successfully completed! You can now view all Messages the Assistant added to the Thread, and all the steps the Run took. You can also continue the conversation by adding more user Messages to the Thread and creating another Run. |
| `requires_action` | When using the [Function calling](/docs/assistants/tools/function-calling) tool, the Run will move to a `required_action` state once the model determines the names and arguments of the functions to be called. You must then run those functions and [submit the outputs](/docs/api-reference/runs/submitToolOutputs) before the run proceeds. If the outputs are not provided before the `expires_at` timestamp passes (roughly 10 mins past creation), the run will move to an expired status. |
| `expired` | This happens when the function calling outputs were not submitted before `expires_at` and the run expires. Additionally, if the runs take too long to execute and go beyond the time stated in `expires_at`, our systems will expire the run. |
| `cancelling` | You can attempt to cancel an `in_progress` run using the [Cancel Run](/docs/api-reference/runs/cancelRun) endpoint. Once the attempt to cancel succeeds, status of the Run moves to `cancelled`. Cancellation is attempted but not guaranteed. |
| `cancelled` | Run was successfully cancelled. |
| `failed` | You can view the reason for the failure by looking at the `last_error` object in the Run. The timestamp for the failure will be recorded under `failed_at`. |
| `incomplete` | Run ended due to `max_prompt_tokens` or `max_completion_tokens` reached. You can view the specific reason by looking at the `incomplete_details` object in the Run. |

#### Polling for updates

If you are not using [streaming](/docs/assistants/overview#step-4-create-a-run?context=with-streaming), in order to keep the status of your run up to date, you will have to periodically [retrieve the Run](/docs/api-reference/runs/getRun) object. You can check the status of the run each time you retrieve the object to determine what your application should do next.

You can optionally use Polling Helpers in our [Node](https://github.com/openai/openai-node?tab=readme-ov-file#polling-helpers) and [Python](https://github.com/openai/openai-python?tab=readme-ov-file#polling-helpers) SDKs to help you with this. These helpers will automatically poll the Run object for you and return the Run object when it's in a terminal state.

#### Thread locks

When a Run is `in_progress` and not in a terminal state, the Thread is locked. This means that:

- New Messages cannot be added to the Thread.
- New Runs cannot be created on the Thread.

#### Run steps

![Run steps lifecycle - diagram showing possible status transitions](https://cdn.openai.com/API/docs/images/diagram-2.png)

Run step statuses have the same meaning as Run statuses.

Most of the interesting detail in the Run Step object lives in the `step_details` field. There can be two types of step details:

1. `message_creation`: This Run Step is created when the Assistant creates a Message on the Thread.
2. `tool_calls`: This Run Step is created when the Assistant calls a tool. Details around this are covered in the relevant sections of the [Tools](/docs/assistants/tools) guide.

## Data Access Guidance

Currently, Assistants, Threads, Messages, and Vector Stores created via the API are scoped to the Project they're created in. As such, any person with API key access to that Project is able to read or write Assistants, Threads, Messages, and Runs in the Project.

We strongly recommend the following data access controls:

- _Implement authorization._ Before performing reads or writes on Assistants, Threads, Messages, and Vector Stores, ensure that the end-user is authorized to do so. For example, store in your database the object IDs that the end-user has access to, and check it before fetching the object ID with the API.
- _Restrict API key access._ Carefully consider who in your organization should have API keys and be part of a Project. Periodically audit this list. API keys enable a wide range of operations including reading and modifying sensitive information, such as Messages and Files.
- _Create separate accounts._ Consider creating separate Projects for different applications in order to isolate data across multiple applications.Log in [Sign up](/signup)

# OpenAI developer platform

[Developer quickstart\\
\\
Set up your environment and make your first API request in minutes\\
\\
5 min](/docs/quickstart)

node.js

```bash
1
2
3
4
5
6
7
8
9
curl https://api.openai.com/v1/chat/completions
-H "Content-Type: application/json"
-H "Authorization: Bearer $OPENAI_API_KEY"
-d '{
        "model": "gpt-4o",
        "messages": [\
            {"role": "user", "content": "write a haiku about ai"}\
        ]
    }'
```

```javascript
1
2
3
4
5
6
7
8
import OpenAI from "openai";
const openai = new OpenAI();
const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [\
        {"role": "user", "content": "write a haiku about ai"}\
    ]
});
```

```python
1
2
3
4
5
6
7
8
from openai import OpenAI
client = OpenAI()
completion = client.chat.completions.create(
    model="gpt-4o",
    messages=[\
        {"role": "user", "content": "write a haiku about ai"}\
    ]
)
```

## Meet the models

[Pricing](https://openai.com/api/pricing)

[GPT-4o\\
\\
Our high-intelligence flagship model for complex, multi‑step tasks\\
\\
Text and image input, text output\\
\\
128k context length\\
\\
Smarter model, higher price per token](/docs/models#gpt-4o)

[GPT-4o mini\\
\\
Our affordable and intelligent small model for fast, lightweight tasks\\
\\
Text and image input, text output\\
\\
128k context length\\
\\
Faster model, lower price per token](/docs/models#gpt-4o-mini)

[o1-preview & o1-mini\\
\\
Beta\\
\\
A new series of reasoning models for solving hard problems\\
\\
Text input, text output\\
\\
128k context length\\
\\
Higher latency, uses tokens to think](/docs/models#o1)

[Explore all](/docs/models)

## Start building

[Structured Outputs\\
\\
Ensure model responses adhere to your supplied JSON schema](/docs/guides/structured-outputs) [Realtime API\\
\\
Build low-latency multimodal experiences](/docs/guides/realtime) [Assistants API\\
\\
Build conversational assistants with tools and File Search](/docs/assistants) [Async use cases\\
\\
Batch requests for async, large-scale processing](/docs/guides/batch) [Fine-tuning\\
\\
Adapt a model to your specific use case with your data](/docs/guides/fine-tuning) [Distillation\\
\\
Evaluate and fine-tune models using production logs](/docs/guides/distillation)

## Explore our guides

[Prompt engineering\\
\\
Get better results from LLMs](/docs/guides/prompt-engineering) [Production best practices\\
\\
Transition from prototype to production](/docs/guides/production-best-practices) [Safety best practices\\
\\
Make sure your application is safe](/docs/guides/safety-best-practices) [Latency optimization\\
\\
Improve latency across multiple use cases](/docs/guides/latency-optimization) [Optimizing LLM accuracy\\
\\
Maximize correctness and consistent behavior of LLMs](/docs/guides/optimizing-llm-accuracy)

[Help center\\
\\
Frequently asked account and billing questions](https://help.openai.com/) [Developer forum\\
\\
Discuss topics with other developers](https://community.openai.com/) [Cookbook\\
\\
Open-source collection of examples and guides](https://cookbook.openai.com/) [Status\\
\\
Check the status of OpenAI services](https://status.openai.com)Log in [Sign up](/signup)

# Production notes on GPT Actions

Copy page

Deploy GPT Actions in production with best practices.

## Rate limits

Consider implementing rate limiting on the API endpoints you expose. ChatGPT will respect 429 response codes and dynamically back off from sending requests to your action after receiving a certain number of 429's or 500's in a short period of time.

## Timeouts

When making API calls during the actions experience, timeouts take place if the following thresholds are exceeded:

- 45 seconds round trip for API calls

## Use TLS and HTTPS

All traffic to your action must use TLS 1.2 or later on port 443 with a valid public certificate.

## IP egress ranges

ChatGPT will call your action from an IP address from one of these [CIDR blocks](https://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing):

- `23.102.140.112/28`
- `13.66.11.96/28`
- `104.210.133.240/28`
- `70.37.60.192/28`
- `20.97.188.144/28`
- `20.161.76.48/28`
- `52.234.32.208/28`
- `52.156.132.32/28`
- `40.84.220.192/28`
- `23.98.178.64/28`
- `51.8.155.32/28`
- `20.246.77.240/28`
- `172.178.141.0/28`
- `172.178.141.192/28`
- `40.84.180.128/28`

You may wish to explicitly allowlist these IP addresses.

## Multiple authentication schemas

When defining an action, you can mix a single authentication type (OAuth or API key) along with endpoints that do not require authentication.

You can learn more about action authentication on our [actions authentication page](/docs/actions/authentication).

## Open API specification limits

Keep in mind the following limits in your OpenAPI specification, which are subject to change:

- 300 characters max for each API endpoint description/summary field in API specification
- 700 characters max for each API parameter description field in API specification

## Additional limitations

There are a few limitations to be aware of when building with actions:

- Custom headers are not supported
- With the exception of Google, Microsoft and Adobe OAuth domains, all domains used in an OAuth flow must be the same as the domain used for the primary endpoints
- Request and response payloads must be less than 100,000 characters each
- Requests timeout after 45 seconds
- Requests and responses can only contain text (no images or video)

## Consequential flag

In the OpenAPI specification, you can now set certain endpoints as "consequential" as shown below:

```text
1
2
3
4
5
6
7
8
9
10
paths:
  /todo:
    get:
      operationId: getTODOs
      description: Fetches items in a TODO list from the API.
      security: []
    post:
      operationId: updateTODOs
      description: Mutates the TODO list.
      x-openai-isConsequential: true
```

A good example of a consequential action is booking a hotel room and paying for it on behalf of a user.

- If the `x-openai-isConsequential` field is `true`, ChatGPT treats the operation as "must always prompt the user for confirmation before running" and don't show an "always allow" button (both are features of GPTs designed to give builders and users more control over actions).
- If the `x-openai-isConsequential` field is `false`, ChatGPT shows the "always allow button".
- If the field isn't present, ChatGPT defaults all GET operations to `false` and all other operations to `true`

## Best practices on feeding examples

Here are some best practices to follow when writing your GPT instructions and descriptions in your schema, as well as when designing your API responses:

1. Your descriptions should not encourage the GPT to use the action when the user hasn't asked for your action's particular category of service.

_Bad example_:


> Whenever the user mentions any type of task, ask if they would like to use the TODO action to add something to their todo list.


_Good example_:


> The TODO list can add, remove and view the user's TODOs.

2. Your descriptions should not prescribe specific triggers for the GPT to use the action. ChatGPT is designed to use your action automatically when appropriate.

_Bad example_:


> When the user mentions a task, respond with "Would you like me to add this to your TODO list? Say 'yes' to continue."


_Good example_:


> \[no instructions needed for this\]

3. Action responses from an API should return raw data instead of natural language responses unless it's necessary. The GPT will provide its own natural language response using the returned data.

_Bad example_:


> I was able to find your todo list! You have 2 todos: get groceries and walk the dog. I can add more todos if you'd like!


_Good example_:


> { "todos": \[ "get groceries", "walk the dog" \] }


## How GPT Action data is used

GPT Actions connect ChatGPT to external apps. If a user interacts with a GPT’s custom action, ChatGPT may send parts of their conversation to the action’s endpoint.

If you have questions or run into additional limitations, you can join the discussion on the [OpenAI developer forum](https://community.openai.com).Log in [Sign up](/signup)

# Predicted Outputs

Copy page

Reduce latency for model responses where much of the response is known ahead of time.

**Predicted Outputs** enable you to speed up API responses from [Chat Completions](/docs/api-reference/chat/create) when many of the output tokens are known ahead of time. This is most common when you are regenerating a text or code file with minor modifications. You can provide your prediction using the [`prediction` request parameter in Chat Completions](/docs/api-reference/chat/create#chat-create-prediction).

Predicted Outputs are available today using the latest `gpt-4o` and `gpt-4o-mini` models. Read on to learn how to use Predicted Outputs to reduce latency in your applicatons.

## Code refactoring example

Predicted Outputs are particularly useful for regenerating text documents and code files with small modifications. Let's say you want the [GPT-4o model](/docs/models#gpt-4o) to refactor a piece of TypeScript code, and convert the `username` property of the `User` class to be `email` instead:

```typescript
1
2
3
4
5
6
7
class User {
  firstName: string = "";
  lastName: string = "";
  username: string = "";
}

export default User;
```

Most of the file will be unchanged, except for line 4 above. If you use the current text of the code file as your prediction, you can regenerate the entire file with lower latency. These time savings add up quickly for larger files.

Below is an example of using the `prediction` parameter in our SDKs to predict that the final output of the model will be very similar to our original code file, which we use as the prediction text.

Refactor a TypeScript class with a Predicted Output

javascript

```javascript
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
import OpenAI from "openai";

const code = `
class User {
  firstName: string = "";
  lastName: string = "";
  username: string = "";
}

export default User;
`.trim();

const openai = new OpenAI();

const refactorPrompt = `
Replace the "username" property with an "email" property. Respond only
with code, and with no markdown formatting.
`;

const completion = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [\
    {\
      role: "user",\
      content: refactorPrompt\
    },\
    {\
      role: "user",\
      content: code\
    }\
  ],
  prediction: {
    type: "content",
    content: code
  }
});

// Inspect returned data
console.log(completion);
console.log(completion.choices[0].message.content);
```

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
from openai import OpenAI

code = """
class User {
  firstName: string = "";
  lastName: string = "";
  username: string = "";
}

export default User;
"""

refactor_prompt = """
Replace the "username" property with an "email" property. Respond only
with code, and with no markdown formatting.
"""

client = OpenAI()

completion = client.chat.completions.create(
    model="gpt-4o",
    messages=[\
        {\
            "role": "user",\
            "content": refactor_prompt\
        },\
        {\
            "role": "user",\
            "content": code\
        }\
    ],
    prediction={
        "type": "content",
        "content": code
    }
)

print(completion)
print(completion.choices[0].message.content)
```

```bash
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-4o",
    "messages": [\
      {\
        "role": "user",\
        "content": "Replace the username property with an email property. Respond only with code, and with no markdown formatting."\
      },\
      {\
        "role": "user",\
        "content": "$CODE_CONTENT_HERE"\
      }\
    ],
    "prediction": {
        "type": "content",
        "content": "$CODE_CONTENT_HERE"
    }
  }'
```

In addition to the refactored code, the model response will contain data that looks something like this:

```javascript
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
{
  id: 'chatcmpl-xxx',
  object: 'chat.completion',
  created: 1730918466,
  model: 'gpt-4o-2024-08-06',
  choices: [ /* ...actual text response here... */],
  usage: {
    prompt_tokens: 81,
    completion_tokens: 39,
    total_tokens: 120,
    prompt_tokens_details: { cached_tokens: 0, audio_tokens: 0 },
    completion_tokens_details: {
      reasoning_tokens: 0,
      audio_tokens: 0,
      accepted_prediction_tokens: 18,
      rejected_prediction_tokens: 10
    }
  },
  system_fingerprint: 'fp_159d8341cc'
}
```

Note both the `accepted_prediction_tokens` and `rejected_prediction_tokens` in the `usage` object. In this example, 18 tokens from the prediction were used to speed up the response, while 10 were rejected.

Note that any rejected tokens are still billed like other completion tokens generated by the API, so Predicted Outputs can introduce higher costs for your requests.

## Streaming example

The latency gains of Predicted Outputs are even greater when you use streaming for API responses. Here is an example of the same code refactoring use case, but using streaming in the OpenAI SDKs instead.

Predicted Outputs with streaming

javascript

```javascript
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
import OpenAI from "openai";

const code = `
class User {
  firstName: string = "";
  lastName: string = "";
  username: string = "";
}

export default User;
`.trim();

const openai = new OpenAI();

const refactorPrompt = `
Replace the "username" property with an "email" property. Respond only
with code, and with no markdown formatting.
`;

const completion = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [\
    {\
      role: "user",\
      content: refactorPrompt\
    },\
    {\
      role: "user",\
      content: code\
    }\
  ],
  prediction: {
    type: "content",
    content: code
  },
  stream: true
});

// Inspect returned data
for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || "");
}
```

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
from openai import OpenAI

code = """
class User {
  firstName: string = "";
  lastName: string = "";
  username: string = "";
}

export default User;
"""

refactor_prompt = """
Replace the "username" property with an "email" property. Respond only
with code, and with no markdown formatting.
"""

client = OpenAI()

stream = client.chat.completions.create(
    model="gpt-4o",
    messages=[\
        {\
            "role": "user",\
            "content": refactor_prompt\
        },\
        {\
            "role": "user",\
            "content": code\
        }\
    ],
    prediction={
        "type": "content",
        "content": code
    },
    stream=True
)

for chunk in stream:
    if chunk.choices[0].delta.content is not None:
        print(chunk.choices[0].delta.content, end="")
```

## Position of predicted text in response

When providing prediction text, your prediction can appear anywhere within the generated response, and still provide latency reduction for the response. Let's say your predicted text is the simple [Hono](https://hono.dev/) server shown below:

```typescript
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
import { serveStatic } from "@hono/node-server/serve-static";
import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/api", (c) => {
  return c.text("Hello Hono!");
});

// You will need to build the client code first `pnpm run ui:build`
app.use(
  "/*",
  serveStatic({
    rewriteRequestPath: (path) => `./dist${path}`,
  })
);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
```

You could prompt the model to regenerate the file with a prompt like:

```text
1
2
3
4
Add a get route to this application that responds with
the text "hello world". Generate the entire application
file again with this route added, and with no other
markdown formatting.
```

The response to the prompt might look something like this:

```typescript
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
import { serveStatic } from "@hono/node-server/serve-static";
import { serve } from "@hono/node-server";
import { Hono } from "hono";

const app = new Hono();

app.get("/api", (c) => {
  return c.text("Hello Hono!");
});

app.get("/hello", (c) => {
  return c.text("hello world");
});

// You will need to build the client code first `pnpm run ui:build`
app.use(
  "/*",
  serveStatic({
    rewriteRequestPath: (path) => `./dist${path}`,
  })
);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
```

You would still see accepted prediction tokens in the response, even though the prediction text appeared both before and after the new content added to the response:

```javascript
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
{
  id: 'chatcmpl-xxx',
  object: 'chat.completion',
  created: 1731014771,
  model: 'gpt-4o-2024-08-06',
  choices: [ /* completion here... */],
  usage: {
    prompt_tokens: 203,
    completion_tokens: 159,
    total_tokens: 362,
    prompt_tokens_details: { cached_tokens: 0, audio_tokens: 0 },
    completion_tokens_details: {
      reasoning_tokens: 0,
      audio_tokens: 0,
      accepted_prediction_tokens: 60,
      rejected_prediction_tokens: 0
    }
  },
  system_fingerprint: 'fp_9ee9e968ea'
}
```

This time, there were no rejected prediction tokens, because the entire content of the file we predicted was used in the final response. Nice! 🔥

## Limitations

When using Predicted Outputs, you should consider the following factors and limitations.

- Predicted Outputs are only supported with the GPT-4o and GPT-4o-mini series of models.
- When providing a prediction, any tokens provided that are not part of the final completion are still charged at completion token rates. See the [`rejected_prediction_tokens` property of the `usage` object](/docs/api-reference/chat/object#chat/object-usage) to see how many tokens are not used in the final response.
- The following [API parameters](/docs/api-reference/chat/create) are not supported when using Predicted Outputs:

  - `n`: values higher than 1 are not supported
  - `logprobs`: not supported
  - `presence_penalty`: values greater than 0 are not supported
  - `frequency_penalty`: values greater than 0 are not supported
  - `audio`: Predicted Outputs are not compatible with [audio inputs and outputs](/docs/guides/audio)
  - `modalities`: Only `text` modalities are supported
  - `max_completion_tokens`: not supported
  - `tools`: Function calling is not currently supported with Predicted OutputsLog in [Sign up](/signup)

# Sending and returning files with GPT Actions

Copy page

## Sending files

POST requests can include up to ten files (including DALL-E generated images) from the conversation. They will be sent as URLs which are valid for five minutes.

For files to be part of your POST request, the parameter must be named `openaiFileIdRefs` and the description should explain to the model the type and quantity of the files which your API is expecting.

The `openaiFileIdRefs` parameter will be populated with an array of JSON objects. Each object contains:

- `name` The name of the file. This will be an auto generated name when created by DALL-E.
- `id` A stable identifier for the file.
- `mime_type` The mime type of the file. For user uploaded files this is based on file extension.
- `download_link` The URL to fetch the file which is valid for five minutes.

Here’s an example of an `openaiFileIdRefs` array with two elements:

```text
1
2
3
4
5
6
7
8
9
10
11
12
13
14
[\
  {\
    "name": "dalle-Lh2tg7WuosbyR9hk",\
    "id": "file-XFlOqJYTPBPwMZE3IopCBv1Z",\
    "mime_type": "image/webp",\
    "download_link": "https://files.oaiusercontent.com/file-XFlOqJYTPBPwMZE3IopCBv1Z?se=2024-03-11T20%3A29%3A52Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3Da580bae6-ea30-478e-a3e2-1f6c06c3e02f.webp&sig=ZPWol5eXACxU1O9azLwRNgKVidCe%2BwgMOc/TdrPGYII%3D"\
  },\
  {\
    "name": "2023 Benefits Booklet.pdf",\
    "id": "file-s5nX7o4junn2ig0J84r8Q0Ew",\
    "mime_type": "application/pdf",\
    "download_link": "https://files.oaiusercontent.com/file-s5nX7o4junn2ig0J84r8Q0Ew?se=2024-03-11T20%3A29%3A52Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D299%2C%20immutable&rscd=attachment%3B%20filename%3D2023%2520Benefits%2520Booklet.pdf&sig=Ivhviy%2BrgoyUjxZ%2BingpwtUwsA4%2BWaRfXy8ru9AfcII%3D"\
  }\
]
```

Actions can include files uploaded by the user, images generated by DALL-E, and files created by Code Interpreter.

### OpenAPI Example

```text
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
/createWidget:
    post:
      operationId: createWidget
      summary: Creates a widget based on an image.
      description: Uploads a file reference using its file id. This file should be an image created by DALL·E or uploaded by the user. JPG, WEBP, and PNG are supported for widget creation.
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                openaiFileIdRefs:
                  type: array
                  items:
                    type: string
```

While this schema shows `openaiFileIdRefs` as being an array of type `string`, at runtime this will be populated with an array of JSON objects as previously shown.

## Returning files

Requests may return up to 10 files. Each file may be up to 10 MB and cannot be an image or video.

These files will become part of the conversation similarly to if a user uploaded them, meaning they may be made available to code interpreter, file search, and sent as part of subsequent action invocations. In the web app users will see that the files have been returned and can download them.

To return files, the body of the response must contain an `openaiFileResponse` parameter. This parameter must always be an array and must be populated in one of two ways.

### Inline option

Each element of the array is a JSON object which contains:

- `name` The name of the file. This will be visible to the user.
- `mime_type` The MIME type of the file. This is used to determine eligibility and which features have access to the file.
- `content` The base64 encoded contents of the file.

Here’s an example of an openaiFileResponse array with two elements:

```text
1
2
3
4
5
6
7
8
9
10
11
12
[\
  {\
    "name": "example_document.pdf",\
    "mime_type": "application/pdf",\
    "content": "JVBERi0xLjQKJcfsj6IKNSAwIG9iago8PC9MZW5ndGggNiAwIFIvRmlsdGVyIC9GbGF0ZURlY29kZT4+CnN0cmVhbQpHhD93PQplbmRzdHJlYW0KZW5kb2JqCg=="\
  },\
  {\
    "name": "sample_spreadsheet.csv",\
    "mime_type": "text/csv",\
    "content": "iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="\
  }\
]
```

OpenAPI example

```text
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
/papers:
  get:
    operationId: findPapers
    summary: Retrieve PDFs of relevant academic papers.
    description: Provided an academic topic, up to five relevant papers will be returned as PDFs.
    parameters:
      - in: query
        name: topic
        required: true
        schema:
          type: string
        description: The topic the papers should be about.
    responses:
      '200':
        description: Zero to five academic paper PDFs
        content:
            application/json:
              schema:
                type: object
                properties:
                  openaiFileResponse:
                    type: array
                    items:
                      type: object
                      properties:
                        name:
                          type: string
                          description: The name of the file.
                        mime_type:
                          type: string
                          description: The MIME type of the file.
                        content:
                          type: string
                          format: byte
                          description: The content of the file in base64 encoding.
```

### URL option

Each element of the array is a URL referencing a file to be downloaded. The headers `Content-Disposition` and `Content-Type` must be set such that a file name and MIME type can be determined. The name of the file will be visible to the user. The MIME type of the file determines eligibility and which features have access to the file.

There is a 10 second timeout for fetching each file.

Here’s an example of an `openaiFileResponse` array with two elements:

```text
1
2
3
4
[\
  "https://example.com/f/dca89f18-16d4-4a65-8ea2-ededced01646",\
  "https://example.com/f/01fad6b0-635b-4803-a583-0f678b2e6153"\
]
```

Here’s an example of the required headers for each URL:

```text
Content-Type: application/pdf
Content-Disposition: attachment; filename="example_document.pdf"
```

OpenAPI example

```/papers:
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
get:
    operationId: findPapers
    summary: Retrieve PDFs of relevant academic papers.
    description: Provided an academic topic, up to five relevant papers will be returned as PDFs.
    parameters:
      - in: query
        name: topic
        required: true
        schema:
          type: string
        description: The topic the papers should be about.
    responses:
      '200':
        description: Zero to five academic paper PDFs
        content:
            application/json:
              schema:
                type: object
                properties:
                  openaiFileResponse:
                    type: array
                    items:
                    type: string
                    format: uri
                    description: URLs to fetch the files.
```Log in [Sign up](/signup)

# Moderation

Copy page

Identify potentially harmful content in text and images.

The [moderations](/docs/api-reference/moderations) endpoint is a tool you can use to check whether text or images are potentially harmful. Once harmful content is identified, developers can take corrective action like filtering content or intervening with user accounts creating offending content. The moderation endpoint is free to use.

The models available for this endpoint are:

- `omni-moderation-latest`: This model and all snapshots support more categorization options and multi-modal inputs.
- `text-moderation-latest` **(Legacy)**: Older model that supports only text inputs and fewer input categorizations. The newer omni-moderation models will be the best choice for new applications.

## Quickstart

The [moderation endpoint](/docs/api-reference/moderations) can be used to classify both text and images. Below, you can find a few examples using our [official SDKs](/docs/libraries). These examples use the `omni-moderation-latest` [model](/docs/models#moderation):

Moderate text inputsModerate images and text

Moderate text inputs

Get classification information for a text input

python

```python
1
2
3
4
5
6
7
8
9
from openai import OpenAI
client = OpenAI()

response = client.moderations.create(
    model="omni-moderation-latest",
    input="...text to classify goes here...",
)

print(response)
```

```javascript
1
2
3
4
5
6
7
8
9
import OpenAI from "openai";
const openai = new OpenAI();

const moderation = await openai.moderations.create({
    model: "omni-moderation-latest",
    input: "...text to classify goes here...",
});

console.log(moderation);
```

```bash
1
2
3
4
5
6
7
8
curl https://api.openai.com/v1/moderations \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "omni-moderation-latest",
    "input": "...text to classify goes here..."
  }'
```

Moderate images and text

Get classification information for image and text input

python

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
from openai import OpenAI
client = OpenAI()

response = client.moderations.create(
    model="omni-moderation-latest",
    input=[\
        {"type": "text", "text": "...text to classify goes here..."},\
        {\
            "type": "image_url",\
            "image_url": {\
                "url": "https://example.com/image.png",\
                # can also use base64 encoded image URLs\
                # "url": "data:image/jpeg;base64,abcdefg..."\
            }\
        },\
    ],
)

print(response)
```

```javascript
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
import OpenAI from "openai";
const openai = new OpenAI();

const moderation = await openai.moderations.create({
    model: "omni-moderation-latest",
    input: [\
        { type: "text", text: "...text to classify goes here..." },\
        {\
            type: "image_url",\
            image_url: {\
                url: "https://example.com/image.png"\
                // can also use base64 encoded image URLs\
                // url: "data:image/jpeg;base64,abcdefg..."\
            }\
        }\
    ],
});

console.log(moderation);
```

```bash
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
curl https://api.openai.com/v1/moderations \
  -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "omni-moderation-latest",
    "input": [\
      { "type": "text", "text": "...text to classify goes here..." },\
      {\
        "type": "image_url",\
        "image_url": {\
          "url": "https://example.com/image.png"\
        }\
      }\
    ]
  }'
```

Here is the full example output for an image input from a single frame of a war movie. The model correctly predicts indicators of violence in the image, with a `violence` category score of greater than 0.8.

```json
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
{
  "id": "modr-970d409ef3bef3b70c73d8232df86e7d",
  "model": "omni-moderation-latest",
  "results": [\
    {\
      "flagged": true,\
      "categories": {\
        "sexual": false,\
        "sexual/minors": false,\
        "harassment": false,\
        "harassment/threatening": false,\
        "hate": false,\
        "hate/threatening": false,\
        "illicit": false,\
        "illicit/violent": false,\
        "self-harm": false,\
        "self-harm/intent": false,\
        "self-harm/instructions": false,\
        "violence": true,\
        "violence/graphic": false\
      },\
      "category_scores": {\
        "sexual": 2.34135824776394e-7,\
        "sexual/minors": 1.6346470245419304e-7,\
        "harassment": 0.0011643905680426018,\
        "harassment/threatening": 0.0022121340080906377,\
        "hate": 3.1999824407395835e-7,\
        "hate/threatening": 2.4923252458203563e-7,\
        "illicit": 0.0005227032493135171,\
        "illicit/violent": 3.682979260160596e-7,\
        "self-harm": 0.0011175734280627694,\
        "self-harm/intent": 0.0006264858507989037,\
        "self-harm/instructions": 7.368592981140821e-8,\
        "violence": 0.8599265510337075,\
        "violence/graphic": 0.37701736389561064\
      },\
      "category_applied_input_types": {\
        "sexual": [\
          "image"\
        ],\
        "sexual/minors": [],\
        "harassment": [],\
        "harassment/threatening": [],\
        "hate": [],\
        "hate/threatening": [],\
        "illicit": [],\
        "illicit/violent": [],\
        "self-harm": [\
          "image"\
        ],\
        "self-harm/intent": [\
          "image"\
        ],\
        "self-harm/instructions": [\
          "image"\
        ],\
        "violence": [\
          "image"\
        ],\
        "violence/graphic": [\
          "image"\
        ]\
      }\
    }\
  ]
}
```

The output from the models is described below. The JSON response contains information about what (if any) categories of content are present in the inputs, and to what degree the model believes them to be present.

| Output category | Description |
| --- | --- |
| `flagged` | Set to `true` if the model classifies the content as potentially harmful, `false` otherwise. |
| `categories` | Contains a dictionary of per-category violation flags. For each category, the value is `true` if the model flags the corresponding category as violated, `false` otherwise. |
| `category_scores` | Contains a dictionary of per-category scores output by the model, denoting the model's confidence that the input violates the OpenAI's policy for the category. The value is between 0 and 1, where higher values denote higher confidence. |
| `category_applied_input_types` | This property contains information on which input types were flagged in the response, for each category. For example, if the both the image and text inputs to the model are flagged for "violence/graphic", the `violence/graphic` property will be set to `["image", "text"]`. This is only available on omni models. |

We plan to continuously upgrade the moderation endpoint's underlying model. Therefore, custom policies that rely on `category_scores` may need recalibration over time.

## Content classifications

The table below describes the types of content that can be detected in the moderation API, along with what models and input types are supported for each category.

| **Category** | **Description** | **Models** | **Inputs** |
| --- | --- | --- | --- |
| `harassment` | Content that expresses, incites, or promotes harassing language towards any target. | All | Text only |
| `harassment/threatening` | Harassment content that also includes violence or serious harm towards any target. | All | Text only |
| `hate` | Content that expresses, incites, or promotes hate based on race, gender, ethnicity, religion, nationality, sexual orientation, disability status, or caste. Hateful content aimed at non-protected groups (e.g. chess players) is harassment. | All | Text only |
| `hate/threatening` | Hateful content that also includes violence or serious harm towards the targeted group based on race, gender, ethnicity, religion, nationality, sexual orientation, disability status, or caste. | All | Text only |
| `illicit` | Content that gives advice or instruction on how to commit illicit acts. A phrase like "how to shoplift" would fit this category. | Omni only | Text only |
| `illicit/violent` | The same types of content flagged by the `illicit` category, but also includes references to violence or procuring a weapon. | Omni only | Text only |
| `self-harm` | Content that promotes, encourages, or depicts acts of self-harm, such as suicide, cutting, and eating disorders. | All | Text and image |
| `self-harm/intent` | Content where the speaker expresses that they are engaging or intend to engage in acts of self-harm, such as suicide, cutting, and eating disorders. | All | Text and image |
| `self-harm/instructions` | Content that encourages performing acts of self-harm, such as suicide, cutting, and eating disorders, or that gives instructions or advice on how to commit such acts. | All | Text and image |
| `sexual` | Content meant to arouse sexual excitement, such as the description of sexual activity, or that promotes sexual services (excluding sex education and wellness). | All | Text and image |
| `sexual/minors` | Sexual content that includes an individual who is under 18 years old. | All | Text only |
| `violence` | Content that depicts death, violence, or physical injury. | All | Text and images |
| `violence/graphic` | Content that depicts death, violence, or physical injury in graphic detail. | All | Text and images |Log in [Sign up](/signup)

# Tutorials

Copy page

Get started with the OpenAI API by building real AI apps step by step.

[Website Q&A with Embeddings](/docs/tutorials/web-qa-embeddings)

[Learn how to build an AI that can answer questions about your website.](/docs/tutorials/web-qa-embeddings)

[Meeting minutes transcription with Whisper](/docs/tutorials/meeting-minutes)

[Learn how to create an automated meeting minutes generator with Whisper and GPT-4.](/docs/tutorials/meeting-minutes)

Coming soon

Learn how to build and deploy an AI chat bot that understands multiple knowledge bases.

* * *

Looking for more ideas? Check out our [Examples](/examples) or the [OpenAI Cookbook](https://cookbook.openai.com/) on GitHub.Log in [Sign up](/signup)

# Assistants migration guide  Beta

Copy page

Migrate from Assistant API v1 to v2.

We have changed the way that tools and files work in the Assistants API between the `v1` and `v2` versions of the beta. Both versions of the beta continue to be accessible via the API today, but we recommend migrating to the newest version of our APIs as soon as feasible. We will deprecate `v1` of the beta by the end of 2024.

If you do not use tools or files with the Assistants API today, there should be no changes required for you to migrate from the `v1` version to the `v2` version of the beta. Simply pass the [`v2` beta version header](/docs/assistants/migration#changing-beta-versions) and/or move to the latest version of our Node and Python SDKs!

## What has changed

The `v2` version of the Assistants API contains the following changes:

1. **Tool rename:** The `retrieval` tool has been renamed to the `file_search` tool
2. **Files belong to tools:** Files are now associated with tools instead of Assistants and Messages. This means that:

   - `AssistantFile` and `MessageFile` objects no longer exist.
   - Instead of `AssistantFile` and `MessageFile`, files are attached to Assistants and **Threads** using the new `tool_resources` object.

     - The `tool_resources` for the code interpreter tool are a list of `file_ids`.
     - The `tool_resources` for the `file_search` tool are a new object called a `vector_stores`.
   - Messages now have an `attachments`, rather than a `file_ids` parameter. Message attachments are helpers that add the files to a Thread’s `tool_resources`.

V1 Assistant

```json
1
2
3
4
5
6
7
8
9
10
11
12
{
  "id": "asst_abc123",
  "object": "assistant",
  "created_at": 1698984975,
  "name": "Math Tutor",
  "description": null,
  "model": "gpt-4-turbo",
  "instructions": "You are a personal math tutor. When asked a question, write and run Python code to answer the question.",
  "tools": [{ "type": "code_interpreter" }],
  "file_ids": [],
  "metadata": {}
}
```

V2 Assistant

```json
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
{
  "id": "asst_abc123",
  "object": "assistant",
  "created_at": 1698984975,
  "name": "Math Tutor",
  "description": null,
  "model": "gpt-4-turbo",
  "instructions": "You are a personal math tutor. When asked a question, write and run Python code to answer the question.",
  "tools": [\
    {\
      "type": "code_interpreter"\
    },\
    {\
      "type": "file_search"\
    }\
  ],
  "tool_resources": {
    "file_search": {
      "vector_store_ids": ["vs_abc"]
    },
    "code_interpreter": {
      "file_ids": ["file-123", "file-456"]
    }
  }
}
```

Assistants have `tools` and `tool_resources` instead of `file_ids`. The `retrieval` tool is now the `file_search` tool. The `tool_resource` for the `file_search` tool is a `vector_store`.

V1 Thread

```json
1
2
3
4
5
6
{
  "id": "thread_abc123",
  "object": "thread",
  "created_at": 1699012949,
  "metadata": {}
}
```

V2 Thread

```json
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
{
  "id": "thread_abc123",
  "object": "thread",
  "created_at": 1699012949,
  "metadata": {},
  "tools": [\
    {\
      "type": "file_search"\
    },\
    {\
      "type": "code_interpreter"\
    }\
  ],
  "tool_resources": {
    "file_search": {
      "vector_store_ids": ["vs_abc"]
    },
    "code_interpreter": {
      "file_ids": ["file-123", "file-456"]
    }
  }
}
```

Threads can bring their own `tool_resources` into a conversation.

V1 Message

```json
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
{
  "id": "msg_abc123",
  "object": "thread.message",
  "created_at": 1698983503,
  "thread_id": "thread_abc123",
  "role": "assistant",
  "content": [\
    {\
      "type": "text",\
      "text": {\
        "value": "Hi! How can I help you today?",\
        "annotations": []\
      }\
    }\
  ],
  "assistant_id": "asst_abc123",
  "run_id": "run_abc123",
  "metadata": {},
  "file_ids": []
}
```

V2 Message

```json
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
{
  "id": "msg_abc123",
  "object": "thread.message",
  "created_at": 1698983503,
  "thread_id": "thread_abc123",
  "role": "assistant",
  "content": [\
    {\
      "type": "text",\
      "text": {\
        "value": "Hi! How can I help you today?",\
        "annotations": []\
      }\
    }\
  ],
  "assistant_id": "asst_abc123",
  "run_id": "run_abc123",
  "metadata": {},
  "attachments": [\
    {\
      "file_id": "file-123",\
      "tools": [\
        { "type": "file_search" },\
        { "type": "code_interpreter" }\
      ]\
    }\
  ]
}
```

Messages have `attachments` instead of `file_ids`. `attachments` are helpers that add files to the Thread’s `tool_resources`.

All `v1` endpoints and objects for the Assistants API can be found under the [Legacy](/docs/api-reference/assistants-v1) section of the API reference.

## Accessing v1 data in v2

To make your migration simple between our `v1` and `v2` APIs, we automatically map `AssistantFiles` and `MessageFiles` to the appropriate `tool_resources` based on the tools that are enabled in Assistants or Runs these files are a part of.

|  | `v1` version | `v2` version |
| :-- | :-- | :-- |
| AssistantFiles for `code_interpreter` | `file_ids` on Assistant | Files in an Assistant’s `tool_resources.code_interpreter` |
| AssistantFiles for `retrieval` | `file_ids` on Assistant | Files in a vector\_store attached to an Assistant ( `tool_resources.file_search`) |
| MessageFiles for `code_interpreter` | `file_ids` on Message | Files in an Thread’s `tool_resources.code_interpreter` |
| MessageFiles for `retrieval` | `file_ids` on Message | Files in a vector\_store attached to a Thread ( `tool_resources.file_search`) |

It's important to note that while `file_ids` from `v1` are mapped to `tool_resources` in `v2`, the inverse is not true. Changes you make to `tool_resources` in `v2` will not be reflected as `file_ids` in `v1`.

Because Assistant Files and Message Files are already mapped to the appropriate `tool_resources` in `v2`, when you’re ready to migrate to `v2` you shouldn't have to worry about a data migration. Instead, you only need to:

1. Update your integration to reflect the new API and objects. You may need to do things like:
   - Migrate to creating `vector_stores` and using `file_search`, if you were using the `retrieval` tool. Importantly, since these operations are asynchronous, you’ll want to ensure files are [successfully ingested](/docs/assistants/tools/file-search#ensure-readiness-before-creating-runs) by the `vector_stores` before creating run.
   - Migrate to adding files to `tool_resources.code_interpreter` instead of an Assistant or Message’s files, if you were using the `code_interpreter` tool.
   - Migrate to using Message `attachments` instead of `file_ids`.
2. Upgrade to the latest version of our SDKs

## Changing beta versions

#### Without SDKs

Both beta versions can be accessed by passing the right API version header in your API requests:

1. `v1`: `OpenAI-Beta: assistants=v1`
2. `v2`: `OpenAI-Beta: assistants=v2`

v2

```v1
1
2
3
4
5
6
7
8
9
10
curl "https://api.openai.com/v1/assistants" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v1" \
  -d '{
    "instructions": "You are a personal math tutor. When asked a question, write and run Python code to answer the question.",
    "name": "Math Tutor",
    "tools": [{"type": "code_interpreter"}],
    "model": "gpt-4-turbo"
  }'
```

```v2
1
2
3
4
5
6
7
8
9
10
curl "https://api.openai.com/v1/assistants" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "OpenAI-Beta: assistants=v2" \
  -d '{
    "instructions": "You are a personal math tutor. When asked a question, write and run Python code to answer the question.",
    "name": "Math Tutor",
    "tools": [{"type": "code_interpreter"}],
    "model": "gpt-4-turbo"
  }'
```

### With SDKs

Versions of our SDKs that are released after the release of the **`v2`** beta will have the **`openai.beta`** namespace
point to the **`v2`** version of the API by default. You can still access the **`v1`** version of the API by using an older
version of the SDK (1.20.0 or earlier for python, 4.36.0 or earlier for node) or by overriding the version header.

To install an older version of the SDK, you can use the following commands:

Installing older versions of the SDK

python

```python
pip install openai==1.20.0
```

```javascript
npm install openai@4.36.0
```

You can also override this header in a newer SDK version, but we don't recommend this approach since the object types in these newer SDK versions will be different from the `v1` objects.

Accessing the \`v1\` API version in new SDKs

python

```python
1
2
3
from openai import OpenAI

client = OpenAI(default_headers={"OpenAI-Beta": "assistants=v1"})
```

```javascript
1
2
3
import OpenAI from "openai";

const openai = new OpenAI({ defaultHeaders: {"OpenAI-Beta": "assistants=v1"} });
```

## Billing

All [vector stores](/docs/api-reference/vector-stores/object) created before the release of the `v2` API (April 17, 2024) will be free to use until the end of 2024. This implies that any vector stores that were created as a result of us mapping your `v1` data to `v2`, before the `v2` launch will be free. After the end of 2024, they’ll be billed at whatever the fees for vector stores are at that point. See our [pricing page](https://openai.com/api/pricing) for the latest pricing information.

Any vector store that is created before the release of the `v2` API (April 17, 2024) but not used in a single Run between that release date and the end of 2024 will be deleted. This is to avoid us starting to bill you for something you created during the beta but never used.

Vector stores created after the release of the `v2` API will be billed at current rates as specified on the [pricing page](https://openai.com/api/pricing).

## Deleting files

Deleting Assistant Files / Message Files via the `v1` API also removes them from the `v2` API. However, the inverse is not true - deletions in the `v2` version of the API do not propogate to `v1`. If you created a file on `v1` and would like to "fully" delete a file from your account on both `v1` and `v2` you should:

- delete Assistant Files / Message Files you create using `v1` APIs using the `v1` endpoints, or
- delete the underlying [file object](/docs/api-reference/files/delete) — this ensures it is fully removed from all objects in all versions of the API.

## Playground

The default playground experience has been migrated to use the `v2` version of the API (you will still have a read-only view of the `v1` version of objects, but will not be able to edit them). Any changes you make to tools and files via the Playground will only be accessible in the `v2` version of the API.

In order to make changes to files in the `v1` version of the API, you will need to use the API directly.Log in [Sign up](/signup)

# Prompt generation

Copy page

Generate prompts and schemas in Playground.

The **Generate** button in the [Playground](/playground/chat) lets you generate prompts, [functions](/docs/guides/function-calling), and [schemas](/docs/guides/structured-outputs#supported-schemas) from just a description of your task. This guide will walk through exactly how it works.

## Overview

Creating prompts and schemas from scratch can be time-consuming, so generating them can help you get started quickly. The Generate button uses two main approaches:

1. **Prompts:** We use **meta-prompts** that incorporate best practices to generate or improve prompts.
2. **Schemas:** We use **meta-schemas** that produce valid JSON and function syntax.

While we currently use meta prompts and schemas, we may integrate more advanced techniques in the future like [DSPy](https://arxiv.org/abs/2310.03714) and ["Gradient Descent"](https://arxiv.org/abs/2305.03495).

## Prompts

A **meta-prompt** instructs the model to create a good prompt based on your task description or improve an existing one. The meta-prompts in the Playground draw from our [prompt engineering](/docs/guides/prompt-engineering) best practices and real-world experience with users.

We use specific meta-prompts for different output types, like audio, to ensure the generated prompts meet the expected format.

### Meta-prompts

Text-outAudio-out

Text meta-prompt

python

````python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
from openai import OpenAI

client = OpenAI()

META_PROMPT = """
Given a task description or existing prompt, produce a detailed system prompt to guide a language model in completing the task effectively.

# Guidelines

- Understand the Task: Grasp the main objective, goals, requirements, constraints, and expected output.
- Minimal Changes: If an existing prompt is provided, improve it only if it's simple. For complex prompts, enhance clarity and add missing elements without altering the original structure.
- Reasoning Before Conclusions**: Encourage reasoning steps before any conclusions are reached. ATTENTION! If the user provides examples where the reasoning happens afterward, REVERSE the order! NEVER START EXAMPLES WITH CONCLUSIONS!
    - Reasoning Order: Call out reasoning portions of the prompt and conclusion parts (specific fields by name). For each, determine the ORDER in which this is done, and whether it needs to be reversed.
    - Conclusion, classifications, or results should ALWAYS appear last.
- Examples: Include high-quality examples if helpful, using placeholders [in brackets] for complex elements.
   - What kinds of examples may need to be included, how many, and whether they are complex enough to benefit from placeholders.
- Clarity and Conciseness: Use clear, specific language. Avoid unnecessary instructions or bland statements.
- Formatting: Use markdown features for readability. DO NOT USE ``` CODE BLOCKS UNLESS SPECIFICALLY REQUESTED.
- Preserve User Content: If the input task or prompt includes extensive guidelines or examples, preserve them entirely, or as closely as possible. If they are vague, consider breaking down into sub-steps. Keep any details, guidelines, examples, variables, or placeholders provided by the user.
- Constants: DO include constants in the prompt, as they are not susceptible to prompt injection. Such as guides, rubrics, and examples.
- Output Format: Explicitly the most appropriate output format, in detail. This should include length and syntax (e.g. short sentence, paragraph, JSON, etc.)
    - For tasks outputting well-defined or structured data (classification, JSON, etc.) bias toward outputting a JSON.
    - JSON should never be wrapped in code blocks (```) unless explicitly requested.

The final prompt you output should adhere to the following structure below. Do not include any additional commentary, only output the completed system prompt. SPECIFICALLY, do not include any additional messages at the start or end of the prompt. (e.g. no "---")

[Concise instruction describing the task - this should be the first line in the prompt, no section header]

[Additional details as needed.]

[Optional sections with headings or bullet points for detailed steps.]

# Steps [optional]

[optional: a detailed breakdown of the steps necessary to accomplish the task]

# Output Format

[Specifically call out how the output should be formatted, be it response length, structure e.g. JSON, markdown, etc]

# Examples [optional]

[Optional: 1-3 well-defined examples with placeholders if necessary. Clearly mark where examples start and end, and what the input and output are. User placeholders as necessary.]
[If the examples are shorter than what a realistic example is expected to be, make a reference with () explaining how real examples should be longer / shorter / different. AND USE PLACEHOLDERS! ]

# Notes [optional]

[optional: edge cases, details, and an area to call or repeat out specific important considerations]
""".strip()

def generate_prompt(task_or_prompt: str):
    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[\
            {\
                "role": "system",\
                "content": META_PROMPT,\
            },\
            {\
                "role": "user",\
                "content": "Task, Goal, or Current Prompt:\n" + task_or_prompt,\
            },\
        ],
    )

    return completion.choices[0].message.content
````

### Prompt edits

To edit prompts, we use a slightly modified meta-prompt. While direct edits are straightforward to apply, identifying necessary changes for more open-ended revisions can be challenging. To address this, we include a **reasoning section** at the beginning of the response. This section helps guide the model in determining what changes are needed by evaluating the existing prompt's clarity, chain-of-thought ordering, overall structure, and specificity, among other factors. The reasoning section makes suggestions for improvements and is then parsed out from the final response.

Text-outAudio-out

Text meta-prompt for edits

python

````python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
from openai import OpenAI

client = OpenAI()

META_PROMPT = """
Given a current prompt and a change description, produce a detailed system prompt to guide a language model in completing the task effectively.

Your final output will be the full corrected prompt verbatim. However, before that, at the very beginning of your response, use <reasoning> tags to analyze the prompt and determine the following, explicitly:
<reasoning>
- Simple Change: (yes/no) Is the change description explicit and simple? (If so, skip the rest of these questions.)
- Reasoning: (yes/no) Does the current prompt use reasoning, analysis, or chain of thought?
    - Identify: (max 10 words) if so, which section(s) utilize reasoning?
    - Conclusion: (yes/no) is the chain of thought used to determine a conclusion?
    - Ordering: (before/after) is the chain of though located before or after
- Structure: (yes/no) does the input prompt have a well defined structure
- Examples: (yes/no) does the input prompt have few-shot examples
    - Representative: (1-5) if present, how representative are the examples?
- Complexity: (1-5) how complex is the input prompt?
    - Task: (1-5) how complex is the implied task?
    - Necessity: ()
- Specificity: (1-5) how detailed and specific is the prompt? (not to be confused with length)
- Prioritization: (list) what 1-3 categories are the MOST important to address.
- Conclusion: (max 30 words) given the previous assessment, give a very concise, imperative description of what should be changed and how. this does not have to adhere strictly to only the categories listed
</reasoning>

# Guidelines

- Understand the Task: Grasp the main objective, goals, requirements, constraints, and expected output.
- Minimal Changes: If an existing prompt is provided, improve it only if it's simple. For complex prompts, enhance clarity and add missing elements without altering the original structure.
- Reasoning Before Conclusions**: Encourage reasoning steps before any conclusions are reached. ATTENTION! If the user provides examples where the reasoning happens afterward, REVERSE the order! NEVER START EXAMPLES WITH CONCLUSIONS!
    - Reasoning Order: Call out reasoning portions of the prompt and conclusion parts (specific fields by name). For each, determine the ORDER in which this is done, and whether it needs to be reversed.
    - Conclusion, classifications, or results should ALWAYS appear last.
- Examples: Include high-quality examples if helpful, using placeholders [in brackets] for complex elements.
   - What kinds of examples may need to be included, how many, and whether they are complex enough to benefit from placeholders.
- Clarity and Conciseness: Use clear, specific language. Avoid unnecessary instructions or bland statements.
- Formatting: Use markdown features for readability. DO NOT USE ``` CODE BLOCKS UNLESS SPECIFICALLY REQUESTED.
- Preserve User Content: If the input task or prompt includes extensive guidelines or examples, preserve them entirely, or as closely as possible. If they are vague, consider breaking down into sub-steps. Keep any details, guidelines, examples, variables, or placeholders provided by the user.
- Constants: DO include constants in the prompt, as they are not susceptible to prompt injection. Such as guides, rubrics, and examples.
- Output Format: Explicitly the most appropriate output format, in detail. This should include length and syntax (e.g. short sentence, paragraph, JSON, etc.)
    - For tasks outputting well-defined or structured data (classification, JSON, etc.) bias toward outputting a JSON.
    - JSON should never be wrapped in code blocks (```) unless explicitly requested.

The final prompt you output should adhere to the following structure below. Do not include any additional commentary, only output the completed system prompt. SPECIFICALLY, do not include any additional messages at the start or end of the prompt. (e.g. no "---")

[Concise instruction describing the task - this should be the first line in the prompt, no section header]

[Additional details as needed.]

[Optional sections with headings or bullet points for detailed steps.]

# Steps [optional]

[optional: a detailed breakdown of the steps necessary to accomplish the task]

# Output Format

[Specifically call out how the output should be formatted, be it response length, structure e.g. JSON, markdown, etc]

# Examples [optional]

[Optional: 1-3 well-defined examples with placeholders if necessary. Clearly mark where examples start and end, and what the input and output are. User placeholders as necessary.]
[If the examples are shorter than what a realistic example is expected to be, make a reference with () explaining how real examples should be longer / shorter / different. AND USE PLACEHOLDERS! ]

# Notes [optional]

[optional: edge cases, details, and an area to call or repeat out specific important considerations]
[NOTE: you must start with a <reasoning> section. the immediate next token you produce should be <reasoning>]
""".strip()

def generate_prompt(task_or_prompt: str):
    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[\
            {\
                "role": "system",\
                "content": META_PROMPT,\
            },\
            {\
                "role": "user",\
                "content": "Task, Goal, or Current Prompt:\n" + task_or_prompt,\
            },\
        ],
    )

    return completion.choices[0].message.content
````

## Schemas

[Structured Outputs](/guides/structured-outputs) schemas and function schemas are themselves JSON objects, so we leverage Structured Outputs to generate them.
This requires defining a schema for the desired output, which in this case is itself a schema. To do this, we use a self-describing schema – a **meta-schema**.

Because the `parameters` field in a function schema is itself a schema, we use the same meta-schema to generate functions.

### Defining a constrained meta-schema

[Structured Outputs](/guides/structured-outputs) supports two modes: `strict=true` and `strict=false`. Both modes use the same model trained to follow the provided schema, but only "strict mode" guarantees perfect adherence through constrained sampling.

Our goal is to generate schemas for strict mode using strict mode itself. However, the official meta-schemas provided by the [JSON Schema Specification](https://json-schema.org/specification#meta-schemas) rely on features [not currently supported](/docs/guides/structured-outputs#some-type-specific-keywords-are-not-yet-supported) in strict mode. This poses challenges that affect both input and output schemas.

1. **Input schema:** We can't use [unsupported features](/docs/guides/structured-outputs#some-type-specific-keywords-are-not-yet-supported) in the input schema to describe the output schema.
2. **Output schema:** The generated schema must not include [unsupported features](/docs/guides/structured-outputs#some-type-specific-keywords-are-not-yet-supported).

Because we need to generate new keys in the output schema, the input meta-schema must use `additionalProperties`. This means we can't currently use strict mode to generate schemas. However, we still want the generated schema to conform to strict mode constraints.

To overcome this limitation, we define a **pseudo-meta-schema** — a meta-schema that uses features not supported in strict mode to describe only the features that are supported in strict mode. Essentially, this approach steps outside strict mode for the meta-schema definition while still ensuring that the generated schemas adhere to strict mode constraints.

Deep dive

How we designed the pseudo-meta-schema

### Output cleaning

Strict mode guarantees perfect schema adherence. Because we can't use it during generation, however, we need to validate and transform the output after generating it.

After generating a schema, we perform the following steps:

1. **Set `additionalProperties` to `false`** for all objects.
2. **Mark all properties as required**.
3. **For structured output schemas**, wrap them in [`json_schema`](/docs/guides/structured-outputs#how-to-use?context=without_parse) object.
4. **For functions**, wrap them in a [`function`](/docs/guides/function-calling#step-3-pass-your-function-definitions-as-available-tools-to-the-model-along-with-the-messages) object.

The Realtime API [function](/docs/guides/realtime#function-calls) object differs slightly from the Chat Completions API, but uses the same schema.

### Meta-schemas

Each meta-schema has a corresponding prompt which includes few-shot examples. When combined with the reliability of Structured Outputs — even without strict mode — we were able to use `gpt-4o-mini` for schema generation.

Structured output schemaFunction schema

Structured output meta-schema

python

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
105
106
107
108
109
110
111
112
113
114
115
116
117
118
119
120
121
122
123
124
125
126
127
128
129
130
131
132
133
134
135
136
137
138
139
140
141
142
143
144
145
146
147
148
149
150
151
152
153
154
155
156
157
158
159
160
161
162
163
164
165
166
167
168
169
170
171
172
173
174
175
176
177
178
179
180
181
182
183
184
185
186
187
188
189
190
191
192
193
194
195
196
197
198
199
200
201
202
203
204
205
206
207
208
209
210
211
212
213
214
215
216
217
218
219
220
221
222
223
224
225
226
227
228
229
230
231
232
233
234
235
236
237
238
239
240
241
242
243
244
245
246
247
248
249
250
251
252
253
254
255
256
257
258
259
260
261
262
263
264
265
266
267
268
269
270
271
272
273
274
275
276
277
278
279
280
281
282
283
284
285
286
287
288
289
290
291
292
293
294
295
296
297
298
299
300
301
302
303
304
305
306
307
308
309
310
311
312
313
314
315
316
317
318
319
320
from openai import OpenAI
import json

client = OpenAI()

META_SCHEMA = {
  "name": "metaschema",
  "schema": {
    "type": "object",
    "properties": {
      "name": {
        "type": "string",
        "description": "The name of the schema"
      },
      "type": {
        "type": "string",
        "enum": [\
          "object",\
          "array",\
          "string",\
          "number",\
          "boolean",\
          "null"\
        ]
      },
      "properties": {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/$defs/schema_definition"
        }
      },
      "items": {
        "anyOf": [\
          {\
            "$ref": "#/$defs/schema_definition"\
          },\
          {\
            "type": "array",\
            "items": {\
              "$ref": "#/$defs/schema_definition"\
            }\
          }\
        ]
      },
      "required": {
        "type": "array",
        "items": {
          "type": "string"
        }
      },
      "additionalProperties": {
        "type": "boolean"
      }
    },
    "required": [\
      "type"\
    ],
    "additionalProperties": False,
    "if": {
      "properties": {
        "type": {
          "const": "object"
        }
      }
    },
    "then": {
      "required": [\
        "properties"\
      ]
    },
    "$defs": {
      "schema_definition": {
        "type": "object",
        "properties": {
          "type": {
            "type": "string",
            "enum": [\
              "object",\
              "array",\
              "string",\
              "number",\
              "boolean",\
              "null"\
            ]
          },
          "properties": {
            "type": "object",
            "additionalProperties": {
              "$ref": "#/$defs/schema_definition"
            }
          },
          "items": {
            "anyOf": [\
              {\
                "$ref": "#/$defs/schema_definition"\
              },\
              {\
                "type": "array",\
                "items": {\
                  "$ref": "#/$defs/schema_definition"\
                }\
              }\
            ]
          },
          "required": {
            "type": "array",
            "items": {
              "type": "string"
            }
          },
          "additionalProperties": {
            "type": "boolean"
          }
        },
        "required": [\
          "type"\
        ],
        "additionalProperties": False,
        "if": {
          "properties": {
            "type": {
              "const": "object"
            }
          }
        },
        "then": {
          "required": [\
            "properties"\
          ]
        }
      }
    }
  }
}

META_PROMPT = """
# Instructions
Return a valid schema for the described JSON.

You must also make sure:
- all fields in an object are set as required
- I REPEAT, ALL FIELDS MUST BE MARKED AS REQUIRED
- all objects must have additionalProperties set to false
    - because of this, some cases like "attributes" or "metadata" properties that would normally allow additional properties should instead have a fixed set of properties
- all objects must have properties defined
- field order matters. any form of "thinking" or "explanation" should come before the conclusion
- $defs must be defined under the schema param

Notable keywords NOT supported include:
- For strings: minLength, maxLength, pattern, format
- For numbers: minimum, maximum, multipleOf
- For objects: patternProperties, unevaluatedProperties, propertyNames, minProperties, maxProperties
- For arrays: unevaluatedItems, contains, minContains, maxContains, minItems, maxItems, uniqueItems

Other notes:
- definitions and recursion are supported
- only if necessary to include references e.g. "$defs", it must be inside the "schema" object

# Examples
Input: Generate a math reasoning schema with steps and a final answer.
Output: {
    "name": "math_reasoning",
    "type": "object",
    "properties": {
        "steps": {
            "type": "array",
            "description": "A sequence of steps involved in solving the math problem.",
            "items": {
                "type": "object",
                "properties": {
                    "explanation": {
                        "type": "string",
                        "description": "Description of the reasoning or method used in this step."
                    },
                    "output": {
                        "type": "string",
                        "description": "Result or outcome of this specific step."
                    }
                },
                "required": [\
                    "explanation",\
                    "output"\
                ],
                "additionalProperties": false
            }
        },
        "final_answer": {
            "type": "string",
            "description": "The final solution or answer to the math problem."
        }
    },
    "required": [\
        "steps",\
        "final_answer"\
    ],
    "additionalProperties": false
}

Input: Give me a linked list
Output: {
    "name": "linked_list",
    "type": "object",
    "properties": {
        "linked_list": {
            "$ref": "#/$defs/linked_list_node",
            "description": "The head node of the linked list."
        }
    },
    "$defs": {
        "linked_list_node": {
            "type": "object",
            "description": "Defines a node in a singly linked list.",
            "properties": {
                "value": {
                    "type": "number",
                    "description": "The value stored in this node."
                },
                "next": {
                    "anyOf": [\
                        {\
                            "$ref": "#/$defs/linked_list_node"\
                        },\
                        {\
                            "type": "null"\
                        }\
                    ],
                    "description": "Reference to the next node; null if it is the last node."
                }
            },
            "required": [\
                "value",\
                "next"\
            ],
            "additionalProperties": false
        }
    },
    "required": [\
        "linked_list"\
    ],
    "additionalProperties": false
}

Input: Dynamically generated UI
Output: {
    "name": "ui",
    "type": "object",
    "properties": {
        "type": {
            "type": "string",
            "description": "The type of the UI component",
            "enum": [\
                "div",\
                "button",\
                "header",\
                "section",\
                "field",\
                "form"\
            ]
        },
        "label": {
            "type": "string",
            "description": "The label of the UI component, used for buttons or form fields"
        },
        "children": {
            "type": "array",
            "description": "Nested UI components",
            "items": {
                "$ref": "#"
            }
        },
        "attributes": {
            "type": "array",
            "description": "Arbitrary attributes for the UI component, suitable for any element",
            "items": {
                "type": "object",
                "properties": {
                    "name": {
                        "type": "string",
                        "description": "The name of the attribute, for example onClick or className"
                    },
                    "value": {
                        "type": "string",
                        "description": "The value of the attribute"
                    }
                },
                "required": [\
                    "name",\
                    "value"\
                ],
                "additionalProperties": false
            }
        }
    },
    "required": [\
        "type",\
        "label",\
        "children",\
        "attributes"\
    ],
    "additionalProperties": false
}
""".strip()

def generate_schema(description: str):
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        response_format={"type": "json_schema", "json_schema": META_SCHEMA},
        messages=[\
            {\
                "role": "system",\
                "content": META_PROMPT,\
            },\
            {\
                "role": "user",\
                "content": "Description:\n" + description,\
            },\
        ],
    )

    return json.loads(completion.choices[0].message.content)
```Log in [Sign up](/signup)

# Model selection

Copy page

Choose the best model for performance and cost.

Choosing the right model, whether GPT-4o or a smaller option like GPT-4o-mini, requires balancing **accuracy**, **latency**, and **cost**. This guide explains key principles to help you make informed decisions, along with a practical example.

## Core Principles

The principles for model selection are simple:

- **Optimize for accuracy first:** Optimize for accuracy until you hit your accuracy target.
- **Optimize for cost and latency second:** Then aim to maintain accuracy with the cheapest, fastest model possible.

### 1\. Focus on Accuracy First

Begin by setting a clear accuracy goal for your use case, where you're clear on the accuracy that would be "good enough" for this use case to go to production. You can accomplish this through:

- **Setting a clear accuracy target:** Identify what your target accuracy statistic is going to be.

  - For example, 90% of customer service calls need to be triaged correctly at the first interaction.
- **Developing an evaluation dataset:** Create a dataset that allows you to measure the model's performance against these goals.

  - To extend the example above, capture 100 interaction examples where we have what the user asked for, what the LLM triaged them to, what the correct triage should be, and whether this was correct or not.
- **Using the most powerful model to optimize:** Start with the most capable model available to achieve your accuracy targets. Log all responses so we can use them for distillation of a smaller model.

  - Use retrieval-augmented generation to optimize for accuracy
  - Use fine-tuning to optimize for consistency and behavior

During this process, collect prompt and completion pairs for use in evaluations, few-shot learning, or fine-tuning. This practice, known as **prompt baking**, helps you produce high-quality examples for future use.

For more methods and tools here, see our [Accuracy Optimization Guide](https://platform.openai.com/docs/guides/optimizing-llm-accuracy).

#### Setting a realistic accuracy target

Calculate a realistic accuracy target by evaluating the financial impact of model decisions. For example, in a fake news classification scenario:

- **Correctly classified news:** If the model classifies it correctly, it saves you the cost of a human reviewing it - let's assume **$50**.
- **Incorrectly classified news:** If it falsely classifies a safe article or misses a fake news article, it may trigger a review process and possible complaint, which might cost us **$300**.

Our news classification example would need **85.8%** accuracy to cover costs, so targeting 90% or more ensures an overall return on investment. Use these calculations to set an effective accuracy target based on your specific cost structures.

### 2\. Optimize cost and latency

Cost and latency are considered secondary because if the model can’t hit your accuracy target then these concerns are moot. However, once you’ve got a model that works for your use case, you can take one of two approaches:

- **Compare with a smaller model zero- or few-shot:** Swap out the model for a smaller, cheaper one and test whether it maintains accuracy at the lower cost and latency point.
- **Model distillation:** Fine-tune a smaller model using the data gathered during accuracy optimization.

Cost and latency are typically interconnected; reducing tokens and requests generally leads to faster processing.

The main strategies to consider here are:

- **Reduce requests:** Limit the number of necessary requests to complete tasks.
- **Minimize tokens:** Lower the number of input tokens and optimize for shorter model outputs.
- **Select a smaller model:** Use models that balance reduced costs and latency with maintained accuracy.

To dive deeper into these, please refer to our guide on [latency optimization](https://platform.openai.com/docs/guides/latency-optimization).

#### Exceptions to the rule

Clear exceptions exist for these principles. If your use case is extremely cost or latency sensitive, establish thresholds for these metrics before beginning your testing, then remove the models that exceed those from consideration. Once benchmarks are set, these guidelines will help you refine model accuracy within your constraints.

## Practical example

To demonstrate these principles, we'll develop a fake news classifier with the following target metrics:

- **Accuracy:** Achieve 90% correct classification
- **Cost:** Spend less than $5 per 1,000 articles
- **Latency:** Maintain processing time under 2 seconds per article

### Experiments

We ran three experiments to reach our goal:

1. **Zero-shot:** Used `GPT-4o` with a basic prompt for 1,000 records, but missed the accuracy target.
2. **Few-shot learning:** Included 5 few-shot examples, meeting the accuracy target but exceeding cost due to more prompt tokens.
3. **Fine-tuned model:** Fine-tuned `GPT-4o-mini` with 1,000 labeled examples, meeting all targets with similar latency and accuracy but significantly lower costs.

| ID | Method | Accuracy | Accuracy target | Cost | Cost target | Avg. latency | Latency target |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | gpt-4o zero-shot | 84.5% |  | $1.72 |  | < 1s |  |
| 2 | gpt-4o few-shot (n=5) | 91.5% | ✓ | $11.92 |  | < 1s | ✓ |
| 3 | gpt-4o-mini fine-tuned w/ 1000 examples | 91.5% | ✓ | $0.21 | ✓ | < 1s | ✓ |

## Conclusion

By switching from `gpt-4o` to `gpt-4o-mini` with fine-tuning, we achieved **equivalent performance for less than 2%** of the cost, using only 1,000 labeled examples.

This process is important - you often can’t jump right to fine-tuning because you don’t know whether fine-tuning is the right tool for the optimization you need, or you don’t have enough labeled examples. Use `gpt-4o` to achieve your accuracy targets, and curate a good training set - then go for a smaller, more efficient model with fine-tuning.Log in [Sign up](/signup)

# Meeting minutes

Copy page

Create an automated meeting minutes generator with Whisper and GPT-4.

In this tutorial, we'll harness the power of OpenAI's Whisper and GPT-4 models to develop an automated meeting minutes generator. The application transcribes audio from a meeting, provides a summary of the discussion, extracts key points and action items, and performs a sentiment analysis.

## Getting started

This tutorial assumes a basic understanding of Python and an [OpenAI API key](/settings/organization/api-keys). You can use the audio file provided with this tutorial or your own.

Additionally, you will need to install the [python-docx](https://python-docx.readthedocs.io/en/latest/) and [OpenAI](/docs/libraries) libraries. You can create a new Python environment and install the required packages with the following commands:

```bash
1
2
3
4
5
6
python -m venv env

source env/bin/activate

pip install openai
pip install python-docx
```

## Transcribing audio with Whisper

![Audio Waveform created by DALL·E](https://cdn.openai.com/API/docs/images/tutorials/meeting-minutes/waveform3.png)

The first step in transcribing the audio from a meeting is to pass the audio file of the meeting into our [/v1/audio API](/docs/api-reference/audio). Whisper, the model that powers the audio API, is capable of converting spoken language into written text. To start, we will avoid passing a [prompt](/docs/api-reference/audio/createTranscription#audio/createTranscription-prompt) or [temperature](/docs/api-reference/audio/createTranscription#audio/createTranscription-temperature-4) (optional parameters to control the model's output) and stick with the default values.

[Download sample audio](https://cdn.openai.com/API/docs/images/tutorials/meeting-minutes/EarningsCall.wav)

Next, we import the required packages and define a function that uses the Whisper model to take in the audio file and
transcribe it:

```python
1
2
3
4
5
6
7
8
9
10
11
12
from openai import OpenAI

client = OpenAI(
    # defaults to os.environ.get("OPENAI_API_KEY")
    # api_key="My API Key",
)
from docx import Document

def transcribe_audio(audio_file_path):
    with open(audio_file_path, 'rb') as audio_file:
        transcription = client.audio.transcriptions.create("whisper-1", audio_file)
    return transcription['text']
```

In this function, `audio_file_path` is the path to the audio file you want to transcribe. The function opens this file and passes it to the Whisper ASR model ( `whisper-1`) for transcription. The result is returned as raw text. It’s important to note that the `openai.Audio.transcribe` function requires the actual audio file to be passed in, not just the path to the file locally or on a remote server. This means that if you are running this code on a server where you might not also be storing your audio files, you will need to have a preprocessing step that first downloads the audio files onto that device.

## Summarizing and analyzing the transcript with GPT-4

Having obtained the transcript, we now pass it to GPT-4 via the [Chat Completions API](/docs/api-reference/chat/create). GPT-4 is OpenAI's state-of-the-art large language model which we'll use to generate a summary, extract key points, action items, and perform sentiment analysis.

This tutorial uses distinct functions for each task we want GPT-4 to perform. This is not the most efficient way to do this task - you can put these instructions into one function, however, splitting them up can lead to higher quality summarization.

To split the tasks up, we define the `meeting_minutes` function which will serve as the main function of this application:

```python
1
2
3
4
5
6
7
8
9
10
11
def meeting_minutes(transcription):
    abstract_summary = abstract_summary_extraction(transcription)
    key_points = key_points_extraction(transcription)
    action_items = action_item_extraction(transcription)
    sentiment = sentiment_analysis(transcription)
    return {
        'abstract_summary': abstract_summary,
        'key_points': key_points,
        'action_items': action_items,
        'sentiment': sentiment
    }
```

In this function, `transcription` is the text we obtained from Whisper. The transcription can be passed to the four other functions, each designed to perform a specific task: `abstract_summary_extraction` generates a summary of the meeting, `key_points_extraction` extracts the main points, `action_item_extraction` identifies the action items, and `sentiment_analysis performs` a sentiment analysis. If there are other capabilities you want, you can add those in as well using the same framework shown above.

Here is how each of these functions works:

### Summary extraction

The `abstract_summary_extraction` function takes the transcription and summarizes it into a concise abstract paragraph with the aim to retain the most important points while avoiding unnecessary details or tangential points. The main mechanism to enable this process is the system message as shown below. There are many different possible ways of achieving similar results through the process commonly referred to as prompt engineering. You can read our [prompt engineering guide](/docs/guides/prompt-engineering) which gives in depth advice on how to do this most effectively.

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
def abstract_summary_extraction(transcription):
    response = client.chat.completions.create(
        model="gpt-4",
        temperature=0,
        messages=[\
            {\
                "role": "system",\
                "content": "You are a highly skilled AI trained in language comprehension and summarization. I would like you to read the following text and summarize it into a concise abstract paragraph. Aim to retain the most important points, providing a coherent and readable summary that could help a person understand the main points of the discussion without needing to read the entire text. Please avoid unnecessary details or tangential points."\
            },\
            {\
                "role": "user",\
                "content": transcription\
            }\
        ]
    )
    return completion.choices[0].message.content
```

### Key points extraction

The `key_points_extraction` function identifies and lists the main points discussed in the meeting. These points should represent the most important ideas, findings, or topics crucial to the essence of the discussion. Again, the main mechanism for controlling the way these points are identified is the system message. You might want to give some additional context here around the way your project or company runs such as “We are a company that sells race cars to consumers. We do XYZ with the goal of XYZ”. This additional context could dramatically improve the models ability to extract information that is relevant.

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
def key_points_extraction(transcription):
    response = client.chat.completions.create(
        model="gpt-4",
        temperature=0,
        messages=[\
            {\
                "role": "system",\
                "content": "You are a proficient AI with a specialty in distilling information into key points. Based on the following text, identify and list the main points that were discussed or brought up. These should be the most important ideas, findings, or topics that are crucial to the essence of the discussion. Your goal is to provide a list that someone could read to quickly understand what was talked about."\
            },\
            {\
                "role": "user",\
                "content": transcription\
            }\
        ]
    )
    return completion.choices[0].message.content
```

### Action item extraction

The `action_item_extraction` function identifies tasks, assignments, or actions agreed upon or mentioned during the meeting. These could be tasks assigned to specific individuals or general actions the group decided to take. While not covered in this tutorial, the Chat Completions API provides a [function calling capability](/docs/guides/function-calling) which would allow you to build in the ability to automatically create tasks in your task management software and assign it to the relevant person.

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
def action_item_extraction(transcription):
    response = client.chat.completions.create(
        model="gpt-4",
        temperature=0,
        messages=[\
            {\
                "role": "system",\
                "content": "You are an AI expert in analyzing conversations and extracting action items. Please review the text and identify any tasks, assignments, or actions that were agreed upon or mentioned as needing to be done. These could be tasks assigned to specific individuals, or general actions that the group has decided to take. Please list these action items clearly and concisely."\
            },\
            {\
                "role": "user",\
                "content": transcription\
            }\
        ]
    )
    return completion.choices[0].message.content
```

### Sentiment analysis

The `sentiment_analysis` function analyzes the overall sentiment of the discussion. It considers the tone, the emotions conveyed by the language used, and the context in which words and phrases are used. For tasks which are less complicated, it may also be worthwhile to try out `gpt-3.5-turbo` in addition to `gpt-4` to see if you can get a similar level of performance. It might also be useful to experiment with taking the results of the `sentiment_analysis` function and passing it to the other functions to see how having the sentiment of the conversation impacts the other attributes.

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
def sentiment_analysis(transcription):
    response = client.chat.completions.create(
        model="gpt-4",
        temperature=0,
        messages=[\
            {\
                "role": "system",\
                "content": "As an AI with expertise in language and emotion analysis, your task is to analyze the sentiment of the following text. Please consider the overall tone of the discussion, the emotion conveyed by the language used, and the context in which words and phrases are used. Indicate whether the sentiment is generally positive, negative, or neutral, and provide brief explanations for your analysis where possible."\
            },\
            {\
                "role": "user",\
                "content": transcription\
            }\
        ]
    )
    return completion.choices[0].message.content
```

## Exporting meeting minutes

![Audio Waveform created by DALL·E](https://cdn.openai.com/API/docs/images/tutorials/meeting-minutes/waveform4.png)

Once we've generated the meeting minutes, it's beneficial to save them into a
readable format that can be easily distributed. One common format for such
reports is Microsoft Word. The Python docx library is a popular open source
library for creating Word documents. If you wanted to build an end-to-end
meeting minute application, you might consider removing this export step in
favor of sending the summary inline as an email followup.

To handle the exporting process, define a function `save_as_docx` that converts the raw text to a Word document:

```python
1
2
3
4
5
6
7
8
9
10
def save_as_docx(minutes, filename):
    doc = Document()
    for key, value in minutes.items():
        # Replace underscores with spaces and capitalize each word for the heading
        heading = ' '.join(word.capitalize() for word in key.split('_'))
        doc.add_heading(heading, level=1)
        doc.add_paragraph(value)
        # Add a line break between sections
        doc.add_paragraph()
    doc.save(filename)
```

In this function, minutes is a dictionary containing the abstract summary, key points, action items, and sentiment analysis from the meeting. Filename is the name of the Word document file to be created. The function creates a new Word document, adds headings and content for each part of the minutes, and then saves the document to the current working directory.

Finally, you can put it all together and generate the meeting minutes from an audio file:

```python
1
2
3
4
5
6
audio_file_path = "Earningscall.wav"
transcription = transcribe_audio(audio_file_path)
minutes = meeting_minutes(transcription)
print(minutes)

save_as_docx(minutes, 'meeting_minutes.docx')
```

This code will transcribe the audio file `Earningscall.wav`, generates the meeting minutes, prints them, and then saves them into a Word document called `meeting_minutes.docx`.

Now that you have the basic meeting minutes processing setup, consider trying to optimize the performance with [prompt engineering](/docs/guides/prompt-engineering) or build an end-to-end system with native [function calling](/docs/guides/function-calling).Log in [Sign up](/signup)

# Text generation

Copy page

Learn how to generate text from a prompt.

OpenAI provides simple APIs to use a [large language model](/docs/models) to generate text from a prompt, as you might using [ChatGPT](https://chatgpt.com). These models have been trained on vast quantities of data to understand multimedia inputs and natural language instructions. From these [prompts](/docs/guides/prompt-engineering), models can generate almost any kind of text response, like code, mathematical equations, structured JSON data, or human-like prose.

## Quickstart

To generate text, you can use the [chat completions endpoint](/docs/api-reference/chat/) in the REST API, as seen in the examples below. You can either use the [REST API](/docs/api-reference) from the HTTP client of your choice, or use one of OpenAI's [official SDKs](/docs/libraries) for your preferred programming language.

Generate proseAnalyze an imageGenerate JSON data

Generate prose

Create a human-like response to a prompt

javascript

```javascript
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
import OpenAI from "openai";
const openai = new OpenAI();

const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [\
        { role: "system", content: "You are a helpful assistant." },\
        {\
            role: "user",\
            content: "Write a haiku about recursion in programming.",\
        },\
    ],
});

console.log(completion.choices[0].message);
```

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
from openai import OpenAI
client = OpenAI()

completion = client.chat.completions.create(
    model="gpt-4o",
    messages=[\
        {"role": "system", "content": "You are a helpful assistant."},\
        {\
            "role": "user",\
            "content": "Write a haiku about recursion in programming."\
        }\
    ]
)

print(completion.choices[0].message)
```

```bash
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
curl "https://api.openai.com/v1/chat/completions" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
        "model": "gpt-4o",
        "messages": [\
            {\
                "role": "system",\
                "content": "You are a helpful assistant."\
            },\
            {\
                "role": "user",\
                "content": "Write a haiku about recursion in programming."\
            }\
        ]
    }'
```

Analyze an image

Describe the contents of an image

javascript

```javascript
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
import OpenAI from "openai";
const openai = new OpenAI();

const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [\
        {\
            role: "user",\
            content: [\
                { type: "text", text: "What's in this image?" },\
                {\
                    type: "image_url",\
                    image_url: {\
                        "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",\
                    },\
                }\
            ],\
        },\
    ],
});

console.log(completion.choices[0].message);
```

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
from openai import OpenAI

client = OpenAI()

completion = client.chat.completions.create(
    model="gpt-4o",
    messages=[\
        {\
            "role": "user",\
            "content": [\
                {"type": "text", "text": "What's in this image?"},\
                {\
                    "type": "image_url",\
                    "image_url": {\
                        "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",\
                    }\
                },\
            ],\
        }\
    ],
)

print(completion.choices[0].message)
```

```bash
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-4o",
    "messages": [\
      {\
        "role": "user",\
        "content": [\
          {\
            "type": "text",\
            "text": "What is in this image?"\
          },\
          {\
            "type": "image_url",\
            "image_url": {\
              "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg"\
            }\
          }\
        ]\
      }\
    ]
  }'
```

Generate JSON data

Generate JSON data based on a JSON Schema

javascript

```javascript
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
import OpenAI from "openai";
const openai = new OpenAI();

const completion = await openai.chat.completions.create({
    model: "gpt-4o-2024-08-06",
    messages: [\
        { role: "system", content: "You extract email addresses into JSON data." },\
        {\
            role: "user",\
            content: "Feeling stuck? Send a message to help@mycompany.com.",\
        },\
    ],
    response_format: {
        // See /docs/guides/structured-outputs
        type: "json_schema",
        json_schema: {
            name: "email_schema",
            schema: {
                type: "object",
                properties: {
                    email: {
                        description: "The email address that appears in the input",
                        type: "string"
                    }
                },
                additionalProperties: false
            }
        }
    }
});

console.log(completion.choices[0].message.content);
```

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
from openai import OpenAI
client = OpenAI()

response = client.chat.completions.create(
    model="gpt-4o-2024-08-06",
    messages=[\
        {\
            "role": "system",\
            "content": "You extract email addresses into JSON data."\
        },\
        {\
            "role": "user",\
            "content": "Feeling stuck? Send a message to help@mycompany.com."\
        }\
    ],
    response_format={
        "type": "json_schema",
        "json_schema": {
            "name": "email_schema",
            "schema": {
                "type": "object",
                "properties": {
                    "email": {
                        "description": "The email address that appears in the input",
                        "type": "string"
                    },
                    "additionalProperties": False
                }
            }
        }
    }
)

print(response.choices[0].message.content);
```

```bash
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-4o-2024-08-06",
    "messages": [\
      {\
        "role": "system",\
        "content": "You extract email addresses into JSON data."\
      },\
      {\
        "role": "user",\
        "content": "Feeling stuck? Send a message to help@mycompany.com."\
      }\
    ],
    "response_format": {
      "type": "json_schema",
      "json_schema": {
        "name": "email_schema",
        "schema": {
            "type": "object",
            "properties": {
                "email": {
                    "description": "The email address that appears in the input",
                    "type": "string"
                }
            },
            "additionalProperties": false
        }
      }
    }
  }'
```

## Choosing a model

When making a text generation request, the first option to configure is which [model](/docs/models) you want to generate the response. The model you choose can greatly influence the output, and impact how much each generation request [costs](https://openai.com/api/pricing/).

- A **large model** like [`gpt-4o`](/docs/models#gpt-4o) will offer a very high level of intelligence and strong performance, while having a higher cost per token.
- A **small model** like [`gpt-4o-mini`](/docs/models#gpt-4o-mini) offers intelligence not quite on the level of the larger model, but is faster and less expensive per token.
- A **reasoning model** like [the `o1` family of models](/docs/models#o1) is slower to return a result, and uses more tokens to "think", but is capable of advanced reasoning, coding, and multi-step planning.

Experiment with different models [in the Playground](/playground) to see which one works best for your prompts! More information on choosing a model can [also be found here](/docs/guides/model-selection).

## Building prompts

The process of crafting prompts to get the right output from a model is called **prompt engineering**. By giving the model precise instructions, examples, and necessary context information (like private or specialized information that wasn't included in the model's training data), you can improve the quality and accuracy of the model's output. Here, we'll get into some high-level guidance on building prompts, but you might also find the [prompt engineering guide](/docs/guides/prompt-engineering) helpful.

In the [chat completions](/docs/api-reference/chat/) API, you create prompts by providing an array of `messages` that contain instructions for the model. Each message can have a different `role`, which influences how the model might interpret the input.

### User messages

User messages contain instructions that request a particular type of output from the model. You can think of `user` messages as the messages you might type in to [ChatGPT](https://chaptgpt.com) as an end user.

Here's an example of a user message prompt that asks the `gpt-4o` model to generate a haiku poem based on a prompt.

```javascript
1
2
3
4
5
6
7
8
9
10
11
12
13
14
const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [\
    {\
      "role": "user",\
      "content": [\
        {\
          "type": "text",\
          "text": "Write a haiku about programming."\
        }\
      ]\
    }\
  ]
});
```

### System messages

Messages with the `system` role act as top-level instructions to the model, and typically describe what the model is supposed to do and how it should generally behave and respond.

Here's an example of a system message that modifies the behavior of the model when generating a response to a `user` message:

```javascript
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [\
    {\
      "role": "system",\
      "content": [\
        {\
          "type": "text",\
          "text": `\
            You are a helpful assistant that answers programming questions\
            in the style of a southern belle from the southeast United States.\
          `\
        }\
      ]\
    },\
    {\
      "role": "user",\
      "content": [\
        {\
          "type": "text",\
          "text": "Are semicolons optional in JavaScript?"\
        }\
      ]\
    }\
  ]
});
```

This prompt returns a text output in the rhetorical style requested:

```text
1
2
3
4
5
6
7
8
Well, sugar, that's a fine question you've got there! Now, in the world of
JavaScript, semicolons are indeed a bit like the pearls on a necklace – you
might slip by without 'em, but you sure do look more polished with 'em in place.

Technically, JavaScript has this little thing called "automatic semicolon
insertion" where it kindly adds semicolons for you where it thinks they
oughta go. However, it's not always perfect, bless its heart. Sometimes, it
might get a tad confused and cause all sorts of unexpected behavior.
```

### Assistant messages

Messages with the `assistant` role are presumed to have been generated by the model, perhaps in a previous generation request (see the "Conversations" section below). They can also be used to provide examples to the model for how it should respond to the current request - a technique known as **few-shot learning**.

Here's an example of using an assistant message to capture the results of a previous text generation result, and making a new request based on that.

```javascript
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [\
    {\
      "role": "user",\
      "content": [{ "type": "text", "text": "knock knock." }]\
    },\
    {\
      "role": "assistant",\
      "content": [{ "type": "text", "text": "Who's there?" }]\
    },\
    {\
      "role": "user",\
      "content": [{ "type": "text", "text": "Orange." }]\
    }\
  ]
});
```

### Giving the model additional data to use for generation

The message types above can also be used to provide additional information to the model which may be outside its training data. You might want to include the results of a database query, a text document, or other resources to help the model generate a relevant response. This technique is often referred to as **retrieval augmented generation**, or RAG. [Learn more about RAG techniques here](https://help.openai.com/en/articles/8868588-retrieval-augmented-generation-rag-and-semantic-search-for-gpts).

## Conversations and context

While each text generation request is independent and stateless (unless you are using [assistants](/docs/assistants/overview)), you can still implement **multi-turn conversations** by providing additional messages as parameters to your text generation request. Consider the "knock knock" joke example shown above:

```javascript
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [\
    {\
      "role": "user",\
      "content": [{ "type": "text", "text": "knock knock." }]\
    },\
    {\
      "role": "assistant",\
      "content": [{ "type": "text", "text": "Who's there?" }]\
    },\
    {\
      "role": "user",\
      "content": [{ "type": "text", "text": "Orange." }]\
    }\
  ]
});
```

By using alternating `user` and `assistant` messages, you can capture the previous state of a conversation in one request to the model.

### Managing context for text generation

As your inputs become more complex, or you include more and more turns in a conversation, you will need to consider both **output token** and **context window** limits. Model inputs and outputs are metered in [**tokens**](https://help.openai.com/en/articles/4936856-what-are-tokens-and-how-to-count-them), which are parsed from inputs to analyze their content and intent, and assembled to render logical outputs. Models have limits on how many tokens can be used during the lifecycle of a text generation request.

- **Output tokens** are the tokens that are generated by a model in response to a prompt. Each model supports different limits for output tokens, [documented here](/docs/models). For example, `gpt-4o-2024-08-06` can generate a maximum of 16,384 output tokens.
- A **context window** describes the total tokens that can be used for both input tokens and output tokens (and for some models, [reasoning tokens](/docs/guides/reasoning)), [documented here](/docs/models). For example, `gpt-4o-2024-08-06` has a total context window of 128k tokens.

If you create a very large prompt (usually by including a lot of conversation context or additional data/examples for the model), you run the risk of exceeding the allocated context window for a model, which might result in truncated outputs.

You can use the [tokenizer tool](/tokenizer) (which uses the [tiktoken library](https://github.com/openai/tiktoken)) to see how many tokens are present in a string of text.

## Optimizing model outputs

As you iterate on your prompts, you will be continually trying to improve **accuracy**, **cost**, and **latency**.

|  | Goal | Available techniques |
| --- | --- | --- |
| **Accuracy** | Ensure the model produces accurate and useful responses to your prompts. | Accurate responses require that the model has all the information it needs<br>to generate a response, and knows how to go about creating a response<br>(from interpreting input to formatting and styling). Often, this will<br>require a mix of [prompt engineering](/docs/guides/prompt-engineering),<br>[RAG](https://help.openai.com/en/articles/8868588-retrieval-augmented-generation-rag-and-semantic-search-for-gpts),<br>and [model fine-tuning](/docs/guides/fine-tuning).<br>[Learn about optimizing for accuracy here](/docs/guides/optimizing-llm-accuracy). |
| **Cost** | Drive down the total cost of model usage by reducing token usage and using cheaper models when possible. | To control costs, you can try to use fewer tokens or smaller, cheaper models.<br>[Learn more about optimizing for cost here](/docs/guides/model-selection). |
| **Latency** | Decrease the time it takes to generate responses to your prompts. | Optimizing latency is a multi-faceted process including prompt engineering,<br>parallelism in your own code, and more.<br>[Learn more here](/docs/guides/latency-optimization). |

## Next steps

There's much more to explore in text generation - here's a few resources to go even deeper.

[Prompt examples\\
\\
Get inspired by example prompts for a variety of use cases.](/docs/examples) [Build a prompt in the Playground\\
\\
Use the Playground to develop and iterate on prompts.](/playground) [Browse the Cookbook\\
\\
The Cookbook has complex examples covering a variety of use cases.](/docs/guides/https://cookbook.openai.com) [Generate JSON data with Structured Outputs\\
\\
Ensure JSON data emitted from a model conforms to a JSON schema.](/docs/guides/structured-outputs) [Full API reference\\
\\
Check out all the options for text generation in the API reference.](/docs/api-reference/chat)Log in [Sign up](/signup)

# Latency optimization

Copy page

Improve latency across a wide variety of LLM-related use cases.

This guide covers the core set of principles you can apply to improve latency across a wide variety of LLM-related use cases. These techniques come from working with a wide range of customers and developers on production applications, so they should apply regardless of what you're building – from a granular workflow to an end-to-end chatbot.

While there's many individual techniques, we'll be grouping them into **seven principles** meant to represent a high-level taxonomy of approaches for improving latency.

At the end, we'll walk through an [example](#example) to see how they can be applied.

### Seven principles

1. [Process tokens faster.](#process-tokens-faster)
2. [Generate fewer tokens.](#generate-fewer-tokens)
3. [Use fewer input tokens.](#use-fewer-input-tokens)
4. [Make fewer requests.](#make-fewer-requests)
5. [Parallelize.](#parallelize)
6. [Make your users wait less.](#make-your-users-wait-less)
7. [Don't default to an LLM.](#don-t-default-to-an-llm)

## Process tokens faster

**Inference speed** is probably the first thing that comes to mind when addressing latency (but as you'll see soon, it's far from the only one). This refers to the actual **rate at which the LLM processes tokens**, and is often measured in TPM (tokens per minute) or TPS (tokens per second).

The main factor that influences inference speed is **model size** – smaller models usually run faster (and cheaper), and when used correctly can even outperform larger models. To maintain high quality performance with smaller models you can explore:

- using a longer, [more detailed prompt](/docs/guides/prompt-engineering#tactic-specify-the-steps-required-to-complete-a-task),
- adding (more) [few-shot examples](/docs/guides/prompt-engineering#tactic-provide-examples), or
- [fine-tuning](/docs/guides/fine-tuning) / distillation.

You can also employ inference optimizations like our [**Predicted outputs**](/docs/guides/predicted-outputs) feature. Predicted outputs let you significantly reduce latency of a generation when you know most of the output ahead of time, such as code editing tasks. By giving the model a prediction, the LLM can focus more on the actual changes, and less on the content that will remain the same.

Deep dive

Compute capacity & additional inference optimizations

## Generate fewer tokens

Generating tokens is almost always the highest latency step when using an LLM: as a general heuristic, **cutting 50% of your output tokens may cut ~50% your latency**. The way you reduce your output size will depend on output type:

If you're generating **natural language**, simply **asking the model to be more concise** ("under 20 words" or "be very brief") may help. You can also use few shot examples and/or fine-tuning to teach the model shorter responses.

If you're generating **structured output**, try to **minimize your output syntax** where possible: shorten function names, omit named arguments, coalesce parameters, etc.

Finally, while not common, you can also use `max_tokens` or `stop_tokens` to end your generation early.

Always remember: an output token cut is a (milli)second earned!

## Use fewer input tokens

While reducing the number of input tokens does result in lower latency, this is not usually a significant factor – **cutting 50% of your prompt may only result in a 1-5% latency improvement**. Unless you're working with truly massive context sizes (documents, images), you may want to spend your efforts elsewhere.

That being said, if you _are_ working with massive contexts (or you're set on squeezing every last bit of performance _and_ you've exhausted all other options) you can use the following techniques to reduce your input tokens:

- **Fine-tuning the model**, to replace the need for lengthy instructions / examples.
- **Filtering context input**, like pruning RAG results, cleaning HTML, etc.
- **Maximize shared prompt prefix**, by putting dynamic portions (e.g. RAG results, history, etc) later in the prompt. This makes your request more [KV cache](https://medium.com/@joaolages/kv-caching-explained-276520203249)-friendly (which most LLM providers use) and means fewer input tokens are processed on each request.

Check out our docs to learn more about how [prompt caching](/docs/guides/prompt-engineering#prompt-caching) works.

## Make fewer requests

Each time you make a request you incur some round-trip latency – this can start to add up.

If you have sequential steps for the LLM to perform, instead of firing off one request per step consider **putting them in a single prompt and getting them all in a single response**. You'll avoid the additional round-trip latency, and potentially also reduce complexity of processing multiple responses.

An approach to doing this is by collecting your steps in an enumerated list in the combined prompt, and then requesting the model to return the results in named fields in a JSON. This way you can easily parse out and reference each result!

## Parallelize

Parallelization can be very powerful when performing multiple steps with an LLM.

If the steps **are _not_ strictly sequential**, you can **split them out into parallel calls**. Two shirts take just as long to dry as one.

If the steps **_are_ strictly sequential**, however, you might still be able to **leverage speculative execution**. This is particularly effective for classification steps where one outcome is more likely than the others (e.g. moderation).

1. Start step 1 & step 2 simultaneously (e.g. input moderation & story generation)
2. Verify the result of step 1
3. If result was not the expected, cancel step 2 (and retry if necessary)

If your guess for step 1 is right, then you essentially got to run it with zero added latency!

## Make your users wait less

There's a huge difference between **waiting** and **watching progress happen** – make sure your users experience the latter. Here are a few techniques:

- **Streaming**: The single most effective approach, as it cuts the _waiting_ time to a second or less. (ChatGPT would feel pretty different if you saw nothing until each response was done.)
- **Chunking**: If your output needs further processing before being shown to the user (moderation, translation) consider **processing it in chunks** instead of all at once. Do this by streaming to your backend, then sending processed chunks to your frontend.
- **Show your steps**: If you're taking multiple steps or using tools, surface this to the user. The more real progress you can show, the better.
- **Loading states**: Spinners and progress bars go a long way.

Note that while **showing your steps & having loading states** have a mostly
psychological effect, **streaming & chunking** genuinely do reduce overall
latency once you consider the app + user system: the user will finish reading a response
sooner.

## Don't default to an LLM

LLMs are extremely powerful and versatile, and are therefore sometimes used in cases where a **faster classical method** would be more appropriate. Identifying such cases may allow you to cut your latency significantly. Consider the following examples:

- **Hard-coding:** If your **output** is highly constrained, you may not need an LLM to generate it. Action confirmations, refusal messages, and requests for standard input are all great candidates to be hard-coded. (You can even use the age-old method of coming up with a few variations for each.)
- **Pre-computing:** If your **input** is constrained (e.g. category selection) you can generate multiple responses in advance, and just make sure you never show the same one to a user twice.
- **Leveraging UI:** Summarized metrics, reports, or search results are sometimes better conveyed with classical, bespoke UI components rather than LLM-generated text.
- **Traditional optimization techniques:** An LLM application is still an application; binary search, caching, hash maps, and runtime complexity are all _still_ useful in a world of LLMs.

## Example

Let's now look at a sample application, identify potential latency optimizations, and propose some solutions!

We'll be analyzing the architecture and prompts of a hypothetical customer service bot inspired by real production applications. The [architecture and prompts](#architecture-and-prompts) section sets the stage, and the [analysis and optimizations](#analysis-and-optimizations) section will walk through the latency optimization process.

You'll notice this example doesn't cover every single principle, much like real-world use cases don't require applying every technique.

### Architecture and prompts

The following is the **initial architecture** for a hypothetical **customer service bot**. This is what we'll be making changes to.

![Assistants object architecture diagram](https://cdn.openai.com/API/docs/images/diagram-latency-customer-service-0.png)

At a high level, the diagram flow describes the following process:

1. A user sends a message as part of an ongoing conversation.
2. The last message is turned into a **self-contained query** (see examples in prompt).
3. We determine whether or not **additional (retrieved) information is required** to respond to that query.
4. **Retrieval** is performed, producing search results.
5. The assistant **reasons** about the user's query and search results, and **produces a response**.
6. The response is sent back to the user.

Below are the prompts used in each part of the diagram. While they are still only hypothetical and simplified, they are written with the same structure and wording that you would find in a production application.

Places where you see placeholders like " **\[user input here\]**" represent dynamic portions, that would be replaced by actual data at runtime.

Query contextualization prompt

Re-writes user query to be a self-contained search query.

SYSTEM

Given the previous conversation, re-write the last user query so it contains
all necessary context.

\# Example
History: \[{user: "What is your return policy?"},{assistant: "..."}\]
User Query: "How long does it cover?"
Response: "How long does the return policy cover?"

\# Conversation
\[last 3 messages of conversation\]

\# User Query
\[last user query\]

USER

\[JSON-formatted input conversation here\]

Retrieval check prompt

Determines whether a query requires performing retrieval to respond.

SYSTEM

Given a user query, determine whether it requires doing a realtime lookup to
respond to.

\# Examples
User Query: "How can I return this item after 30 days?"
Response: "true"

User Query: "Thank you!"
Response: "false"

USER

\[input user query here\]

Assistant prompt

Fills the fields of a JSON to reason through a pre-defined set of steps to produce a final response given a user conversation and relevant retrieved information.

SYSTEM

You are a helpful customer service bot.

Use the result JSON to reason about each user query - use the retrieved context.

\# Example

User: "My computer screen is cracked! I want it fixed now!!!"

Assistant Response:
{
"message\_is\_conversation\_continuation": "True",
"number\_of\_messages\_in\_conversation\_so\_far": "1",
"user\_sentiment": "Aggravated",
"query\_type": "Hardware Issue",
"response\_tone": "Validating and solution-oriented",
"response\_requirements": "Propose options for repair or replacement.",
"user\_requesting\_to\_talk\_to\_human": "False",
"enough\_information\_in\_context": "True"
"response": "..."
}

USER

\# Relevant Information
\` \` \`
\[retrieved context\]
\` \` \`

USER

\[input user query here\]

### Analysis and optimizations

#### Part 1: Looking at retrieval prompts

Looking at the architecture, the first thing that stands out is the **consecutive GPT-4 calls** \- these hint at a potential inefficiency, and can often be replaced by a single call or parallel calls.

![Assistants object architecture diagram](https://cdn.openai.com/API/docs/images/diagram-latency-customer-service-2.png)

In this case, since the check for retrieval requires the contextualized query, let's **combine them into a single prompt** to [make fewer requests](#make-fewer-requests).

![Assistants object architecture diagram](https://cdn.openai.com/API/docs/images/diagram-latency-customer-service-3.png)

Combined query contextualization and retrieval check prompt

**What changed?** Before, we had one prompt to re-write the query and one to determine whether this requires doing a retrieval lookup. Now, this combined prompt does both. Specifically, notice the updated instruction in the first line of the prompt, and the updated output JSON:

```jsx
1
2
3
4
{
query:"[contextualized query]",
retrieval:"[true/false - whether retrieval is required]"
}
```

SYSTEM

Given the previous conversation, re-write the last user query so it contains
all necessary context. Then, determine whether the full request requires doing a
realtime lookup to respond to.

Respond in the following form:
{
query:"\[contextualized query\]",
retrieval:"\[true/false - whether retrieval is required\]"
}

\# Examples

History: \[{user: "What is your return policy?"},{assistant: "..."}\]
User Query: "How long does it cover?"
Response: {query: "How long does the return policy cover?", retrieval: "true"}

History: \[{user: "How can I return this item after 30 days?"},{assistant: "..."}\]
User Query: "Thank you!"
Response: {query: "Thank you!", retrieval: "false"}

\# Conversation
\[last 3 messages of conversation\]

\# User Query
\[last user query\]

USER

\[JSON-formatted input conversation here\]

Actually, adding context and determining whether to retrieve are very straightforward and well defined tasks, so we can likely use a **smaller, fine-tuned model** instead. Switching to GPT-3.5 will let us [process tokens faster](#process-tokens-faster).

![Assistants object architecture diagram](https://cdn.openai.com/API/docs/images/diagram-latency-customer-service-4.png)

#### Part 2: Analyzing the assistant prompt

Let's now direct our attention to the Assistant prompt. There seem to be many distinct steps happening as it fills the JSON fields – this could indicate an opportunity to [parallelize](#parallelize).

![Assistants object architecture diagram](https://cdn.openai.com/API/docs/images/diagram-latency-customer-service-5.png)

However, let's pretend we have run some tests and discovered that splitting the reasoning steps in the JSON produces worse responses, so we need to explore different solutions.

**Could we use a fine-tuned GPT-3.5 instead of GPT-4?** Maybe – but in general, open-ended responses from assistants are best left to GPT-4 so it can better handle a greater range of cases. That being said, looking at the reasoning steps themselves, they may not all require GPT-4 level reasoning to produce. The well defined, limited scope nature makes them and **good potential candidates for fine-tuning**.

```jsx
1
2
3
4
5
6
7
8
9
10
11
{
"message_is_conversation_continuation": "True", // <-
"number_of_messages_in_conversation_so_far": "1", // <-
"user_sentiment": "Aggravated", // <-
"query_type": "Hardware Issue", // <-
"response_tone": "Validating and solution-oriented", // <-
"response_requirements": "Propose options for repair or replacement.", // <-
"user_requesting_to_talk_to_human": "False", // <-
"enough_information_in_context": "True" // <-
"response": "..." // X -- benefits from GPT-4
}
```

This opens up the possibility of a trade-off. Do we keep this as a **single request entirely generated by GPT-4**, or **split it into two sequential requests** and use GPT-3.5 for all but the final response? We have a case of conflicting principles: the first option lets us [make fewer requests](#make-fewer-requests), but the second may let us [process tokens faster](#1-process-tokens-faster).

As with many optimization tradeoffs, the answer will depend on the details. For example:

- The proportion of tokens in the `response` vs the other fields.
- The average latency decrease from processing most fields faster.
- The average latency _increase_ from doing two requests instead of one.

The conclusion will vary by case, and the best way to make the determiation is by testing this with production examples. In this case let's pretend the tests indicated it's favorable to split the prompt in two to [process tokens faster](#process-tokens-faster).

![Assistants object architecture diagram](https://cdn.openai.com/API/docs/images/diagram-latency-customer-service-6.png)

**Note:** We'll be grouping `response` and `enough_information_in_context` together in the second prompt to avoid passing the retrieved context to both new prompts.

Assistants prompt - reasoning

This prompt will be passed to GPT-3.5 and can be fine-tuned on curated examples.

**What changed?** The "enough\_information\_in\_context" and "response" fields were removed, and the retrieval results are no longer loaded into this prompt.

SYSTEM

You are a helpful customer service bot.

Based on the previous conversation, respond in a JSON to determine the required
fields.

\# Example

User: "My freaking computer screen is cracked!"

Assistant Response:
{
"message\_is\_conversation\_continuation": "True",
"number\_of\_messages\_in\_conversation\_so\_far": "1",
"user\_sentiment": "Aggravated",
"query\_type": "Hardware Issue",
"response\_tone": "Validating and solution-oriented",
"response\_requirements": "Propose options for repair or replacement.",
"user\_requesting\_to\_talk\_to\_human": "False",
}

Assistants prompt - response

This prompt will be processed by GPT-4 and will receive the reasoning steps determined in the prior prompt, as well as the results from retrieval.

**What changed?** All steps were removed except for "enough\_information\_in\_context" and "response". Additionally, the JSON we were previously filling in as output will be passed in to this prompt.

SYSTEM

You are a helpful customer service bot.

Use the retrieved context, as well as these pre-classified fields, to respond to
the user's query.

\# Reasoning Fields
\` \` \`
\[reasoning json determined in previous GPT-3.5 call\]
\` \` \`

\# Example

User: "My freaking computer screen is cracked!"

Assistant Response:
{
"enough\_information\_in\_context": "True"
"response": "..."
}

USER

\# Relevant Information
\` \` \`
\[retrieved context\]
\` \` \`

In fact, now that the reasoning prompt does not depend on the retrieved context we can [parallelize](#parallelize) and fire it off at the same time as the retrieval prompts.

![Assistants object architecture diagram](https://cdn.openai.com/API/docs/images/diagram-latency-customer-service-6b.png)

#### Part 3: Optimizing the structured output

Let's take another look at the reasoning prompt.

![Assistants object architecture diagram](https://cdn.openai.com/API/docs/images/diagram-latency-customer-service-7b.png)

Taking a closer look at the reasoning JSON you may notice the field names themselves are quite long.

```jsx
1
2
3
4
5
6
7
8
9
{
"message_is_conversation_continuation": "True", // <-
"number_of_messages_in_conversation_so_far": "1", // <-
"user_sentiment": "Aggravated", // <-
"query_type": "Hardware Issue", // <-
"response_tone": "Validating and solution-oriented", // <-
"response_requirements": "Propose options for repair or replacement.", // <-
"user_requesting_to_talk_to_human": "False", // <-
}
```

By making them shorter and moving explanations to the comments we can [generate fewer tokens](#generate-fewer-tokens).

```jsx
1
2
3
4
5
6
7
8
9
{
"cont": "True", // whether last message is a continuation
"n_msg": "1", // number of messages in the continued conversation
"tone_in": "Aggravated", // sentiment of user query
"type": "Hardware Issue", // type of the user query
"tone_out": "Validating and solution-oriented", // desired tone for response
"reqs": "Propose options for repair or replacement.", // response requirements
"human": "False", // whether user is expressing want to talk to human
}
```

![Assistants object architecture diagram](https://cdn.openai.com/API/docs/images/diagram-latency-customer-service-8b.png)

This small change removed 19 output tokens. While with GPT-3.5 this may only result in a few millisecond improvement, with GPT-4 this could shave off up to a second.

![Assistants object architecture diagram](https://cdn.openai.com/API/docs/images/token-counts-latency-customer-service-large.png)

You might imagine, however, how this can have quite a significant impact for larger model outputs.

We could go further and use single chatacters for the JSON fields, or put everything in an array, but this may start to hurt our response quality. The best way to know, once again, is through testing.

#### Example wrap-up

Let's review the optimizations we implemented for the customer service bot example:

![Assistants object architecture diagram](https://cdn.openai.com/API/docs/images/diagram-latency-customer-service-11b.png)

1. **Combined** query contextualization and retrieval check steps to [make fewer requests](#make-fewer-requests).
2. For the new prompt, **switched to a smaller, fine-tuned GPT-3.5** to [process tokens faster](process-tokens-faster).
3. Split the assistant prompt in two, **switching to a smaller, fine-tuned GPT-3.5** for the reasoning, again to [process tokens faster](#process-tokens-faster).
4. [Parallelized](#parallelize) the retrieval checks and the reasoning steps.
5. **Shortened reasoning field names** and moved comments into the prompt, to [generate fewer tokens](#generate-fewer-tokens).Log in [Sign up](/signup)

Page not found

We couldn't find the page you were looking for.

Was this expected?Log in [Sign up](/signup)

# Structured Outputs

Copy page

Ensure responses follow JSON Schema for Structured Outputs.

## Try it out

Try it out in the [Playground](/playground) or generate a ready-to-use schema definition to experiment with structured outputs.

Generate

## Introduction

JSON is one of the most widely used formats in the world for applications to exchange data.

Structured Outputs is a feature that ensures the model will always generate responses that adhere to your supplied [JSON Schema](https://json-schema.org/overview/what-is-jsonschema), so you don't need to worry about the model omitting a required key, or hallucinating an invalid enum value.

Some benefits of Structed Outputs include:

1. **Reliable type-safety:** No need to validate or retry incorrectly formatted responses
2. **Explicit refusals:** Safety-based model refusals are now programmatically detectable
3. **Simpler prompting:** No need for strongly worded prompts to achieve consistent formatting

In addition to supporting JSON Schema in the REST API, the OpenAI SDKs for [Python](https://github.com/openai/openai-python/blob/main/helpers.md#structured-outputs-parsing-helpers) and [JavaScript](https://github.com/openai/openai-node/blob/master/helpers.md#structured-outputs-parsing-helpers) also make it easy to define object schemas using [Pydantic](https://docs.pydantic.dev/latest/) and [Zod](https://zod.dev/) respectively. Below, you can see how to extract information from unstructured text that conforms to a schema defined in code.

Getting a structured response

python

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
from pydantic import BaseModel
from openai import OpenAI

client = OpenAI()

class CalendarEvent(BaseModel):
    name: str
    date: str
    participants: list[str]

completion = client.beta.chat.completions.parse(
    model="gpt-4o-2024-08-06",
    messages=[\
        {"role": "system", "content": "Extract the event information."},\
        {"role": "user", "content": "Alice and Bob are going to a science fair on Friday."},\
    ],
    response_format=CalendarEvent,
)

event = completion.choices[0].message.parsed
```

```javascript
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const openai = new OpenAI();

const CalendarEvent = z.object({
  name: z.string(),
  date: z.string(),
  participants: z.array(z.string()),
});

const completion = await openai.beta.chat.completions.parse({
  model: "gpt-4o-2024-08-06",
  messages: [\
    { role: "system", content: "Extract the event information." },\
    { role: "user", content: "Alice and Bob are going to a science fair on Friday." },\
  ],
  response_format: zodResponseFormat(CalendarEvent, "event"),
});

const event = completion.choices[0].message.parsed;
```

### Supported models

Structured Outputs are available in our [latest large language models](/docs/models), starting with GPT-4o:

- `gpt-4o-mini-2024-07-18` and later
- `gpt-4o-2024-08-06` and later

Older models like `gpt-4-turbo` and earlier may use [JSON mode](#json-mode) instead.

## When to use Structured Outputs via function calling vs via response\_format

Structured Outputs is available in two forms in the OpenAI API:

1. When using [function calling](/docs/guides/function-calling)
2. When using a `json_schema` response format

Function calling is useful when you are building an application that bridges the models and functionality of your application.

For example, you can give the model access to functions that query a database in order to build an AI assistant that can help users with their orders, or functions that can interact with the UI.

Conversely, Structured Outputs via `response_format` are more suitable when you want to indicate a structured schema for use when the model responds to the user, rather than when the model calls a tool.

For example, if you are building a math tutoring application, you might want the assistant to respond to your user using a specific JSON Schema so that you can generate a UI that displays different parts of the model's output in distinct ways.

Put simply:

- If you are connecting the model to tools, functions, data, etc. in your system, then you should use function calling
- If you want to structure the model's output when it responds to the user, then you should use a structured `response_format`

The remainder of this guide will focus on non-function calling use cases in the Chat Completions API. To learn more about how to use Structured Outputs with function calling, check out the [Function Calling](/docs/guides/function-calling#function-calling-with-structured-outputs) guide.

### Structured Outputs vs JSON mode

Structured Outputs is the evolution of [JSON mode](#json-mode). While both ensure valid JSON is produced, only Structured Outputs ensure schema adherance. Both Structured Outputs and JSON mode are supported in the Chat Completions API, Assistants API, Fine-tuning API and Batch API.

We recommend always using Structured Outputs instead of JSON mode when possible.

However, Structured Outputs with `response_format: {type: "json_schema", ...}` is only supported with the `gpt-4o-mini`, `gpt-4o-mini-2024-07-18`, and `gpt-4o-2024-08-06` model snapshots and later.

|  | Structured Outputs | JSON Mode |
| --- | --- | --- |
| **Outputs valid JSON** | Yes | Yes |
| **Adheres to schema** | Yes (see [supported schemas](#supported-schemas)) | No |
| **Compatible models** | `gpt-4o-mini`, `gpt-4o-2024-08-06`, and later | `gpt-3.5-turbo`, `gpt-4-*` and `gpt-4o-*` models |
| **Enabling** | `response_format: { type: "json_schema", json_schema: {"strict": true, "schema": ...} }` | `response_format: { type: "json_object" }` |

## Examples

Chain of thoughtStructured data extractionUI generationModeration

### Chain of thought

You can ask the model to output an answer in a structured, step-by-step way, to guide the user through the solution.

Structured Outputs for chain-of-thought math tutoring

python

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
from pydantic import BaseModel
from openai import OpenAI

client = OpenAI()

class Step(BaseModel):
    explanation: str
    output: str

class MathReasoning(BaseModel):
    steps: list[Step]
    final_answer: str

completion = client.beta.chat.completions.parse(
    model="gpt-4o-2024-08-06",
    messages=[\
        {"role": "system", "content": "You are a helpful math tutor. Guide the user through the solution step by step."},\
        {"role": "user", "content": "how can I solve 8x + 7 = -23"}\
    ],
    response_format=MathReasoning,
)

math_reasoning = completion.choices[0].message.parsed
```

```javascript
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

const openai = new OpenAI();

const Step = z.object({
  explanation: z.string(),
  output: z.string(),
});

const MathReasoning = z.object({
  steps: z.array(Step),
  final_answer: z.string(),
});

const completion = await openai.beta.chat.completions.parse({
  model: "gpt-4o-2024-08-06",
  messages: [\
    { role: "system", content: "You are a helpful math tutor. Guide the user through the solution step by step." },\
    { role: "user", content: "how can I solve 8x + 7 = -23" },\
  ],
  response_format: zodResponseFormat(MathReasoning, "math_reasoning"),
});

const math_reasoning = completion.choices[0].message.parsed;
```

```bash
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
curl https://api.openai.com/v1/chat/completions \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-4o-2024-08-06",
    "messages": [\
      {\
        "role": "system",\
        "content": "You are a helpful math tutor. Guide the user through the solution step by step."\
      },\
      {\
        "role": "user",\
        "content": "how can I solve 8x + 7 = -23"\
      }\
    ],
    "response_format": {
      "type": "json_schema",
      "json_schema": {
        "name": "math_reasoning",
        "schema": {
          "type": "object",
          "properties": {
            "steps": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "explanation": { "type": "string" },
                  "output": { "type": "string" }
                },
                "required": ["explanation", "output"],
                "additionalProperties": false
              }
            },
            "final_answer": { "type": "string" }
          },
          "required": ["steps", "final_answer"],
          "additionalProperties": false
        },
        "strict": true
      }
    }
  }'
```

#### Example response

```json
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
{
  "steps": [\
    {\
      "explanation": "Start with the equation 8x + 7 = -23.",\
      "output": "8x + 7 = -23"\
    },\
    {\
      "explanation": "Subtract 7 from both sides to isolate the term with the variable.",\
      "output": "8x = -23 - 7"\
    },\
    {\
      "explanation": "Simplify the right side of the equation.",\
      "output": "8x = -30"\
    },\
    {\
      "explanation": "Divide both sides by 8 to solve for x.",\
      "output": "x = -30 / 8"\
    },\
    {\
      "explanation": "Simplify the fraction.",\
      "output": "x = -15 / 4"\
    }\
  ],
  "final_answer": "x = -15 / 4"
}
```

## How to use Structured Outputs with response\_format

You can use Structured Outputs with the new SDK helper to parse the model's output into your desired format, or you can specify the JSON schema directly.

**Note:** the first request you make with any schema will have additional latency as our API processes the schema, but subsequent requests with the same schema will not have additional latency.

SDK objectsManual schema

Step 1: Define your object

First you must define an object or data structure to represent the JSON Schema that the model should be constrained to follow. See the [examples](/docs/guides/structured-outputs#examples) at the top of this guide for reference.

While Structured Outputs supports much of JSON Schema, some features are unavailable either for performance or technical reasons. See [here](/docs/guides/structured-outputs#supported-schemas) for more details.

For example, you can define an object like this:

python

```python
1
2
3
4
5
6
7
8
9
from pydantic import BaseModel

class Step(BaseModel):
    explanation: str
    output: str

class MathResponse(BaseModel):
    steps: list[Step]
    final_answer: str
```

```javascript
1
2
3
4
5
6
7
8
9
10
11
12
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

const Step = z.object({
  explanation: z.string(),
  output: z.string(),
});

const MathResponse = z.object({
  steps: z.array(Step),
  final_answer: z.string(),
});
```

#### Tips for your data structure

To maximize the quality of model generations, we recommend the following:

- Name keys clearly and intuitively
- Create clear titles and descriptions for important keys in your structure
- Create and use evals to determine the structure that works best for your use case

Step 2: Supply your object in the API call

You can use the `parse` method to automatically parse the JSON response into the object you defined.

Under the hood, the SDK takes care of supplying the JSON schema corresponding to your data structure, and then parsing the response as an object.

python

```python
1
2
3
4
5
6
7
8
completion = client.beta.chat.completions.parse(
    model="gpt-4o-2024-08-06",
    messages=[\
        {"role": "system", "content": "You are a helpful math tutor. Guide the user through the solution step by step."},\
        {"role": "user", "content": "how can I solve 8x + 7 = -23"}\
    ],
    response_format=MathResponse
  )
```

```javascript
1
2
3
4
5
6
7
8
const completion = await openai.beta.chat.completions.parse({
  model: "gpt-4o-2024-08-06",
  messages: [\
    { role: "system", content: "You are a helpful math tutor. Guide the user through the solution step by step." },\
    { role: "user", content: "how can I solve 8x + 7 = -23" },\
  ],
  response_format: zodResponseFormat(MathResponse, "math_response"),
});
```

Step 3: Handle edge cases

In some cases, the model might not generate a valid response that matches the provided JSON schema.

This can happen in the case of a refusal, if the model refuses to answer for safety reasons, or if for example you reach a max tokens limit and the response is incomplete.

python

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
try:
    completion = client.beta.chat.completions.parse(
        model="gpt-4o-2024-08-06",
        messages=[\
            {"role": "system", "content": "You are a helpful math tutor. Guide the user through the solution step by step."},\
            {"role": "user", "content": "how can I solve 8x + 7 = -23"}\
        ],
        response_format=MathResponse,
        max_tokens=50
    )
    math_response = completion.choices[0].message
    if math_response.parsed:
        print(math_response.parsed)
    elif math_response.refusal:
        # handle refusal
        print(math_response.refusal)
except Exception as e:
    # Handle edge cases
    if type(e) == openai.LengthFinishReasonError:
        # Retry with a higher max tokens
        print("Too many tokens: ", e)
        pass
    else:
        # Handle other exceptions
        print(e)
        pass
```

```javascript
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
try {
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-2024-08-06",
    messages: [\
      {\
        role: "system",\
        content:\
          "You are a helpful math tutor. Guide the user through the solution step by step.",\
      },\
      { role: "user", content: "how can I solve 8x + 7 = -23" },\
    ],
    response_format: zodResponseFormat(MathResponse, "math_response"),
    max_tokens: 50,
  });

  const math_response = completion.choices[0].message;
  console.log(math_response);
  if (math_response.parsed) {
    console.log(math_response.parsed);
  } else if (math_response.refusal) {
    // handle refusal
    console.log(math_response.refusal);
  }
} catch (e) {
  // Handle edge cases
  if (e.constructor.name == "LengthFinishReasonError") {
    // Retry with a higher max tokens
    console.log("Too many tokens: ", e.message);
  } else {
    // Handle other exceptions
    console.log("An error occurred: ", e.message);
  }
}
```

Step 4: Use the generated structured data in a type-safe way

When using the SDK, you can use the `parsed` attribute to access the parsed JSON response as an object. This object will be of the type you defined in the `response_format` parameter.

python

```python
1
2
3
math_response = completion.choices[0].message.parsed
print(math_response.steps)
print(math_response.final_answer)
```

```javascript
1
2
3
const math_response = completion.choices[0].message.parsed;
console.log(math_response.steps);
console.log(math_response.final_answer);
```

### Refusals with Structured Outputs

When using Structured Outputs with user-generated input, OpenAI models may occasionally refuse to fulfill the request for safety reasons. Since a refusal does not necessarily follow the schema you have supplied in `response_format`, the API response will include a new field called `refusal` to indicate that the model refused to fulfill the request.

When the `refusal` property appears in your output object, you might present the refusal in your UI, or include conditional logic in code that consumes the response to handle the case of a refused request.

python

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
class Step(BaseModel):
    explanation: str
    output: str

class MathReasoning(BaseModel):
    steps: list[Step]
    final_answer: str

completion = client.beta.chat.completions.parse(
    model="gpt-4o-2024-08-06",
    messages=[\
        {"role": "system", "content": "You are a helpful math tutor. Guide the user through the solution step by step."},\
        {"role": "user", "content": "how can I solve 8x + 7 = -23"}\
    ],
    response_format=MathReasoning,
)

math_reasoning = completion.choices[0].message

# If the model refuses to respond, you will get a refusal message
if (math_reasoning.refusal):
    print(math_reasoning.refusal)
else:
    print(math_reasoning.parsed)
```

```javascript
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
const Step = z.object({
  explanation: z.string(),
  output: z.string(),
});

const MathReasoning = z.object({
  steps: z.array(Step),
  final_answer: z.string(),
});

const completion = await openai.beta.chat.completions.parse({
  model: "gpt-4o-2024-08-06",
  messages: [\
    { role: "system", content: "You are a helpful math tutor. Guide the user through the solution step by step." },\
    { role: "user", content: "how can I solve 8x + 7 = -23" },\
  ],
  response_format: zodResponseFormat(MathReasoning, "math_reasoning"),
});

const math_reasoning = completion.choices[0].message

// If the model refuses to respond, you will get a refusal message
if (math_reasoning.refusal) {
  console.log(math_reasoning.refusal);
} else {
  console.log(math_reasoning.parsed);
}
```

The API response from a refusal will look something like this:

json

```json
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
{
  "id": "chatcmpl-9nYAG9LPNonX8DAyrkwYfemr3C8HC",
  "object": "chat.completion",
  "created": 1721596428,
  "model": "gpt-4o-2024-08-06",
  "choices": [\
    {\
	  "index": 0,\
	  "message": {\
            "role": "assistant",\
            "refusal": "I'm sorry, I cannot assist with that request."\
	  },\
	  "logprobs": null,\
	  "finish_reason": "stop"\
	}\
  ],
  "usage": {
      "prompt_tokens": 81,
      "completion_tokens": 11,
      "total_tokens": 92,
      "completion_tokens_details": {
        "reasoning_tokens": 0,
        "accepted_prediction_tokens": 0,
        "rejected_prediction_tokens": 0
      }
  },
  "system_fingerprint": "fp_3407719c7f"
}
```

### Tips and best practices

#### Handling user-generated input

If your application is using user-generated input, make sure your prompt includes instructions on how to handle situations where the input cannot result in a valid response.

The model will always try to adhere to the provided schema, which can result in hallucinations if the input is completely unrelated to the schema.

You could include language in your prompt to specify that you want to return empty parameters, or a specific sentence, if the model detects that the input is incompatible with the task.

#### Handling mistakes

Structured Outputs can still contain mistakes. If you see mistakes, try adjusting your instructions, providing examples in the system instructions, or splitting tasks into simpler subtasks. Refer to the [prompt engineering guide](/docs/guides/prompt-engineering) for more guidance on how to tweak your inputs.

#### Avoid JSON schema divergence

To prevent your JSON Schema and corresponding types in your programming language from diverging, we strongly recommend using the native Pydantic/zod sdk support.

If you prefer to specify the JSON schema directly, you could add CI rules that flag when either the JSON schema or underlying data objects are edited, or add a CI step that auto-generates the JSON Schema from type definitions (or vice-versa).

## Supported schemas

Structured Outputs supports a subset of the [JSON Schema](https://json-schema.org/docs) language.

#### Supported types

The following types are supported for Structured Outputs:

- String
- Number
- Boolean
- Integer
- Object
- Array
- Enum
- anyOf

#### Root objects must not be `anyOf`

Note that the root level object of a schema must be an object, and not use `anyOf`. A pattern that appears in Zod (as one example) is using a discriminated union, which produces an `anyOf` at the top level. So code such as the following won't work:

javascript

```javascript
1
2
3
4
5
6
7
8
9
10
11
12
13
import { z } from 'zod';
import { zodResponseFormat } from 'openai/helpers/zod';

const BaseResponseSchema = z.object({ /* ... */ });
const UnsuccessfulResponseSchema = z.object({ /* ... */ });

const finalSchema = z.discriminatedUnion('status', [\
    BaseResponseSchema,\
    UnsuccessfulResponseSchema,\
]);

// Invalid JSON Schema for Structured Outputs
const json = zodResponseFormat(finalSchema, 'final_schema');
```

#### All fields must be `required`

To use Structured Outputs, all fields or function parameters must be specified as `required`.

json

```json
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
{
    "name": "get_weather",
    "description": "Fetches the weather in the given location",
    "strict": true,
    "parameters": {
        "type": "object",
        "properties": {
            "location": {
                "type": "string",
                "description": "The location to get the weather for"
            },
            "unit": {
                "type": "string",
                "description": "The unit to return the temperature in",
                "enum": ["F", "C"]
            }
        },
        "additionalProperties": false,
        "required": ["location", "unit"]
    }
}
```

Although all fields must be required (and the model will return a value for each parameter), it is possible to emulate an optional parameter by using a union type with `null`.

json

```json
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
{
    "name": "get_weather",
    "description": "Fetches the weather in the given location",
    "strict": true,
    "parameters": {
        "type": "object",
        "properties": {
            "location": {
                "type": "string",
                "description": "The location to get the weather for"
            },
            "unit": {
                "type": ["string", "null"],
                "description": "The unit to return the temperature in",
                "enum": ["F", "C"]
            }
        },
        "additionalProperties": false,
        "required": [\
            "location", "unit"\
        ]
    }
}
```

#### Objects have limitations on nesting depth and size

A schema may have up to 100 object properties total, with up to 5 levels of nesting.

#### Limitations on total string size

In a schema, total string length of all property names, definition names, enum values, and const values cannot exceed 15,000 characters.

#### Limitations on enum size

A schema may have up to 500 enum values across all enum properties.

For a single enum property with string values, the total string length of all enum values cannot exceed 7,500 characters when there are more than 250 enum values.

#### `additionalProperties: false` must always be set in objects

`additionalProperties` controls whether it is allowable for an object to contain additional keys / values that were not defined in the JSON Schema.

Structured Outputs only supports generating specified keys / values, so we require developers to set `additionalProperties: false` to opt into Structured Outputs.

json

```json
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
{
    "name": "get_weather",
    "description": "Fetches the weather in the given location",
    "strict": true,
    "schema": {
        "type": "object",
        "properties": {
            "location": {
                "type": "string",
                "description": "The location to get the weather for"
            },
            "unit": {
                "type": "string",
                "description": "The unit to return the temperature in",
                "enum": ["F", "C"]
            }
        },
        "additionalProperties": false,
        "required": [\
            "location", "unit"\
        ]
    }
}
```

#### Key ordering

When using Structured Outputs, outputs will be produced in the same order as the ordering of keys in the schema.

#### Some type-specific keywords are not yet supported

Notable keywords not supported include:

- **For strings:** `minLength`, `maxLength`, `pattern`, `format`
- **For numbers:** `minimum`, `maximum`, `multipleOf`
- **For objects:** `patternProperties`, `unevaluatedProperties`, `propertyNames`, `minProperties`, `maxProperties`
- **For arrays:** `unevaluatedItems`, `contains`, `minContains`, `maxContains`, `minItems`, `maxItems`, `uniqueItems`

If you turn on Structured Outputs by supplying `strict: true` and call the API with an unsupported JSON Schema, you will receive an error.

#### For `anyOf`, the nested schemas must each be a valid JSON Schema per this subset

Here's an example supported anyOf schema:

json

```json
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
{
	"type": "object",
	"properties": {
		"item": {
			"anyOf": [\
				{\
					"type": "object",\
					"description": "The user object to insert into the database",\
					"properties": {\
						"name": {\
							"type": "string",\
							"description": "The name of the user"\
						},\
						"age": {\
							"type": "number",\
							"description": "The age of the user"\
						}\
					},\
					"additionalProperties": false,\
					"required": [\
						"name",\
						"age"\
					]\
				},\
				{\
					"type": "object",\
					"description": "The address object to insert into the database",\
					"properties": {\
						"number": {\
							"type": "string",\
							"description": "The number of the address. Eg. for 123 main st, this would be 123"\
						},\
						"street": {\
							"type": "string",\
							"description": "The street name. Eg. for 123 main st, this would be main st"\
						},\
						"city": {\
							"type": "string",\
							"description": "The city of the address"\
						}\
					},\
					"additionalProperties": false,\
					"required": [\
						"number",\
						"street",\
						"city"\
					]\
				}\
			]
		}
	},
	"additionalProperties": false,
	"required": [\
		"item"\
	]
}
```

#### Definitions are supported

You can use definitions to define subschemas which are referenced throughout your schema. The following is a simple example.

json

```json
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
{
	"type": "object",
	"properties": {
		"steps": {
			"type": "array",
			"items": {
				"$ref": "#/$defs/step"
			}
		},
		"final_answer": {
			"type": "string"
		}
	},
	"$defs": {
		"step": {
			"type": "object",
			"properties": {
				"explanation": {
					"type": "string"
				},
				"output": {
					"type": "string"
				}
			},
			"required": [\
				"explanation",\
				"output"\
			],
			"additionalProperties": false
		}
	},
	"required": [\
		"steps",\
		"final_answer"\
	],
	"additionalProperties": false
}
```

#### Recursive schemas are supported

Sample recursive schema using `#` to indicate root recursion.

json

```json
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
{
        "name": "ui",
        "description": "Dynamically generated UI",
        "strict": true,
        "schema": {
            "type": "object",
            "properties": {
                "type": {
                    "type": "string",
                    "description": "The type of the UI component",
                    "enum": ["div", "button", "header", "section", "field", "form"]
                },
                "label": {
                    "type": "string",
                    "description": "The label of the UI component, used for buttons or form fields"
                },
                "children": {
                    "type": "array",
                    "description": "Nested UI components",
                    "items": {
                        "$ref": "#"
                    }
                },
                "attributes": {
                    "type": "array",
                    "description": "Arbitrary attributes for the UI component, suitable for any element",
                    "items": {
                        "type": "object",
                        "properties": {
                            "name": {
                                "type": "string",
                                "description": "The name of the attribute, for example onClick or className"
                            },
                            "value": {
                                "type": "string",
                                "description": "The value of the attribute"
                            }
                        },
                      "additionalProperties": false,
                      "required": ["name", "value"]
                    }
                }
            },
            "required": ["type", "label", "children", "attributes"],
            "additionalProperties": false
        }
    }
```

Sample recursive schema using explicit recursion:

json

```json
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
{
	"type": "object",
	"properties": {
		"linked_list": {
			"$ref": "#/$defs/linked_list_node"
		}
	},
	"$defs": {
		"linked_list_node": {
			"type": "object",
			"properties": {
				"value": {
					"type": "number"
				},
				"next": {
					"anyOf": [\
						{\
							"$ref": "#/$defs/linked_list_node"\
						},\
						{\
							"type": "null"\
						}\
					]
				}
			},
			"additionalProperties": false,
			"required": [\
				"next",\
				"value"\
			]
		}
	},
	"additionalProperties": false,
	"required": [\
		"linked_list"\
	]
}
```

## JSON mode

JSON mode is a more basic version of the Structured Outputs feature. While JSON mode ensures that model output is valid JSON, Structured Outputs reliably matches the model's output to the schema you specify.
We recommend you use Structured Outputs if it is supported for your use case.

When JSON mode is turned on, the model's output is ensured to be valid JSON, except for in some edge cases that you should detect and handle appropriately.

To turn on JSON mode with the Chat Completions or Assistants API you can set the `response_format` to `{ "type": "json_object" }`. If you are using function calling, JSON mode is always turned on.

Important notes:

- When using JSON mode, you must always instruct the model to produce JSON via some message in the conversation, for example via your system message. If you don't include an explicit instruction to generate JSON, the model may generate an unending stream of whitespace and the request may run continually until it reaches the token limit. To help ensure you don't forget, the API will throw an error if the string "JSON" does not appear somewhere in the context.
- JSON mode will not guarantee the output matches any specific schema, only that it is valid and parses without errors. You should use Structured Outputs to ensure it matches your schema, or if that is not possible, you should use a validation library and potentially retries to ensure that the output matches your desired schema.
- Your application must detect and handle the edge cases that can result in the model output not being a complete JSON object (see below)

Handling edge cases

python

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
we_did_not_specify_stop_tokens = True

try:
    response = client.chat.completions.create(
        model="gpt-3.5-turbo-0125",
        messages=[\
            {"role": "system", "content": "You are a helpful assistant designed to output JSON."},\
            {"role": "user", "content": "Who won the world series in 2020? Please respond in the format {winner: ...}"}\
        ],
        response_format={"type": "json_object"}
    )

    # Check if the conversation was too long for the context window, resulting in incomplete JSON
    if response.choices[0].message.finish_reason == "length":
        # your code should handle this error case
        pass

    # Check if the OpenAI safety system refused the request and generated a refusal instead
    if response.choices[0].message[0].get("refusal"):
        # your code should handle this error case
        # In this case, the .content field will contain the explanation (if any) that the model generated for why it is refusing
        print(response.choices[0].message[0]["refusal"])

    # Check if the model's output included restricted content, so the generation of JSON was halted and may be partial
    if response.choices[0].message.finish_reason == "content_filter":
        # your code should handle this error case
        pass

    if response.choices[0].message.finish_reason == "stop":
        # In this case the model has either successfully finished generating the JSON object according to your schema, or the model generated one of the tokens you provided as a "stop token"

        if we_did_not_specify_stop_tokens:
            # If you didn't specify any stop tokens, then the generation is complete and the content key will contain the serialized JSON object
            # This will parse successfully and should now contain  "{"winner": "Los Angeles Dodgers"}"
            print(response.choices[0].message.content)
        else:
            # Check if the response.choices[0].message.content ends with one of your stop tokens and handle appropriately
            pass
except Exception as e:
    # Your code should handle errors here, for example a network error calling the API
    print(e)
```

```javascript
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
const we_did_not_specify_stop_tokens = true;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [\
        {\
          role: "system",\
          content: "You are a helpful assistant designed to output JSON.",\
        },\
        { role: "user", content: "Who won the world series in 2020? Please respond in the format {winner: ...}" },\
      ],
      response_format: { type: "json_object" },
    });

    // Check if the conversation was too long for the context window, resulting in incomplete JSON
    if (response.choices[0].message.finish_reason === "length") {
      // your code should handle this error case
    }

    // Check if the OpenAI safety system refused the request and generated a refusal instead
    if (response.choices[0].message[0].refusal) {
      // your code should handle this error case
      // In this case, the .content field will contain the explanation (if any) that the model generated for why it is refusing
      console.log(response.choices[0].message[0].refusal)
    }

    // Check if the model's output included restricted content, so the generation of JSON was halted and may be partial
    if (response.choices[0].message.finish_reason === "content_filter") {
      // your code should handle this error case
    }

    if (response.choices[0].message.finish_reason === "stop") {
      // In this case the model has either successfully finished generating the JSON object according to your schema, or the model generated one of the tokens you provided as a "stop token"

      if (we_did_not_specify_stop_tokens) {
        // If you didn't specify any stop tokens, then the generation is complete and the content key will contain the serialized JSON object
        // This will parse successfully and should now contain  {"winner": "Los Angeles Dodgers"}
        console.log(JSON.parse(response.choices[0].message.content))
      } else {
        // Check if the response.choices[0].message.content ends with one of your stop tokens and handle appropriately
      }
    }
  } catch (e) {
    // Your code should handle errors here, for example a network error calling the API
    console.error(e)
  }
```

## Resources

To learn more about Structured Outputs, we recommend browsing the following resources:

- Check out our [introductory cookbook](https://cookbook.openai.com/examples/structured_outputs_intro) on Structured Outputs
- Learn [how to build multi-agent systems](https://cookbook.openai.com/examples/structured_outputs_multi_agent) with Structured OutputsLog in [Sign up](https://platform.openai.com/signup)

# Fine-tuning

Copy page

Fine-tune models for better results and efficiency.

Fine-tuning lets you get more out of the models available through the API by providing:

- Higher quality results than prompting
- Ability to train on more examples than can fit in a prompt
- Token savings due to shorter prompts
- Lower latency requests

OpenAI's text generation models have been pre-trained on a vast amount of text. To use the models effectively, we include instructions and sometimes several examples in a prompt. Using demonstrations to show how to perform a task is often called "few-shot learning."

Fine-tuning improves on few-shot learning by training on many more examples than can fit in the prompt, letting you achieve better results on a wide number of tasks. **Once a model has been fine-tuned, you won't need to provide as many examples in the prompt.** This saves costs and enables lower-latency requests.

At a high level, fine-tuning involves the following steps:

1. Prepare and upload training data
2. Train a new fine-tuned model
3. Evaluate results and go back to step 1 if needed
4. Use your fine-tuned model

Visit our [pricing page](https://openai.com/api/pricing) to learn more about how fine-tuned model training and usage are billed.

### Which models can be fine-tuned?

Fine-tuning is currently available for the following models:

- `gpt-4o-2024-08-06`
- `gpt-4o-mini-2024-07-18`
- `gpt-4-0613`
- `gpt-3.5-turbo-0125`
- `gpt-3.5-turbo-1106`
- `gpt-3.5-turbo-0613`

You can also fine-tune a fine-tuned model, which is useful if you acquire additional data and don't want to repeat the previous training steps.

We expect `gpt-4o-mini` to be the right model for most users in terms of performance, cost, and ease of use.

## When to use fine-tuning

Fine-tuning OpenAI text generation models can make them better for specific applications, but it requires a careful investment of time and effort. We recommend first attempting to get good results with prompt engineering, prompt chaining (breaking complex tasks into multiple prompts), and [function calling](https://platform.openai.com/docs/guides/function-calling), with the key reasons being:

- There are many tasks at which our models may not initially appear to perform well, but results can be improved with the right prompts - thus fine-tuning may not be necessary
- Iterating over prompts and other tactics has a much faster feedback loop than iterating with fine-tuning, which requires creating datasets and running training jobs
- In cases where fine-tuning is still necessary, initial prompt engineering work is not wasted - we typically see best results when using a good prompt in the fine-tuning data (or combining prompt chaining / tool use with fine-tuning)

Our [prompt engineering guide](https://platform.openai.com/docs/guides/prompt-engineering) provides a background on some of the most effective strategies and tactics for getting better performance without fine-tuning. You may find it helpful to iterate quickly on prompts in our [playground](https://platform.openai.com/playground).

### Common use cases

Some common use cases where fine-tuning can improve results:

- Setting the style, tone, format, or other qualitative aspects
- Improving reliability at producing a desired output
- Correcting failures to follow complex prompts
- Handling many edge cases in specific ways
- Performing a new skill or task that’s hard to articulate in a prompt

One high-level way to think about these cases is when it’s easier to "show, not tell". In the sections to come, we will explore how to set up data for fine-tuning and various examples where fine-tuning improves the performance over the baseline model.

Another scenario where fine-tuning is effective is reducing cost and/or latency by replacing a more expensive model like `gpt-4o` with a fine-tuned `gpt-4o-mini` model. If you can achieve good results with `gpt-4o`, you can often reach similar quality with a fine-tuned `gpt-4o-mini` model by fine-tuning on the `gpt-4o` completions, possibly with a shortened instruction prompt.

## Preparing your dataset

Once you have determined that fine-tuning is the right solution (i.e. you’ve optimized your prompt as far as it can take you and identified problems that the model still has), you’ll need to prepare data for training the model. You should create a diverse set of demonstration conversations that are similar to the conversations you will ask the model to respond to at inference time in production.

Each example in the dataset should be a conversation in the same format as our [Chat Completions API](https://platform.openai.com/docs/api-reference/chat/create), specifically a list of messages where each message has a role, content, and [optional name](https://platform.openai.com/docs/api-reference/chat/create#chat/create-chat/create-messages-name). At least some of the training examples should directly target cases where the prompted model is not behaving as desired, and the provided assistant messages in the data should be the ideal responses you want the model to provide.

### Example format

In this example, our goal is to create a chatbot that occasionally gives sarcastic responses, these are three training examples (conversations) we could create for a dataset:

```jsonl
1
2
3
{"messages": [{"role": "system", "content": "Marv is a factual chatbot that is also sarcastic."}, {"role": "user", "content": "What's the capital of France?"}, {"role": "assistant", "content": "Paris, as if everyone doesn't know that already."}]}
{"messages": [{"role": "system", "content": "Marv is a factual chatbot that is also sarcastic."}, {"role": "user", "content": "Who wrote 'Romeo and Juliet'?"}, {"role": "assistant", "content": "Oh, just some guy named William Shakespeare. Ever heard of him?"}]}
{"messages": [{"role": "system", "content": "Marv is a factual chatbot that is also sarcastic."}, {"role": "user", "content": "How far is the Moon from Earth?"}, {"role": "assistant", "content": "Around 384,400 kilometers. Give or take a few, like that really matters."}]}
```

### Multi-turn chat examples

Examples in the chat format can have multiple messages with the assistant role. The default behavior during fine-tuning is to train on all assistant messages within a single example. To skip fine-tuning on specific assistant messages, a `weight` key can be added disable fine-tuning on that message, allowing you to control which assistant messages are learned. The allowed values for `weight` are currently 0 or 1. Some examples using `weight` for the chat format are below.

```jsonl
1
2
3
{"messages": [{"role": "system", "content": "Marv is a factual chatbot that is also sarcastic."}, {"role": "user", "content": "What's the capital of France?"}, {"role": "assistant", "content": "Paris", "weight": 0}, {"role": "user", "content": "Can you be more sarcastic?"}, {"role": "assistant", "content": "Paris, as if everyone doesn't know that already.", "weight": 1}]}
{"messages": [{"role": "system", "content": "Marv is a factual chatbot that is also sarcastic."}, {"role": "user", "content": "Who wrote 'Romeo and Juliet'?"}, {"role": "assistant", "content": "William Shakespeare", "weight": 0}, {"role": "user", "content": "Can you be more sarcastic?"}, {"role": "assistant", "content": "Oh, just some guy named William Shakespeare. Ever heard of him?", "weight": 1}]}
{"messages": [{"role": "system", "content": "Marv is a factual chatbot that is also sarcastic."}, {"role": "user", "content": "How far is the Moon from Earth?"}, {"role": "assistant", "content": "384,400 kilometers", "weight": 0}, {"role": "user", "content": "Can you be more sarcastic?"}, {"role": "assistant", "content": "Around 384,400 kilometers. Give or take a few, like that really matters.", "weight": 1}]}
```

### Crafting prompts

We generally recommend taking the set of instructions and prompts that you found worked best for the model prior to fine-tuning, and including them in every training example. This should let you reach the best and most general results, especially if you have relatively few (e.g. under a hundred) training examples.

If you would like to shorten the instructions or prompts that are repeated in every example to save costs, keep in mind that the model will likely behave as if those instructions were included, and it may be hard to get the model to ignore those "baked-in" instructions at inference time.

It may take more training examples to arrive at good results, as the model has to learn entirely through demonstration and without guided instructions.

### Example count recommendations

To fine-tune a model, you are required to provide at least 10 examples. We typically see clear improvements from fine-tuning on 50 to 100 training examples with `gpt-4o-mini` and `gpt-3.5-turbo`, but the right number varies greatly based on the exact use case.

We recommend starting with 50 well-crafted demonstrations and seeing if the model shows signs of improvement after fine-tuning. In some cases that may be sufficient, but even if the model is not yet production quality, clear improvements are a good sign that providing more data will continue to improve the model. No improvement suggests that you may need to rethink how to set up the task for the model or restructure the data before scaling beyond a limited example set.

### Train and test splits

After collecting the initial dataset, we recommend splitting it into a training and test portion. When submitting a fine-tuning job with both training and test files, we will provide statistics on both during the course of training. These statistics will be your initial signal of how much the model is improving. Additionally, constructing a test set early on will be useful in making sure you are able to evaluate the model after training, by generating samples on the test set.

### Token limits

Token limits depend on the model you select. Here is an overview of the maximum inference context length and training examples context length for `gpt-4o-mini` and `gpt-3.5-turbo` models:

| Model | Inference context length | Training examples context length |
| --- | --- | --- |
| `gpt-4o-2024-08-06` | 128,000 tokens | 65,536 tokens (128k coming soon) |
| `gpt-4o-mini-2024-07-18` | 128,000 tokens | 65,536 tokens (128k coming soon) |
| `gpt-3.5-turbo-0125` | 16,385 tokens | 16,385 tokens |
| `gpt-3.5-turbo-1106` | 16,385 tokens | 16,385 tokens |
| `gpt-3.5-turbo-0613` | 16,385 tokens | 4,096 tokens |

Examples longer than the default will be truncated to the maximum context length which removes tokens from the end of the training example(s). To be sure that your entire training example fits in context, consider checking that the total token counts in the message contents are under the limit.

You can compute token counts using our [counting tokens notebook](https://cookbook.openai.com/examples/How_to_count_tokens_with_tiktoken.ipynb) from the OpenAI cookbook.

### Estimate costs

For detailed pricing on training costs, as well as input and output costs for a deployed fine-tuned model, visit our [pricing page](https://openai.com/api/pricing). Note that we don't charge for tokens used for training validation. To estimate the cost of a specific fine-tuning training job, use the following formula:

> (base training cost per 1M input tokens ÷ 1M) × number of tokens in the input file × number of epochs trained

For a training file with 100,000 tokens trained over 3 epochs, the expected cost would be:

- ~$0.90 USD with `gpt-4o-mini-2024-07-18` after the free period ends on October 31, 2024.
- ~$2.40 USD with `gpt-3.5-turbo-0125`.

### Check data formatting

Once you have compiled a dataset and before you create a fine-tuning job, it is important to check the data formatting. To do this, we created a simple Python script which you can use to find potential errors, review token counts, and estimate the cost of a fine-tuning job.

[Fine-tuning data format validation\\
\\
Learn about fine-tuning data formatting](https://cookbook.openai.com/examples/chat_finetuning_data_prep)

### Upload a training file

Once you have the data validated, the file needs to be uploaded using the [Files API](https://platform.openai.com/docs/api-reference/files/create) in order to be used with a fine-tuning jobs:

python

```python
1
2
3
4
5
6
7
from openai import OpenAI
client = OpenAI()

client.files.create(
  file=open("mydata.jsonl", "rb"),
  purpose="fine-tune"
)
```

```javascript
1
2
3
4
5
6
7
8
9
10
11
12
13
14
import fs from 'fs';
import fetch from 'node-fetch';
import OpenAI, { toFile } from 'openai';

const openai = new OpenAI();

// If you have access to Node fs we recommend using fs.createReadStream():
await openai.files.create({ file: fs.createReadStream('mydata.jsonl'), purpose: 'fine-tune' });

// Or if you have the web File API you can pass a File instance:
await openai.files.create({ file: new File(['my bytes'], 'mydata.jsonl'), purpose: 'fine-tune' });

// You can also pass a fetch Response:
await openai.files.create({ file: await fetch('https://somesite/mydata.jsonl'), purpose: 'fine-tune' });
```

```bash
1
2
3
4
curl https://api.openai.com/v1/files \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F purpose="fine-tune" \
  -F file="@mydata.jsonl"
```

After you upload the file, it may take some time to process. While the file is processing, you can still create a fine-tuning job but it will not start until the file processing has completed.

The maximum file upload size is 1 GB, though we do not suggest fine-tuning with that amount of data since you are unlikely to need that large of an amount to see improvements.

## Vision fine-tuning

Fine-tuning is also possible with images in your JSONL files. Just as you can [send one or many image inputs to chat completions](https://platform.openai.com/docs/guides/vision), you can include those same message types within your training data. Images can be provided either as HTTP URLs or data URLs containing [base64 encoded images](https://platform.openai.com/docs/guides/vision#uploading-base-64-encoded-images).

Here's an example of an image message on a line of your JSONL file. Below, the JSON object is expanded for readibility, but typically this JSON would appear on a single line in your data file:

```json
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
{
  "messages": [\
    { "role": "system", "content": "You are an assistant that identifies uncommon cheeses." },\
    { "role": "user", "content": "What is this cheese?" },\
    { "role": "user", "content": [\
        {\
          "type": "image_url",\
          "image_url": {\
            "url": "https://upload.wikimedia.org/wikipedia/commons/3/36/Danbo_Cheese.jpg"\
          }\
        }\
      ]\
    },\
    { "role": "assistant", "content": "Danbo" }\
  ]
}
```

### Image dataset requirements

#### Size

- Your training file can contain a maximum of 50,000 examples that contain images (not including text examples).
- Each example can have at most 10 images.
- Each image can be at most 10 MB.

#### Format

- Images must be JPEG, PNG, or WEBP format.
- Your images must be in the RGB or RGBA image mode.
- You cannot include images as output from messages with the `assistant` role.

#### Content moderation policy

We scan your images before training to ensure that they comply with our usage policy. This may introduce latency in file validation before fine tuning begins.

Images containing the following will be excluded from your dataset and not used for training:

- People
- Faces
- Children
- CAPTCHAs

### Help

#### What to do if your images get skipped

Your images can get skipped for the following reasons:

- **contains CAPTCHAs**, **contains people**, **contains faces**, **contains children**
  - Remove the image. For now, we cannot fine-tune models with images containing these entities.
- **inaccessible URL**
  - Ensure that the image URL is publicly accessible.
- **image too large**
  - Please ensure that your images fall within our [dataset size limits](https://platform.openai.com/docs/guides/fine-tuning#size).
- **invalid image format**
  - Please ensure that your images fall within our [dataset format](https://platform.openai.com/docs/guides/fine-tuning#format).

#### How to upload large files

- Your training files might get quite large. You can upload files up to 8 GB in multiple parts using the [Uploads API](https://platform.openai.com/docs/api-reference/uploads) as opposed to the [Files API](https://platform.openai.com/docs/api-reference/files), which only allows file uploads of up to 512 MB.

#### Reducing training cost

If you set the `detail` parameter for an image to `low`, the image is resized to 512 by 512 pixels and is only represented by 85 tokens regardless of its size. This will reduce the cost of training. [See here for more information.](https://platform.openai.com/docs/guides/vision#low-or-high-fidelity-image-understanding)

```text
1
2
3
4
5
6
7
{
    "type": "image_url",
    "image_url": {
        "url": "https://upload.wikimedia.org/wikipedia/commons/3/36/Danbo_Cheese.jpg",
        "detail": "low"
    }
}
```

#### Other considerations for vision fine-tuning

- To control the fidelity of image understanding, set the `detail` parameter of `image_url` to `low`, `high`, or `auto` for each image. This will also affect the number of tokens per image that the model sees during training time, and will affect the cost of training. [See here for more information.](https://platform.openai.com/docs/guides/vision#low-or-high-fidelity-image-understanding)

## Create a fine-tuned model

After ensuring you have the right amount and structure for your dataset, and have uploaded the file, the next step is to create a fine-tuning job. We support creating fine-tuning jobs via the [fine-tuning UI](https://platform.openai.com/finetune) or programmatically.

To start a fine-tuning job using the OpenAI SDK:

python

```python
1
2
3
4
5
6
7
from openai import OpenAI
client = OpenAI()

client.fine_tuning.jobs.create(
  training_file="file-abc123",
  model="gpt-4o-mini-2024-07-18"
)
```

```javascript
1
2
3
4
const fineTune = await openai.fineTuning.jobs.create({
  training_file: 'file-abc123',
  model: 'gpt-4o-mini-2024-07-18'
});
```

In this example, `model` is the name of the model you want to fine-tune. Note that only specific model snapshots (like `gpt-4o-mini-2024-07-18` in this case) can be used for this parameter, as listed in our [supported models](https://platform.openai.com/docs/guides/fine-tuning#which-models-can-be-fine-tuned). The `training_file` parameter is the file ID that was returned when the training file was uploaded to the OpenAI API. You can customize your fine-tuned model's name using the [suffix parameter](https://platform.openai.com/docs/api-reference/fine-tuning/create#fine-tuning/create-suffix).

To set additional fine-tuning parameters like the `validation_file` or `hyperparameters`, please refer to the [API specification for fine-tuning](https://platform.openai.com/docs/api-reference/fine-tuning/create).

After you've started a fine-tuning job, it may take some time to complete. Your job may be queued behind other jobs in our system, and training a model can take minutes or hours depending on the model and dataset size. After the model training is completed, the user who created the fine-tuning job will receive an email confirmation.

In addition to creating a fine-tuning job, you can also list existing jobs, retrieve the status of a job, or cancel a job.

python

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
from openai import OpenAI
client = OpenAI()

# List 10 fine-tuning jobs
client.fine_tuning.jobs.list(limit=10)

# Retrieve the state of a fine-tune
client.fine_tuning.jobs.retrieve("ftjob-abc123")

# Cancel a job
client.fine_tuning.jobs.cancel("ftjob-abc123")

# List up to 10 events from a fine-tuning job
client.fine_tuning.jobs.list_events(fine_tuning_job_id="ftjob-abc123", limit=10)

# Delete a fine-tuned model (must be an owner of the org the model was created in)
client.models.delete("ft:gpt-3.5-turbo:acemeco:suffix:abc123")
```

```javascript
1
2
3
4
5
6
7
8
9
10
11
12
13
14
// List 10 fine-tuning jobs
let page = await openai.fineTuning.jobs.list({ limit: 10 });

// Retrieve the state of a fine-tune
let fineTune = await openai.fineTuning.jobs.retrieve('ftjob-abc123');

// Cancel a job
let status = await openai.fineTuning.jobs.cancel('ftjob-abc123');

// List up to 10 events from a fine-tuning job
let events = await openai.fineTuning.jobs.listEvents(fineTune.id, { limit: 10 });

// Delete a fine-tuned model (must be an owner of the org the model was created in)
let model = await openai.models.delete('ft:gpt-3.5-turbo:acemeco:suffix:abc123');
```

## Use a fine-tuned model

When a job has succeeded, you will see the `fine_tuned_model` field populated with the name of the model when you retrieve the job details. You may now specify this model as a parameter to in the [Chat Completions](https://platform.openai.com/docs/api-reference/chat) API, and make requests to it using the [Playground](https://platform.openai.com/playground).

After your job is completed, the model should be available right away for inference use. In some cases, it may take several minutes for your model to become ready to handle requests. If requests to your model time out or the model name cannot be found, it is likely because your model is still being loaded. If this happens, try again in a few minutes.

python

```python
1
2
3
4
5
6
7
8
9
10
11
from openai import OpenAI
client = OpenAI()

completion = client.chat.completions.create(
  model="ft:gpt-4o-mini:my-org:custom_suffix:id",
  messages=[\
    {"role": "system", "content": "You are a helpful assistant."},\
    {"role": "user", "content": "Hello!"}\
  ]
)
print(completion.choices[0].message)
```

```javascript
1
2
3
4
5
6
7
8
async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "ft:gpt-4o-mini:my-org:custom_suffix:id",
  });
  console.log(completion.choices[0]);
}
main();
```

You can start making requests by passing the model name as shown above and in our [GPT guide](https://platform.openai.com/docs/guides/text-generation).

## Use a checkpointed model

In addition to creating a final fine-tuned model at the end of each fine-tuning job, OpenAI will create one full model checkpoint for you at the end of each training epoch. These checkpoints are themselves full models that can be used within our completions and chat-completions endpoints. Checkpoints are useful as they potentially provide a version of your fine-tuned model from before it experienced overfitting.

To access these checkpoints,

1. Wait until a job succeeds, which you can verify by [querying the status of a job.](https://platform.openai.com/docs/api-reference/fine-tuning/retrieve)
2. [Query the checkpoints endpoint](https://platform.openai.com/docs/api-reference/fine-tuning/list-checkpoints) with your fine-tuning job ID to access a list of model checkpoints for the fine-tuning job.

For each checkpoint object, you will see the `fine_tuned_model_checkpoint` field populated with the name of the model checkpoint. You may now use this model just like you would with the [final fine-tuned model](https://platform.openai.com/docs/guides/fine-tuning#use-a-fine-tuned-model).

```json
1
2
3
4
5
6
7
8
9
10
11
12
{
    "object": "fine_tuning.job.checkpoint",
    "id": "ftckpt_zc4Q7MP6XxulcVzj4MZdwsAB",
    "created_at": 1519129973,
    "fine_tuned_model_checkpoint": "ft:gpt-3.5-turbo-0125:my-org:custom-suffix:96olL566:ckpt-step-2000",
    "metrics": {
        "full_valid_loss": 0.134,
        "full_valid_mean_token_accuracy": 0.874
    },
    "fine_tuning_job_id": "ftjob-abc123",
    "step_number": 2000
}
```

Each checkpoint will specify its:

- `step_number`: The step at which the checkpoint was created (where each epoch is number of steps in the training set divided by the batch size)
- `metrics`: an object containing the metrics for your fine-tuning job at the step when the checkpoint was created.

Currently, only the checkpoints for the last 3 epochs of the job are saved and available for use. We plan to release more complex and flexible checkpointing strategies in the near future.

## Analyzing your fine-tuned model

We provide the following training metrics computed over the course of training:

- training loss
- training token accuracy
- valid loss
- valid token accuracy

Valid loss and valid token accuracy are computed in two different ways - on a small batch of the data during each step, and on the full valid split at the end of each epoch. The full valid loss and full valid token accuracy metrics are the most accurate metric tracking the overall performance of your model. These statistics are meant to provide a sanity check that training went smoothly (loss should decrease, token accuracy should increase). While an active fine-tuning jobs is running, you can view an event object which contains some useful metrics:

```json
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
{
    "object": "fine_tuning.job.event",
    "id": "ftevent-abc-123",
    "created_at": 1693582679,
    "level": "info",
    "message": "Step 300/300: training loss=0.15, validation loss=0.27, full validation loss=0.40",
    "data": {
        "step": 300,
        "train_loss": 0.14991648495197296,
        "valid_loss": 0.26569826706596045,
        "total_steps": 300,
        "full_valid_loss": 0.4032616495084362,
        "train_mean_token_accuracy": 0.9444444179534912,
        "valid_mean_token_accuracy": 0.9565217391304348,
        "full_valid_mean_token_accuracy": 0.9089635854341737
    },
    "type": "metrics"
}
```

After a fine-tuning job has finished, you can also see metrics around how the training process went by [querying a fine-tuning job](https://platform.openai.com/docs/api-reference/fine-tuning/retrieve), extracting a file ID from the `result_files`, and then [retrieving that files content](https://platform.openai.com/docs/api-reference/files/retrieve-contents). Each results CSV file has the following columns: `step`, `train_loss`, `train_accuracy`, `valid_loss`, and `valid_mean_token_accuracy`.

```csv
1
2
3
4
5
6
step,train_loss,train_accuracy,valid_loss,valid_mean_token_accuracy
1,1.52347,0.0,,
2,0.57719,0.0,,
3,3.63525,0.0,,
4,1.72257,0.0,,
5,1.52379,0.0,,
```

While metrics can be helpful, evaluating samples from the fine-tuned model provides the most relevant sense of model quality. We recommend generating samples from both the base model and the fine-tuned model on a test set, and comparing the samples side by side. The test set should ideally include the full distribution of inputs that you might send to the model in a production use case. If manual evaluation is too time-consuming, consider using our [Evals library](https://github.com/openai/evals) to automate future evaluations.

### Iterating on data quality

If the results from a fine-tuning job are not as good as you expected, consider the following ways to adjust the training dataset:

- Collect examples to target remaining issues
  - If the model still isn’t good at certain aspects, add training examples that directly show the model how to do these aspects correctly
- Scrutinize existing examples for issues
  - If your model has grammar, logic, or style issues, check if your data has any of the same issues. For instance, if the model now says "I will schedule this meeting for you" (when it shouldn’t), see if existing examples teach the model to say it can do new things that it can’t do
- Consider the balance and diversity of data
  - If 60% of the assistant responses in the data says "I cannot answer this", but at inference time only 5% of responses should say that, you will likely get an overabundance of refusals
- Make sure your training examples contain all of the information needed for the response
  - If we want the model to compliment a user based on their personal traits and a training example includes assistant compliments for traits not found in the preceding conversation, the model may learn to hallucinate information
- Look at the agreement / consistency in the training examples
  - If multiple people created the training data, it’s likely that model performance will be limited by the level of agreement / consistency between people. For instance, in a text extraction task, if people only agreed on 70% of extracted snippets, the model would likely not be able to do better than this
- Make sure your all of your training examples are in the same format, as expected for inference

### Iterating on data quantity

Once you’re satisfied with the quality and distribution of the examples, you can consider scaling up the number of training examples. This tends to help the model learn the task better, especially around possible "edge cases". We expect a similar amount of improvement every time you double the number of training examples. You can loosely estimate the expected quality gain from increasing the training data size by:

- Fine-tuning on your current dataset
- Fine-tuning on half of your current dataset
- Observing the quality gap between the two

In general, if you have to make a trade-off, a smaller amount of high-quality data is generally more effective than a larger amount of low-quality data.

### Iterating on hyperparameters

We allow you to specify the following hyperparameters:

- epochs
- learning rate multiplier
- batch size

We recommend initially training without specifying any of these, allowing us to pick a default for you based on dataset size, then adjusting if you observe the following:

- If the model does not follow the training data as much as expected increase the number of epochs by 1 or 2
  - This is more common for tasks for which there is a single ideal completion (or a small set of ideal completions which are similar). Some examples include classification, entity extraction, or structured parsing. These are often tasks for which you can compute a final accuracy metric against a reference answer.
- If the model becomes less diverse than expected decrease the number of epochs by 1 or 2
  - This is more common for tasks for which there are a wide range of possible good completions
- If the model does not appear to be converging, increase the learning rate multiplier

You can set the hyperparameters as is shown below:

python

```python
1
2
3
4
5
6
7
8
9
10
from openai import OpenAI
client = OpenAI()

client.fine_tuning.jobs.create(
  training_file="file-abc123",
  model="gpt-4o-mini-2024-07-18",
  hyperparameters={
    "n_epochs":2
  }
)
```

```javascript
1
2
3
4
5
const fineTune = await openai.fineTuning.jobs.create({
  training_file: "file-abc123",
  model: "gpt-4o-mini-2024-07-18",
  hyperparameters: { n_epochs: 2 }
});
```

## Fine-tuning examples

Now that we have explored the basics of the fine-tuning API, let’s look at going through the fine-tuning lifecycle for a few different use cases.

Style and tone

In this example, we will explore how to build a fine-tuned model which gets the model follow specific style and tone guidance beyond what is possible with prompting alone.

To begin, we create a sample set of messages showing what the model should which in this case is misspelled words.

```jsonl
1
2
3
{"messages": [{"role": "system", "content": "Marv is a factual chatbot that is also sarcastic."}, {"role": "user", "content": "What's the capital of France?"}, {"role": "assistant", "content": "Paris, as if everyone doesn't know that already."}]}
{"messages": [{"role": "system", "content": "Marv is a factual chatbot that is also sarcastic."}, {"role": "user", "content": "Who wrote 'Romeo and Juliet'?"}, {"role": "assistant", "content": "Oh, just some guy named William Shakespeare. Ever heard of him?"}]}
{"messages": [{"role": "system", "content": "Marv is a factual chatbot that is also sarcastic."}, {"role": "user", "content": "How far is the Moon from Earth?"}, {"role": "assistant", "content": "Around 384,400 kilometers. Give or take a few, like that really matters."}]}
```

If you want to follow along and create a fine-tuned model yourself, you will need at least 10 examples.

After getting the data that will potentially improve the model, the next step is to check if the data meets all the [formatting requirements](https://platform.openai.com/docs/guides/fine-tuning#check-data-formatting).

Now that we have the data formatted and validated, the final training step is to kick off a job to create the fine-tuned model. You can do this via the OpenAI CLI or one of our SDKs as shown below:

```python
1
2
3
4
5
6
7
8
9
10
11
12
from openai import OpenAI
client = OpenAI()

file = client.files.create(
  file=open("marv.jsonl", "rb"),
  purpose="fine-tune"
)

client.fine_tuning.jobs.create(
  training_file=file.id,
  model="gpt-4o-mini-2024-07-18"
)
```

Once the training job is done, you will be able to [use your fine-tuned model](https://platform.openai.com/docs/guides/fine-tuning#use-a-fine-tuned-model).

Structured output

Another type of use case which works really well with fine-tuning is getting the model to provide structured information, in this case about sports headlines:

```jsonl
{"messages": [{"role": "system", "content": "Given a sports headline, provide the following fields in a JSON dict, where applicable: \"player\" (full name), \"team\", \"sport\", and \"gender\"."}, {"role": "user", "content": "Sources: Colts grant RB Taylor OK to seek trade"}, {"role": "assistant", "content": "{\"player\": \"Jonathan Taylor\", \"team\": \"Colts\", \"sport\": \"football\", \"gender\": \"male\" }"}]}
{"messages": [{"role": "system", "content": "Given a sports headline, provide the following fields in a JSON dict, where applicable: \"player\" (full name), \"team\", \"sport\", and \"gender\"."}, {"role": "user", "content": "OSU 'split down middle' on starting QB battle"}, {"role": "assistant", "content": "{\"player\": null, \"team\": \"OSU\", \"sport\": \"football\", \"gender\": null }"}]}
```

If you want to follow along and create a fine-tuned model yourself, you will need at least 10 examples.

After getting the data that will potentially improve the model, the next step is to check if the data meets all the [formatting requirements](https://platform.openai.com/docs/guides/fine-tuning#check-data-formatting).

Now that we have the data formatted and validated, the final training step is to kick off a job to create the fine-tuned model. You can do this via the OpenAI CLI or one of our SDKs as shown below:

```python
1
2
3
4
5
6
7
8
9
10
11
12
from openai import OpenAI
client = OpenAI()

file = client.files.create(
  file=open("sports-context.jsonl", "rb"),
  purpose="fine-tune"
)

client.fine_tuning.jobs.create(
  training_file=file.id,
  model="gpt-4o-mini-2024-07-18"
)
```

Once the training job is done, you will be able to [use your fine-tuned model](https://platform.openai.com/docs/guides/fine-tuning#use-a-fine-tuned-model) and make a request that looks like the following:

```python
1
2
3
4
5
6
7
8
9
completion = client.chat.completions.create(
  model="ft:gpt-4o-mini:my-org:custom_suffix:id",
  messages=[\
    {"role": "system", "content": "Given a sports headline, provide the following fields in a JSON dict, where applicable: player (full name), team, sport, and gender"},\
    {"role": "user", "content": "Richardson wins 100m at worlds to cap comeback"}\
  ]
)

print(completion.choices[0].message)
```

Based on the formatted training data, the response should look like the following:

```json
1
2
3
4
5
6
{
    "player": "Sha'Carri Richardson",
    "team": null,
    "sport": "track and field",
    "gender": "female"
}
```

Tool calling

The chat completions API supports [tool calling](https://platform.openai.com/docs/guides/function-calling). Including a long list of tools in the completions API can consume a considerable number of prompt tokens and sometimes the model hallucinates or does not provide valid JSON output.

Fine-tuning a model with tool calling examples can allow you to:

- Get similarly formatted responses even when the full tool definition isn't present
- Get more accurate and consistent outputs

Format your examples as shown, with each line including a list of "messages" and an optional list of "tools":

```json
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
{
    "messages": [\
        { "role": "user", "content": "What is the weather in San Francisco?" },\
        {\
            "role": "assistant",\
            "tool_calls": [\
                {\
                    "id": "call_id",\
                    "type": "function",\
                    "function": {\
                        "name": "get_current_weather",\
                        "arguments": "{\"location\": \"San Francisco, USA\", \"format\": \"celsius\"}"\
                    }\
                }\
            ]\
        }\
    ],
    "tools": [\
        {\
            "type": "function",\
            "function": {\
                "name": "get_current_weather",\
                "description": "Get the current weather",\
                "parameters": {\
                    "type": "object",\
                    "properties": {\
                        "location": {\
                            "type": "string",\
                            "description": "The city and country, eg. San Francisco, USA"\
                        },\
                        "format": { "type": "string", "enum": ["celsius", "fahrenheit"] }\
                    },\
                    "required": ["location", "format"]\
                }\
            }\
        }\
    ]
}
```

If you want to follow along and create a fine-tuned model yourself, you will need at least 10 examples.

If your goal is to use less tokens, some useful techniques are:

- Omit function and parameter descriptions: remove the description field from function and parameters
- Omit parameters: remove the entire properties field from the parameters object
- Omit function entirely: remove the entire function object from the functions array

If your goal is to maximize the correctness of the function calling output, we recommend using the same tool definitions for both training and querying the fine-tuned model.

Fine-tuning on function calling can also be used to customize the model's response to function outputs. To do this you can include a function response message and an assistant message interpreting that response:

```json
1
2
3
4
5
6
7
8
9
{
    "messages": [\
        {"role": "user", "content": "What is the weather in San Francisco?"},\
        {"role": "assistant", "tool_calls": [{"id": "call_id", "type": "function", "function": {"name": "get_current_weather", "arguments": "{\"location\": \"San Francisco, USA\", \"format\": \"celsius\"}"}}]}\
        {"role": "tool", "tool_call_id": "call_id", "content": "21.0"},\
        {"role": "assistant", "content": "It is 21 degrees celsius in San Francisco, CA"}\
    ],
    "tools": [...] // same as before
}
```

[Parallel function calling](https://platform.openai.com/docs/guides/function-calling) is enabled by default
and can be disabled by using `
parallel_tool_calls: false
` in the training example.

Function calling

`function_call` and `functions` have been deprecated in favor of `tools` it is recommended to use the `tools` parameter instead.

The chat completions API supports [function calling](https://platform.openai.com/docs/guides/function-calling). Including a long list of functions in the completions API can consume a considerable number of prompt tokens and sometimes the model hallucinates or does not provide valid JSON output.

Fine-tuning a model with function calling examples can allow you to:

- Get similarly formatted responses even when the full function definition isn't present
- Get more accurate and consistent outputs

Format your examples as shown, with each line including a list of "messages" and an optional list of "functions":

```json
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
{
    "messages": [\
        { "role": "user", "content": "What is the weather in San Francisco?" },\
        {\
            "role": "assistant",\
            "function_call": {\
                "name": "get_current_weather",\
                "arguments": "{\"location\": \"San Francisco, USA\", \"format\": \"celsius\"}"\
            }\
        }\
    ],
    "functions": [\
        {\
            "name": "get_current_weather",\
            "description": "Get the current weather",\
            "parameters": {\
                "type": "object",\
                "properties": {\
                    "location": {\
                        "type": "string",\
                        "description": "The city and country, eg. San Francisco, USA"\
                    },\
                    "format": { "type": "string", "enum": ["celsius", "fahrenheit"] }\
                },\
                "required": ["location", "format"]\
            }\
        }\
    ]
}
```

If you want to follow along and create a fine-tuned model yourself, you will need at least 10 examples.

If your goal is to use less tokens, some useful techniques are:

- Omit function and parameter descriptions: remove the description field from function and parameters
- Omit parameters: remove the entire properties field from the parameters object
- Omit function entirely: remove the entire function object from the functions array

If your goal is to maximize the correctness of the function calling output, we recommend using the same function definitions for both training and querying the fine-tuned model.

Fine-tuning on function calling can also be used to customize the model's response to function outputs. To do this you can include a function response message and an assistant message interpreting that response:

```json
1
2
3
4
5
6
7
8
9
{
    "messages": [\
        {"role": "user", "content": "What is the weather in San Francisco?"},\
        {"role": "assistant", "function_call": {"name": "get_current_weather", "arguments": "{\"location\": \"San Francisco, USA\", \"format\": \"celsius\"}"}}\
        {"role": "function", "name": "get_current_weather", "content": "21.0"},\
        {"role": "assistant", "content": "It is 21 degrees celsius in San Francisco, CA"}\
    ],
    "functions": [...] // same as before
}
```

# Fine-tuning integrations

OpenAI provides the ability for you to integrate your fine-tuning jobs with 3rd parties via our integration framework. Integrations generally allow you to track
job state, status, metrics, hyperparameters, and other job-related information in a 3rd party system. You can also use integrations to trigger actions in a 3rd party system based on job state changes. Currently, the only supported integration is with [Weights and Biases](https://wandb.ai/), but more are coming soon.

## Weights and Biases Integration

[Weights and Biases (W&B)](https://wandb.ai/) is a popular tool for tracking machine learning experiments. You can use the OpenAI integration with W&B to track your fine-tuning jobs in W&B. This integration will automatically log metrics, hyperparameters, and other job-related information to the W&B project you specify.

To integrate your fine-tuning jobs with W&B, you'll need to

1. Provide authentication credentials for your Weights and Biases account to OpenAI
2. Configure the W&B integration when creating new fine-tuning jobs

### Authenticate your Weights and Biases account with OpenAI

Authentication is done by submitting a valid W&B API key to OpenAI. Currently, this can only be done via the [Account Dashboard](https://platform.openai.com/settings/organization/organization), and only by account administrators. Your W&B API key will be stored encrypted within OpenAI and will allow OpenAI to post metrics and metadata on your behalf to W&B when your fine-tuning jobs are running. Attempting to enable a W&B integration on a fine-tuning job without first authenticating your OpenAI organization with WandB will result in an error.

![](https://cdn.openai.com/API/images/guides/WandB_Integration.png)

### Enable the Weights and Biases integration

When creating a new fine-tuning job, you can enable the W&B integration by including a new `"wandb"` integration under the `integrations` field in the job creation request. This integration allows you to specify the W&B Project that you wish the newly created W&B Run to show up under.

Here's an example of how to enable the W&B integration when creating a new fine-tuning job:

```bash
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
curl -X POST \\
    -H "Content-Type: application/json" \\
    -H "Authorization: Bearer $OPENAI_API_KEY" \\
    -d '{
    "model": "gpt-4o-mini-2024-07-18",
    "training_file": "file-ABC123",
    "validation_file": "file-DEF456",
    "integrations": [\
        {\
            "type": "wandb",\
            "wandb": {\
                "project": "custom-wandb-project",\
                "tags": ["project:tag", "lineage"]\
            }\
        }\
    ]
}' https://api.openai.com/v1/fine_tuning/jobs
```

By default, the Run ID and Run display name are the ID of your fine-tuning job (e.g. `ftjob-abc123`). You can customize the display name of the run by including a `"name"` field in the `wandb` object. You can also include a `"tags"` field in the `wandb` object to add tags to the W&B Run (tags must be <= 64 character strings and there is a maximum of 50 tags).

Sometimes it is convenient to explicitly set the [W&B Entity](https://docs.wandb.ai/guides/runs/manage-runs#send-new-runs-to-a-team) to be associated with the run. You can do this by including an `"entity"` field in the `wandb` object. If you do not include an `"entity"` field, the W&B entity will default to the default W&B entity associated with the API key you registered previously.

The full specification for the integration can be found in our [fine-tuning job creation](https://platform.openai.com/docs/api-reference/fine-tuning/create) documentation.

### View your fine-tuning job in Weights and Biases

Once you've created a fine-tuning job with the W&B integration enabled, you can view the job in W&B by navigating to the W&B project you specified in the job creation request. Your run should be located at the URL: `https://wandb.ai/<WANDB-ENTITY>/<WANDB-PROJECT>/runs/ftjob-ABCDEF`.

You should see a new run with the name and tags you specified in the job creation request. The Run Config will contain relevant job metadata such as:

- `model`: The model you are fine-tuning
- `training_file`: The ID of the training file
- `validation_file`: The ID of the validation file
- `hyperparameters`: The hyperparameters used for the job (e.g. `n_epochs`, `learning_rate_multiplier`, `batch_size`)
- `seed`: The random seed used for the job

Likewise, OpenAI will set some default tags on the run to make it easier for your to search and filter. These tags will be prefixed with `"openai/"` and will include:

- `openai/fine-tuning`: Tag to let you know this run is a fine-tuning job
- `openai/ft-abc123`: The ID of the fine-tuning job
- `openai/gpt-4o-mini`: The model you are fine-tuning

An example W&B run generated from an OpenAI fine-tuning job is shown below:

![](https://cdn.openai.com/API/images/guides/WandB_Integration_Dashboard1.png)

Metrics for each step of the fine-tuning job will be logged to the W&B run. These metrics are the same metrics provided in the [fine-tuning job event](https://platform.openai.com/docs/api-reference/fine-tuning/list-events) object and are the same metrics your can view via the [OpenAI fine-tuning Dashboard](https://platform.openai.com/finetune). You can use W&B's visualization tools to track the progress of your fine-tuning job and compare it to other fine-tuning jobs you've run.

An example of the metrics logged to a W&B run is shown below:

![](https://cdn.openai.com/API/images/guides/WandB_Integration_Dashboard2.png)

## FAQ

### When should I use fine-tuning vs embeddings / retrieval augmented generation?

Embeddings with retrieval is best suited for cases when you need to have a large database of documents with relevant context and information.

By default OpenAI’s models are trained to be helpful generalist assistants. Fine-tuning can be used to make a model which is narrowly focused, and exhibits specific ingrained behavior patterns. Retrieval strategies can be used to make new information available to a model by providing it with relevant context before generating its response. Retrieval strategies are not an alternative to fine-tuning and can in fact be complementary to it.

You can explore the differences between these options further in this Developer Day talk:

A Survey of Techniques for Maximizing LLM Performance - YouTube

OpenAI

1.3M subscribers

[A Survey of Techniques for Maximizing LLM Performance](https://www.youtube.com/watch?v=ahnGLM-RC1Y)

OpenAI

Search

Watch later

Share

Copy link

Info

Shopping

Tap to unmute

If playback doesn't begin shortly, try restarting your device.

More videos

## More videos

You're signed out

Videos you watch may be added to the TV's watch history and influence TV recommendations. To avoid this, cancel and sign in to YouTube on your computer.

CancelConfirm

Share

Include playlist

An error occurred while retrieving sharing information. Please try again later.

[Watch on](https://www.youtube.com/watch?v=ahnGLM-RC1Y&embeds_referring_euri=https%3A%2F%2Fplatform.openai.com%2F)

0:00

0:00 / 45:32•Live

•

[Watch on YouTube](https://www.youtube.com/watch?v=ahnGLM-RC1Y "Watch on YouTube")

### How do I know if my fine-tuned model is actually better than the base model?

We recommend generating samples from both the base model and the fine-tuned model on a test set of chat conversations, and comparing the samples side by side. For more comprehensive evaluations, consider using the [OpenAI evals framework](https://github.com/openai/evals) to create an eval specific to your use case.

### Can I continue fine-tuning a model that has already been fine-tuned?

Yes, you can pass the name of a fine-tuned model into the `model` parameter when creating a fine-tuning job. This will start a new fine-tuning job using the fine-tuned model as the starting point.

### How can I estimate the cost of fine-tuning a model?

Please refer to the [estimate cost](https://platform.openai.com/docs/guides/fine-tuning#estimate-costs) section above.

### How many fine-tuning jobs can I have running at once?

Please refer to our [rate limit page](https://platform.openai.com/docs/guides/rate-limits#what-are-the-rate-limits-for-our-api) for the most up to date information on the limits.

### How do rate limits work on fine-tuned models?

A fine-tuned model pulls from the same shared rate limit as the model it is based off of. For example, if you use half your TPM rate limit in a given time period with the standard `gpt-4o-mini` model, any model(s) you fine-tuned from `gpt-4o-mini` would only have the remaining half of the TPM rate limit accessible since the capacity is shared across all models of the same type.

Put another way, having fine-tuned models does not give you more capacity to use our models from a total throughput perspective.Log in [Sign up](/signup)

Page not found

We couldn't find the page you were looking for.

Was this expected?Log in [Sign up](/signup)

Page not found

We couldn't find the page you were looking for.

Was this expected?Log in [Sign up](/signup)

Page not found

We couldn't find the page you were looking for.

Was this expected?Log in [Sign up](/signup)

Page not found

We couldn't find the page you were looking for.

Was this expected?Log in [Sign up](/signup)

Page not found

We couldn't find the page you were looking for.

Was this expected?Log in [Sign up](/signup)

# Safety best practices

Copy page

Implement safety measures like moderation and human oversight.

### Use our free Moderation API

OpenAI's [Moderation API](/docs/guides/moderation) is free-to-use and can help reduce the frequency of unsafe content in your completions. Alternatively, you may wish to develop your own content filtration system tailored to your use case.

### Adversarial testing

We recommend “red-teaming” your application to ensure it's robust to adversarial input. Test your product over a wide range of inputs and user behaviors, both a representative set and those reflective of someone trying to ‘break' your application. Does it wander off topic? Can someone easily redirect the feature via prompt injections, e.g. “ignore the previous instructions and do this instead”?

### Human in the loop (HITL)

Wherever possible, we recommend having a human review outputs before they are used in practice. This is especially critical in high-stakes domains, and for code generation. Humans should be aware of the limitations of the system, and have access to any information needed to verify the outputs (for example, if the application summarizes notes, a human should have easy access to the original notes to refer back).

### Prompt engineering

“Prompt engineering” can help constrain the topic and tone of output text. This reduces the chance of producing undesired content, even if a user tries to produce it. Providing additional context to the model (such as by giving a few high-quality examples of desired behavior prior to the new input) can make it easier to steer model outputs in desired directions.

### “Know your customer” (KYC)

Users should generally need to register and log-in to access your service. Linking this service to an existing account, such as a Gmail, LinkedIn, or Facebook log-in, may help, though may not be appropriate for all use-cases. Requiring a credit card or ID card reduces risk further.

### Constrain user input and limit output tokens

Limiting the amount of text a user can input into the prompt helps avoid prompt injection. Limiting the number of output tokens helps reduce the chance of misuse.

Narrowing the ranges of inputs or outputs, especially drawn from trusted sources, reduces the extent of misuse possible within an application.

Allowing user inputs through validated dropdown fields (e.g., a list of movies on Wikipedia) can be more secure than allowing open-ended text inputs.

Returning outputs from a validated set of materials on the backend, where possible, can be safer than returning novel generated content (for instance, routing a customer query to the best-matching existing customer support article, rather than attempting to answer the query from-scratch).

### Allow users to report issues

Users should generally have an easily-available method for reporting improper functionality or other concerns about application behavior (listed email address, ticket submission method, etc). This method should be monitored by a human and responded to as appropriate.

### Understand and communicate limitations

From hallucinating inaccurate information, to offensive outputs, to bias, and much more, language models may not be suitable for every use case without significant modifications. Consider whether the model is fit for your purpose, and evaluate the performance of the API on a wide range of potential inputs in order to identify cases where the API's performance might drop. Consider your customer base and the range of inputs that they will be using, and ensure their expectations are calibrated appropriately.

Safety and security are very important to us at OpenAI.

If in the course of your development you do notice any safety or security issues with the API or anything else related to OpenAI, please submit these through our [Coordinated Vulnerability Disclosure Program](https://openai.com/security/disclosure/).

## End-user IDs

Sending end-user IDs in your requests can be a useful tool to help OpenAI monitor and detect abuse. This allows OpenAI to provide your team with more actionable feedback in the event that we detect any policy violations in your application.

The IDs should be a string that uniquely identifies each user. We recommend hashing their username or email address, in order to avoid sending us any identifying information. If you offer a preview of your product to non-logged in users, you can send a session ID instead.

You can include end-user IDs in your API requests via the `user` parameter as follows:

Example: Providing a user identifer

python

```python
1
2
3
4
5
6
7
8
9
10
11
from openai import OpenAI
client = OpenAI()

response = client.chat.completions.create(
  model="gpt-4o-mini",
  messages=[\
    {"role": "user", "content": "This is a test"}\
  ],
  max_tokens=5,
  user="user_123456"
)
```

```bash
1
2
3
4
5
6
7
8
9
10
11
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
  "model": "gpt-4o-mini",
  "messages": [\
    {"role": "user", "content": "This is a test"}\
  ],
  "max_tokens": 5,
  "user": "user123456"
}'
```Log in [Sign up](/signup)

# Prompt examples

Explore what's possible with some example prompts

All categories

Grammar correction

Convert ungrammatical statements into standard English.

Summarize for a 2nd grader

Simplify text to a level appropriate for a second-grade student.

Parse unstructured data

Create tables from unstructured text.

Emoji Translation

Translate regular text into emoji text.

Calculate time complexity

Find the time complexity of a function.

Explain code

Explain a complicated piece of code.

Keywords

Extract keywords from a block of text.

Product name generator

Generate product names from a description and seed words.

Python bug fixer

Find and fix bugs in source code.

Spreadsheet creator

Create spreadsheets of various kinds of data.

Tweet classifier

Detect sentiment in a tweet.

Airport code extractor

Extract airport codes from text.

Mood to color

Turn a text description into a color.

VR fitness idea generator

Generate ideas for fitness promoting virtual reality games.

Marv the sarcastic chat bot

Marv is a factual chatbot that is also sarcastic.

Turn by turn directions

Convert natural language to turn-by-turn directions.

Interview questions

Create interview questions.

Function from specification

Create a Python function from a specification.

Improve code efficiency

Provide ideas for efficiency improvements to Python code.

Single page website creator

Create a single page website.

Rap battle writer

Generate a rap battle between two characters.

Memo writer

Generate a company memo based on provided points.

Emoji chatbot

Generate conversational replies using emojis only.

Translation

Translate natural language text.

Socratic tutor

Generate responses as a Socratic tutor.

Natural language to SQL

Convert natural language into SQL queries.

Meeting notes summarizer

Summarize meeting notes including overall discussion, action items, and future topics.

Review classifier

Classify user reviews based on a set of tags.

Pro and con discusser

Analyze the pros and cons of a given topic.

Lesson plan writer

Generate a lesson plan for a specific topic.

Explain code

Extract

Code

Explain a complicated piece of code.

Prompt

SYSTEM

You will be provided with a piece of code, and your task is to explain it in a concise way.

USER

class Log:
def \_\_init\_\_(self, path):
dirname = os.path.dirname(path)
os.makedirs(dirname, exist\_ok=True)
f = open(path, "a+")

# Check that the file is newline-terminated
size = os.path.getsize(path)
if size > 0:
f.seek(size - 1)
end = f.read(1)
if end != "\\n":
f.write("\\n")
self.f = f
self.path = path

def log(self, event):
event\["\_event\_id"\] = str(uuid.uuid4())
json.dump(event, self.f)
self.f.write("\\n")

def state(self):
state = {"complete": set(), "last": None}
for line in open(self.path):
event = json.loads(line)
if event\["type"\] == "submit" and event\["success"\]:
state\["complete"\].add(event\["id"\])
state\["last"\] = event
return state

Sample response

This code defines a class \`Log\` that is used to log events to a file and retrieve the state of the log.

The \`\_\_init\_\_\` method initializes the log file. It takes a file path as an argument, creates the directory if it doesn't exist, and opens the file in append mode. If the file is not empty and doesn't end with a newline, it appends a newline.

The \`log\` method logs an event to the file. It takes a dictionary as an argument, adds a unique identifier to it, converts it to JSON, and writes it to the file followed by a newline.

The \`state\` method retrieves the state of the log. It initializes a dictionary with two keys: "complete" (a set of completed events) and "last" (the last event). It then reads the log file line by line, parses each line as JSON, and if the event type is "submit" and it was successful, it adds the event id to the "complete" set and updates the "last" event. Finally, it returns the state dictionary.

API request

python

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
from openai import OpenAI
client = OpenAI()

response = client.chat.completions.create(
  model="gpt-4o",
  messages=[\
    {\
      "role": "system",\
      "content": "You will be provided with a piece of code, and your task is to explain it in a concise way."\
    },\
    {\
      "role": "user",\
      "content": "class Log:\n        def __init__(self, path):\n            dirname = os.path.dirname(path)\n            os.makedirs(dirname, exist_ok=True)\n            f = open(path, \"a+\")\n    \n            # Check that the file is newline-terminated\n            size = os.path.getsize(path)\n            if size > 0:\n                f.seek(size - 1)\n                end = f.read(1)\n                if end != \"\\n\":\n                    f.write(\"\\n\")\n            self.f = f\n            self.path = path\n    \n        def log(self, event):\n            event[\"_event_id\"] = str(uuid.uuid4())\n            json.dump(event, self.f)\n            self.f.write(\"\\n\")\n    \n        def state(self):\n            state = {\"complete\": set(), \"last\": None}\n            for line in open(self.path):\n                event = json.loads(line)\n                if event[\"type\"] == \"submit\" and event[\"success\"]:\n                    state[\"complete\"].add(event[\"id\"])\n                    state[\"last\"] = event\n            return state"\
    }\
  ],
  temperature=1,
  max_tokens=1024,
  top_p=1
)
```

```javascript
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [\
    {\
      "role": "system",\
      "content": "You will be provided with a piece of code, and your task is to explain it in a concise way."\
    },\
    {\
      "role": "user",\
      "content": "class Log:\n        def __init__(self, path):\n            dirname = os.path.dirname(path)\n            os.makedirs(dirname, exist_ok=True)\n            f = open(path, \"a+\")\n    \n            # Check that the file is newline-terminated\n            size = os.path.getsize(path)\n            if size > 0:\n                f.seek(size - 1)\n                end = f.read(1)\n                if end != \"\\n\":\n                    f.write(\"\\n\")\n            self.f = f\n            self.path = path\n    \n        def log(self, event):\n            event[\"_event_id\"] = str(uuid.uuid4())\n            json.dump(event, self.f)\n            self.f.write(\"\\n\")\n    \n        def state(self):\n            state = {\"complete\": set(), \"last\": None}\n            for line in open(self.path):\n                event = json.loads(line)\n                if event[\"type\"] == \"submit\" and event[\"success\"]:\n                    state[\"complete\"].add(event[\"id\"])\n                    state[\"last\"] = event\n            return state"\
    }\
  ],
  temperature: 1,
  max_tokens: 1024,
  top_p: 1,
});
```

```bash
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
  "model": "gpt-4o",
  "messages": [\
    {\
      "role": "system",\
      "content": "You will be provided with a piece of code, and your task is to explain it in a concise way."\
    },\
    {\
      "role": "user",\
      "content": "class Log:\n        def __init__(self, path):\n            dirname = os.path.dirname(path)\n            os.makedirs(dirname, exist_ok=True)\n            f = open(path, \"a+\")\n    \n            # Check that the file is newline-terminated\n            size = os.path.getsize(path)\n            if size > 0:\n                f.seek(size - 1)\n                end = f.read(1)\n                if end != \"\\n\":\n                    f.write(\"\\n\")\n            self.f = f\n            self.path = path\n    \n        def log(self, event):\n            event[\"_event_id\"] = str(uuid.uuid4())\n            json.dump(event, self.f)\n            self.f.write(\"\\n\")\n    \n        def state(self):\n            state = {\"complete\": set(), \"last\": None}\n            for line in open(self.path):\n                event = json.loads(line)\n                if event[\"type\"] == \"submit\" and event[\"success\"]:\n                    state[\"complete\"].add(event[\"id\"])\n                    state[\"last\"] = event\n            return state"\
    }\
  ],
  "temperature": 1,
  "max_tokens": 1024,
  "top_p": 1
}'
```

```json
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
{
  "model": "gpt-4o",
  "messages": [\
    {\
      "role": "system",\
      "content": "You will be provided with a piece of code, and your task is to explain it in a concise way."\
    },\
    {\
      "role": "user",\
      "content": "class Log:\n        def __init__(self, path):\n            dirname = os.path.dirname(path)\n            os.makedirs(dirname, exist_ok=True)\n            f = open(path, \"a+\")\n    \n            # Check that the file is newline-terminated\n            size = os.path.getsize(path)\n            if size > 0:\n                f.seek(size - 1)\n                end = f.read(1)\n                if end != \"\\n\":\n                    f.write(\"\\n\")\n            self.f = f\n            self.path = path\n    \n        def log(self, event):\n            event[\"_event_id\"] = str(uuid.uuid4())\n            json.dump(event, self.f)\n            self.f.write(\"\\n\")\n    \n        def state(self):\n            state = {\"complete\": set(), \"last\": None}\n            for line in open(self.path):\n                event = json.loads(line)\n                if event[\"type\"] == \"submit\" and event[\"success\"]:\n                    state[\"complete\"].add(event[\"id\"])\n                    state[\"last\"] = event\n            return state"\
    }\
  ],
  "temperature": 1,
  "max_tokens": 1024,
  "top_p": 1
}
```Log in [Sign up](/signup)

# Libraries

Copy page

Explore libraries for Python, Node.js, .NET, and more.

## Python library

We provide a [Python library](https://github.com/openai/openai-python), which you can install by running:

```bash
pip install openai
```

Once installed, you can use the library and your secret key to run the following:

```python
1
2
3
4
5
6
7
8
9
from openai import OpenAI
client = OpenAI(
    # Defaults to os.environ.get("OPENAI_API_KEY")
)

chat_completion = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[{"role": "user", "content": "Hello world"}]
)
```

The bindings also will install a command-line utility you can use as follows:

```bash
$ openai api chat_completions.create -m gpt-4o-mini -g user "Hello world"
```

* * *

## TypeScript / JavaScript library

We provide a [TypeScript / JavaScript library](https://github.com/openai/openai-node) with support for Node.js and various [other runtimes](https://deno.land/x/openai). Install it by running:

```bash
1
2
3
npm install --save openai
# or
yarn add openai
```

Once installed, you can use the library and your secret key to run the following:

```javascript
1
2
3
4
5
6
7
8
9
10
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content: "Say this is a test" }],
    model: "gpt-4o-mini",
});
```

* * *

## .NET library

We provide a [.NET library](https://github.com/openai/openai-dotnet), which you can install by running:

```text
dotnet add package OpenAI
```

Once installed, you can use the library and your secret key to run the following:

```csharp
1
2
3
4
5
using OpenAI.Chat;

ChatClient client = new(model: "gpt-4o-mini",  apiKey: Environment.GetEnvironmentVariable("OPENAI_API_KEY"));

ChatCompletion chatCompletion = client.CompleteChat("Say 'this is a test.'");
```

* * *

## Azure OpenAI libraries

Microsoft's Azure team maintains libraries that are compatible with both the OpenAI API and Azure OpenAI services. Read the library documentation below to learn how you can use them with the OpenAI API.

- [Azure OpenAI client library for .NET](https://github.com/Azure/azure-sdk-for-net/tree/main/sdk/openai/Azure.AI.OpenAI)
- [Azure OpenAI client library for JavaScript](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/openai/openai)
- [Azure OpenAI client library for Java](https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/openai/azure-ai-openai)
- [Azure OpenAI client library for Go](https://github.com/Azure/azure-sdk-for-go/tree/main/sdk/ai/azopenai)

* * *

## Community libraries

The libraries below are built and maintained by the broader developer community. If you'd like to add a new library here, please follow the instructions in our [help center article](https://help.openai.com/en/articles/6684216-adding-your-api-client-to-the-community-libraries-page) on adding community libraries. You can also [watch our OpenAPI specification](https://github.com/openai/openai-openapi) repository on GitHub to get timely updates on when we make changes to our API.

Please note that OpenAI does not verify the correctness or security of these projects. **Use them at your own risk!**

### C\# / .NET

- [Betalgo.OpenAI](https://github.com/betalgo/openai) by [Betalgo](https://github.com/betalgo)
- [OpenAI-API-dotnet](https://github.com/OkGoDoIt/OpenAI-API-dotnet) by [OkGoDoIt](https://github.com/OkGoDoIt)
- [OpenAI-DotNet](https://github.com/RageAgainstThePixel/OpenAI-DotNet) by [RageAgainstThePixel](https://github.com/RageAgainstThePixel)

### C++

- [liboai](https://github.com/D7EAD/liboai) by [D7EAD](https://github.com/D7EAD)

### Clojure

- [openai-clojure](https://github.com/wkok/openai-clojure) by [wkok](https://github.com/wkok)

### Crystal

- [openai-crystal](https://github.com/sferik/openai-crystal) by [sferik](https://github.com/sferik)

### Dart/Flutter

- [openai](https://github.com/anasfik/openai) by [anasfik](https://github.com/anasfik)

### Delphi

- [DelphiOpenAI](https://github.com/HemulGM/DelphiOpenAI) by [HemulGM](https://github.com/HemulGM)

### Elixir

- [openai.ex](https://github.com/mgallo/openai.ex) by [mgallo](https://github.com/mgallo)

### Go

- [go-gpt3](https://github.com/sashabaranov/go-gpt3) by [sashabaranov](https://github.com/sashabaranov)

### Java

- [openai-java](https://github.com/TheoKanning/openai-java) by [Theo Kanning](https://github.com/TheoKanning)

### Julia

- [OpenAI.jl](https://github.com/rory-linehan/OpenAI.jl) by [rory-linehan](https://github.com/rory-linehan)

### Kotlin

- [openai-kotlin](https://github.com/Aallam/openai-kotlin) by [Mouaad Aallam](https://github.com/Aallam)

### Node.js

- [openai-api](https://www.npmjs.com/package/openai-api) by [Njerschow](https://github.com/Njerschow)
- [openai-api-node](https://www.npmjs.com/package/openai-api-node) by [erlapso](https://github.com/erlapso)
- [gpt-x](https://www.npmjs.com/package/gpt-x) by [ceifa](https://github.com/ceifa)
- [gpt3](https://www.npmjs.com/package/gpt3) by [poteat](https://github.com/poteat)
- [gpts](https://www.npmjs.com/package/gpts) by [thencc](https://github.com/thencc)
- [@dalenguyen/openai](https://www.npmjs.com/package/@dalenguyen/openai) by [dalenguyen](https://github.com/dalenguyen)
- [tectalic/openai](https://github.com/tectalichq/public-openai-client-js) by [tectalic](https://tectalic.com/)

### PHP

- [orhanerday/open-ai](https://packagist.org/packages/orhanerday/open-ai) by [orhanerday](https://github.com/orhanerday)
- [tectalic/openai](https://github.com/tectalichq/public-openai-client-php) by [tectalic](https://tectalic.com/)
- [openai-php client](https://github.com/openai-php/client) by [openai-php](https://github.com/openai-php)

### Python

- [chronology](https://github.com/OthersideAI/chronology) by [OthersideAI](https://www.othersideai.com/)

### R

- [rgpt3](https://github.com/ben-aaron188/rgpt3) by [ben-aaron188](https://github.com/ben-aaron188)

### Ruby

- [openai](https://github.com/nileshtrivedi/openai/) by [nileshtrivedi](https://github.com/nileshtrivedi)
- [ruby-openai](https://github.com/alexrudall/ruby-openai) by [alexrudall](https://github.com/alexrudall)

### Rust

- [async-openai](https://github.com/64bit/async-openai) by [64bit](https://github.com/64bit)
- [fieri](https://github.com/lbkolev/fieri) by [lbkolev](https://github.com/lbkolev)

### Scala

- [openai-scala-client](https://github.com/cequence-io/openai-scala-client) by [cequence-io](https://github.com/cequence-io)

### Swift

- [OpenAIKit](https://github.com/dylanshine/openai-kit) by [dylanshine](https://github.com/dylanshine)
- [OpenAI](https://github.com/MacPaw/OpenAI/) by [MacPaw](https://github.com/MacPaw)

### Unity

- [OpenAi-Api-Unity](https://github.com/hexthedev/OpenAi-Api-Unity) by [hexthedev](https://github.com/hexthedev)
- [com.openai.unity](https://github.com/RageAgainstThePixel/com.openai.unity) by [RageAgainstThePixel](https://github.com/RageAgainstThePixel)

### Unreal Engine

- [OpenAI-Api-Unreal](https://github.com/KellanM/OpenAI-Api-Unreal) by [KellanM](https://github.com/KellanM)

## Other OpenAI repositories

- [tiktoken](https://github.com/openai/tiktoken) \- counting tokens
- [simple-evals](https://github.com/openai/simple-evals) \- simple evaluation library
- [mle-bench](https://github.com/openai/mle-bench) \- library to evaluate machine learning engineer agents
- [gym](https://github.com/openai/gym) \- reinforcement learning library
- [swarm](https://github.com/openai/swarm) \- educational orchestration repositoryLog in [Sign up](/signup)

# Prompt examples

Explore what's possible with some example prompts

All categories

Grammar correction

Convert ungrammatical statements into standard English.

Summarize for a 2nd grader

Simplify text to a level appropriate for a second-grade student.

Parse unstructured data

Create tables from unstructured text.

Emoji Translation

Translate regular text into emoji text.

Calculate time complexity

Find the time complexity of a function.

Explain code

Explain a complicated piece of code.

Keywords

Extract keywords from a block of text.

Product name generator

Generate product names from a description and seed words.

Python bug fixer

Find and fix bugs in source code.

Spreadsheet creator

Create spreadsheets of various kinds of data.

Tweet classifier

Detect sentiment in a tweet.

Airport code extractor

Extract airport codes from text.

Mood to color

Turn a text description into a color.

VR fitness idea generator

Generate ideas for fitness promoting virtual reality games.

Marv the sarcastic chat bot

Marv is a factual chatbot that is also sarcastic.

Turn by turn directions

Convert natural language to turn-by-turn directions.

Interview questions

Create interview questions.

Function from specification

Create a Python function from a specification.

Improve code efficiency

Provide ideas for efficiency improvements to Python code.

Single page website creator

Create a single page website.

Rap battle writer

Generate a rap battle between two characters.

Memo writer

Generate a company memo based on provided points.

Emoji chatbot

Generate conversational replies using emojis only.

Translation

Translate natural language text.

Socratic tutor

Generate responses as a Socratic tutor.

Natural language to SQL

Convert natural language into SQL queries.

Meeting notes summarizer

Summarize meeting notes including overall discussion, action items, and future topics.

Review classifier

Classify user reviews based on a set of tags.

Pro and con discusser

Analyze the pros and cons of a given topic.

Lesson plan writer

Generate a lesson plan for a specific topic.

Emoji chatbot

Generate

Natural Language

Generate conversational replies using emojis only.

Prompt

SYSTEM

You will be provided with a message, and your task is to respond using emojis only.

USER

How are you?

Sample response

😊👍

API request

python

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
from openai import OpenAI
client = OpenAI()

response = client.chat.completions.create(
  model="gpt-4o",
  messages=[\
    {\
      "role": "system",\
      "content": "You will be provided with a message, and your task is to respond using emojis only."\
    },\
    {\
      "role": "user",\
      "content": "How are you?"\
    }\
  ],
  temperature=0.8,
  max_tokens=256,
  top_p=1
)
```

```javascript
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [\
    {\
      "role": "system",\
      "content": "You will be provided with a message, and your task is to respond using emojis only."\
    },\
    {\
      "role": "user",\
      "content": "How are you?"\
    }\
  ],
  temperature: 0.8,
  max_tokens: 256,
  top_p: 1,
});
```

```bash
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
  "model": "gpt-4o",
  "messages": [\
    {\
      "role": "system",\
      "content": "You will be provided with a message, and your task is to respond using emojis only."\
    },\
    {\
      "role": "user",\
      "content": "How are you?"\
    }\
  ],
  "temperature": 0.8,
  "max_tokens": 256,
  "top_p": 1
}'
```

```json
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
{
  "model": "gpt-4o",
  "messages": [\
    {\
      "role": "system",\
      "content": "You will be provided with a message, and your task is to respond using emojis only."\
    },\
    {\
      "role": "user",\
      "content": "How are you?"\
    }\
  ],
  "temperature": 0.8,
  "max_tokens": 256,
  "top_p": 1
}
```Log in [Sign up](/signup)

Page not found

We couldn't find the page you were looking for.

Was this expected?Log in [Sign up](/signup)

# Models

Copy page

## Flagship models

[GPT-4o\\
\\
Our high-intelligence flagship model for complex, multi‑step tasks\\
\\
Text and image input, text output\\
\\
128k context length\\
\\
Smarter model, higher price per token](/docs/models#gpt-4o)

[GPT-4o mini\\
\\
Our affordable and intelligent small model for fast, lightweight tasks\\
\\
Text and image input, text output\\
\\
128k context length\\
\\
Faster model, lower price per token](/docs/models#gpt-4o-mini)

[o1-preview & o1-mini\\
\\
Beta\\
\\
A new series of reasoning models for solving hard problems\\
\\
Text input, text output\\
\\
128k context length\\
\\
Higher latency, uses tokens to think](/docs/models#o1)

[Model pricing details](https://openai.com/api/pricing)

## Models overview

The OpenAI API is powered by a diverse set of models with different capabilities and price points. You can also make customizations to our models for your specific use case with [fine-tuning](/docs/guides/fine-tuning).

| Model | Description |
| --- | --- |
| [GPT-4o](#gpt-4o) | Our high-intelligence flagship model for complex, multi-step tasks |
| [GPT-4o mini](#gpt-4o-mini) | Our affordable and intelligent small model for fast, lightweight tasks |
| [o1-preview and o1-mini](#o1) | Language models trained with reinforcement learning to perform complex reasoning. |
| [GPT-4 Turbo and GPT-4](#gpt-4-turbo-and-gpt-4) | The previous set of high-intelligence models |
| [GPT-3.5 Turbo](#gpt-3-5-turbo) | A fast, inexpensive model for simple tasks |
| [DALL·E](#dall-e) | A model that can generate and edit images given a natural language prompt |
| [TTS](#tts) | A set of models that can convert text into natural sounding spoken audio |
| [Whisper](#whisper) | A model that can convert audio into text |
| [Embeddings](#embeddings) | A set of models that can convert text into a numerical form |
| [Moderation](#moderation) | A fine-tuned model that can detect whether text may be sensitive or unsafe |
| [Deprecated](/docs/deprecations) | A full list of models that have been deprecated along with the suggested replacement |

For GPT-series models, the context window refers to the maximum number of tokens that can be used in a single request, inclusive of both input and output tokens.

We have also published open source models including [Point-E](https://github.com/openai/point-e), [Whisper](https://github.com/openai/whisper), [Jukebox](https://github.com/openai/jukebox), and [CLIP](https://github.com/openai/CLIP).

## Continuous model upgrades

`gpt-4o`, `gpt-4o-mini`, `gpt-4-turbo`, `gpt-4`, and `gpt-3.5-turbo` point to their respective latest model version. You can verify this by looking at the [response object](/docs/api-reference/chat/object) after sending a request. The response will include the specific model version used (e.g. `gpt-3.5-turbo-1106`). The `chatgpt-4o-latest` model version continuously points to the version of GPT-4o used in [ChatGPT](https://chatgpt.com), and is updated frequently, when there are significant changes. With the exception of `chatgpt-4o-latest`, we offer pinned model versions that developers can continue using for at least three months after an updated model has been introduced.

Learn more about model deprecation on our [deprecation page](/docs/deprecations).

## GPT-4o

GPT-4o (“o” for “omni”) is our most advanced GPT model. It is multimodal (accepting text or image inputs and outputting text), and it has the same high intelligence as GPT-4 Turbo but is much more efficient—it generates text 2x faster and is 50% cheaper. Additionally, GPT-4o has the best vision and performance across non-English languages of any of our models. GPT-4o is available in the OpenAI API to paying customers. Learn how to use GPT-4o in our [text generation guide](/docs/guides/text-generation).

| Model | Context window | Max output tokens | Knowledge cutoff |
| --- | --- | --- | --- |
| gpt-4o <br>Our high-intelligence flagship model for complex, multi-step tasks. GPT-4o is cheaper and faster than GPT-4 Turbo. Currently points to `gpt-4o-2024-08-06`. | 128,000 tokens | 16,384 tokens | Oct 2023 |
| gpt-4o-2024-11-20 <br>Latest `gpt-4o` snapshot from November 20th, 2024. | 128,000 tokens | 16,384 tokens | Oct 2023 |
| gpt-4o-2024-08-06 <br>First snapshot that supports [Structured Outputs](/docs/guides/structured-outputs). `gpt-4o` currently points to this version. | 128,000 tokens | 16,384 tokens | Oct 2023 |
| gpt-4o-2024-05-13 <br>Original `gpt-4o` snapshot from May 13, 2024. | 128,000 tokens | 4,096 tokens | Oct 2023 |
| chatgpt-4o-latest <br>The `chatgpt-4o-latest` model version continuously points to the version of GPT-4o used in ChatGPT, and is updated frequently, when there are significant changes. | 128,000 tokens | 16,384 tokens | Oct 2023 |

## GPT-4o mini

GPT-4o mini (“o” for “omni”) is our most advanced model in the small models category, and our cheapest model yet.
It is multimodal (accepting text or image inputs and outputting text), has higher intelligence than `gpt-3.5-turbo` but is just as fast.
It is meant to be used for smaller tasks, including vision tasks.

We recommend choosing `gpt-4o-mini` where you would have previously used `gpt-3.5-turbo` as this model is more capable and cheaper.

| Model | Context window | Max output tokens | Knowledge cutoff |
| --- | --- | --- | --- |
| gpt-4o-mini<br>Our affordable and intelligent small model for fast, lightweight tasks. GPT-4o mini is cheaper and more capable than GPT-3.5 Turbo. Currently points to `gpt-4o-mini-2024-07-18`. | 128,000 tokens | 16,384 tokens | Oct 2023 |
| gpt-4o-mini-2024-07-18<br>`gpt-4o-mini` currently points to this version. | 128,000 tokens | 16,384 tokens | Oct 2023 |

## GPT-4o Realtime + Audio     Beta

This is a preview release of the GPT-4o Realtime and Audio models. The `gpt-4o-realtime-*` models are capable of responding to audio and text inputs over a WebSocket interface. Learn more in the [Realtime API guide](/docs/guides/realtime). The `gpt-4o-audio-*` models below can be used in Chat Completions to [generate audio responses](/docs/guides/audio).

| Model | Context window | Max output tokens | Knowledge cutoff |
| --- | --- | --- | --- |
| gpt-4o-realtime-preview<br>Preview release for the [Realtime API](/docs/guides/realtime) | 128,000 tokens | 4,096 tokens | Oct 2023 |
| gpt-4o-realtime-preview-2024-10-01<br>Current snapshot for the Realtime API model. | 128,000 tokens | 4,096 tokens | Oct 2023 |
| gpt-4o-audio-preview<br>Preview release for [audio inputs in chat completions](/docs/guides/audio). | 128,000 tokens | 16,384 tokens | Oct 2023 |
| gpt-4o-audio-preview-2024-10-01<br>Current snapshot for the Audio API model. | 128,000 tokens | 16,384 tokens | Oct 2023 |

## o1-preview and o1-mini     Beta

The **o1 series** of large language models are trained with reinforcement
learning to perform complex reasoning. o1 models think before they answer,
producing a long internal chain of thought before responding to the user.

Learn about the capabilities and limitations of o1 models in our
[reasoning guide](/docs/guides/reasoning).

There are two model types available today:

- **o1-preview**: reasoning model designed to solve hard problems across domains.
- **o1-mini**: faster and cheaper reasoning model particularly good at coding, math, and science.

| Model | Context window | Max output tokens | Knowledge cutoff |
| --- | --- | --- | --- |
| o1-preview<br>Points to the most recent snapshot of the o1 model: `o1-preview-2024-09-12` | 128,000 tokens | 32,768 tokens | Oct 2023 |
| o1-preview-2024-09-12<br>Latest o1 model snapshot | 128,000 tokens | 32,768 tokens | Oct 2023 |
| o1-mini<br>Points to the most recent o1-mini snapshot: `o1-mini-2024-09-12` | 128,000 tokens | 65,536 tokens | Oct 2023 |
| o1-mini-2024-09-12<br>Latest o1-mini model snapshot | 128,000 tokens | 65,536 tokens | Oct 2023 |

## GPT-4 Turbo and GPT-4

GPT-4 is a large multimodal model (accepting text or image inputs and outputting text) that can solve difficult problems with greater accuracy than any of our previous models, thanks to its broader general knowledge and advanced reasoning capabilities. GPT-4 is available in the OpenAI API to [paying customers](https://help.openai.com/en/articles/7102672-how-can-i-access-gpt-4). Like `gpt-3.5-turbo`, GPT-4 is optimized for chat but works well for traditional completions tasks using the [Chat Completions API](/docs/api-reference/chat). Learn how to use GPT-4 in our [text generation guide](/docs/guides/text-generation).

| Model | Context window | Max output tokens | Knowledge cutoff |
| --- | --- | --- | --- |
| gpt-4-turbo<br>The latest GPT-4 Turbo model with vision capabilities. Vision requests can now use JSON mode and function calling. Currently points to `gpt-4-turbo-2024-04-09`. | 128,000 tokens | 4,096 tokens | Dec 2023 |
| gpt-4-turbo-2024-04-09<br>GPT-4 Turbo with Vision model. Vision requests can now use JSON mode and function calling. `gpt-4-turbo` currently points to this version. | 128,000 tokens | 4,096 tokens | Dec 2023 |
| gpt-4-turbo-preview<br>GPT-4 Turbo preview model. Currently points to `gpt-4-0125-preview`. | 128,000 tokens | 4,096 tokens | Dec 2023 |
| gpt-4-0125-preview<br>GPT-4 Turbo preview model intended to reduce cases of “laziness” where the model doesn’t complete a task. [Learn more](https://openai.com/blog/new-embedding-models-and-api-updates). | 128,000 tokens | 4,096 tokens | Dec 2023 |
| gpt-4-1106-preview<br>GPT-4 Turbo preview model featuring improved instruction following, JSON mode, reproducible outputs, parallel function calling, and more. This is a preview model. [Learn more](https://openai.com/blog/new-models-and-developer-products-announced-at-devday). | 128,000 tokens | 4,096 tokens | Apr 2023 |
| gpt-4<br>Currently points to `gpt-4-0613`. See [continuous model upgrades](#continuous-model-upgrades). | 8,192 tokens | 8,192 tokens | Sep 2021 |
| gpt-4-0613<br>Snapshot of `gpt-4` from June 13th 2023 with improved function calling support. | 8,192 tokens | 8,192 tokens | Sep 2021 |
| gpt-4-0314 <br>Legacy<br>Snapshot of `gpt-4` from March 14th 2023. | 8,192 tokens | 8,192 tokens | Sep 2021 |

For many basic tasks, the difference between GPT-4 and GPT-3.5 models is not significant. However, in more complex reasoning situations, GPT-4 is much more capable than any of our previous models.

#### Multilingual capabilities

GPT-4 [outperforms both previous large language models](https://cdn.openai.com/papers/gpt-4.pdf) and as of 2023, most state-of-the-art systems (which often have benchmark-specific training or hand-engineering). On the MMLU benchmark, an English-language suite of multiple-choice questions covering 57 subjects, GPT-4 not only outperforms existing models by a considerable margin in English, but also demonstrates strong performance in other languages.

## GPT-3.5 Turbo

GPT-3.5 Turbo models can understand and generate natural language or code and have been optimized for chat using the [Chat Completions API](/docs/api-reference/chat) but work well for non-chat tasks as well.

As of July 2024, `gpt-4o-mini` should be used in place of `gpt-3.5-turbo`, as it is cheaper, more capable, multimodal, and just as fast. `gpt-3.5-turbo` is still available for use in the API.

| Model | Context window | Max output tokens | Knowledge cutoff |
| --- | --- | --- | --- |
| gpt-3.5-turbo-0125<br>The latest GPT-3.5 Turbo model with higher accuracy at responding in requested formats and a fix for a bug which caused a text encoding issue for non-English language function calls. [Learn more](https://openai.com/blog/new-embedding-models-and-api-updates#:~:text=Other%20new%20models%20and%20lower%20pricing). | 16,385 tokens | 4,096 tokens | Sep 2021 |
| gpt-3.5-turbo<br>Currently points to `gpt-3.5-turbo-0125`. | 16,385 tokens | 4,096 tokens | Sep 2021 |
| gpt-3.5-turbo-1106<br>GPT-3.5 Turbo model with improved instruction following, JSON mode, reproducible outputs, parallel function calling, and more. [Learn more](https://openai.com/blog/new-models-and-developer-products-announced-at-devday). | 16,385 tokens | 4,096 tokens | Sep 2021 |
| gpt-3.5-turbo-instruct<br>Similar capabilities as GPT-3 era models. Compatible with legacy Completions endpoint and not Chat Completions. | 4,096 tokens | 4,096 tokens | Sep 2021 |

## DALL·E

DALL·E is a AI system that can create realistic images and art from a description in natural language. DALL·E 3 currently supports the ability, given a prompt, to create a new image with a specific size. DALL·E 2 also support the ability to edit an existing image, or create variations of a user provided image.

[DALL·E 3](https://openai.com/dall-e-3) is available through our [Images API](/docs/guides/images) along with [DALL·E 2](https://openai.com/blog/dall-e-api-now-available-in-public-beta). You can try DALL·E 3 through [ChatGPT Plus](https://chatgpt.com).

| Model | Description |
| --- | --- |
| `dall-e-3` | The latest DALL·E model released in Nov 2023. [Learn more](https://openai.com/blog/new-models-and-developer-products-announced-at-devday). |
| `dall-e-2` | The previous DALL·E model released in Nov 2022. The 2nd iteration of DALL·E with more realistic, accurate, and 4x greater resolution images than the original model. |

## TTS

TTS is an AI model that converts text to natural sounding spoken text. We offer two different model variates, `tts-1` is optimized for real time text to speech use cases and `tts-1-hd` is optimized for quality. These models can be used with the [Speech endpoint in the Audio API](/docs/guides/text-to-speech).

| Model | Description |
| --- | --- |
| `tts-1` | The latest text to speech model, optimized for speed. |
| `tts-1-hd` | The latest text to speech model, optimized for quality. |

## Whisper

Whisper is a general-purpose speech recognition model. It is trained on a large dataset of diverse audio and is also a multi-task model that can perform multilingual speech recognition as well as speech translation and language identification. The Whisper v2-large model is currently available through our API with the `whisper-1` model name.

Currently, there is no difference between the [open source version of Whisper](https://github.com/openai/whisper) and the version available through our API. However, [through our API](/docs/guides/speech-to-text), we offer an optimized inference process which makes running Whisper through our API much faster than doing it through other means. For more technical details on Whisper, you can [read the paper](https://arxiv.org/abs/2212.04356).

## Embeddings

Embeddings are a numerical representation of text that can be used to measure the relatedness between two pieces of text. Embeddings are useful for search, clustering, recommendations, anomaly detection, and classification tasks. You can read more about our latest embedding models in the [announcement blog post](https://openai.com/blog/new-embedding-models-and-api-updates).

| Model | Output Dimension |
| --- | --- |
| `text-embedding-3-large` <br>Most capable embedding model for both english and non-english tasks | 3,072 |
| `text-embedding-3-small` <br>Increased performance over 2nd generation ada embedding model | 1,536 |
| `text-embedding-ada-002` <br>Most capable 2nd generation embedding model, replacing 16 first generation models | 1,536 |

* * *

## Moderation

The Moderation models are designed to check whether content complies with OpenAI's [usage policies](https://openai.com/policies/usage-policies). The models provide classification capabilities that look for content in categories like hate, self-harm, sexual content, violence, and others. Learn more about moderating text and images in our [moderation guide](/docs/guides/moderation).

| Model | Max tokens |
| --- | --- |
| `omni-moderation-latest` <br>Currently points to `omni-moderation-2024-09-26`. | 32,768 |
| `omni-moderation-2024-09-26` <br>Latest pinned version of our new multi-modal moderation model, capable of analyzing both text and images. | 32,768 |
| `text-moderation-latest` <br>Currently points to `text-moderation-007`. | 32,768 |
| `text-moderation-stable` <br>Currently points to `text-moderation-007`. | 32,768 |
| `text-moderation-007` <br>Previous generation text-only moderation. We expect `omni-moderation-*` models to be the best default moving forward. | 32,768 |

## GPT base

GPT base models can understand and generate natural language or code but are not trained with instruction following. These models are made to be replacements for our original GPT-3 base models and use the legacy Completions API. Most customers should use GPT-3.5 or GPT-4.

| Model | Max tokens | Knowledge cutoff |
| --- | --- | --- |
| `babbage-002` <br>Replacement for the GPT-3 `ada` and `babbage` base models. | 16,384 tokens | Sep 2021 |
| `davinci-002` <br>Replacement for the GPT-3 `curie` and `davinci` base models. | 16,384 tokens | Sep 2021 |

## How we use your data

Your data is your data.

As of March 1, 2023, data sent to the OpenAI API will not be used to train or improve OpenAI models (unless you explicitly opt-in to share data with us, such as by [providing feedback in the Playground](https://help.openai.com/en/articles/9883556-providing-feedback-in-the-api-playground)). One advantage to opting in is that the models may get better at your use case over time.

To help identify abuse, API data may be retained for up to 30 days, after which it will be deleted (unless otherwise required by law). For trusted customers with sensitive applications, zero data retention may be available. With zero data retention, request and response bodies are not persisted to any logging mechanism and exist only in memory in order to serve the request.

Note that this data policy does not apply to OpenAI's non-API consumer services like [ChatGPT](https://chatgpt.com/) or [DALL·E Labs](https://labs.openai.com/).

### Default usage policies by endpoint

| Endpoint | Data used for training | Default retention | Eligible for zero retention |
| --- | --- | --- | --- |
| `/v1/chat/completions`\* | No | 30 days | Yes, except (a) image inputs, (b) schemas provided for Structured Outputs, or (c) audio outputs. \* |
| `/v1/assistants` | No | 30 days \*\* | No |
| `/v1/threads` | No | 30 days \*\* | No |
| `/v1/threads/messages` | No | 30 days \*\* | No |
| `/v1/threads/runs` | No | 30 days \*\* | No |
| `/v1/vector_stores` | No | 30 days \*\* | No |
| `/v1/threads/runs/steps` | No | 30 days \*\* | No |
| `/v1/images/generations` | No | 30 days | No |
| `/v1/images/edits` | No | 30 days | No |
| `/v1/images/variations` | No | 30 days | No |
| `/v1/embeddings` | No | 30 days | Yes |
| `/v1/audio/transcriptions` | No | Zero data retention | - |
| `/v1/audio/translations` | No | Zero data retention | - |
| `/v1/audio/speech` | No | 30 days | Yes |
| `/v1/files` | No | Until deleted by customer | No |
| `/v1/fine_tuning/jobs` | No | Until deleted by customer | No |
| `/v1/batches` | No | Until deleted by customer | No |
| `/v1/moderations` | No | Zero data retention | - |
| `/v1/completions` | No | 30 days | Yes |
| `/v1/realtime` (beta) | No | 30 days | Yes |

**\\* Chat Completions:**

- Image inputs via the `gpt-4o`, `gpt-4o-mini`, `chatgpt-4o-latest`, or `gpt-4-turbo` models (or previously `gpt-4-vision-preview`) are not eligible for zero retention.
- Audio outputs are stored for 1 hour to enable [multi-turn conversations](/docs/guides/audio), and are not currently eligible for zero retention.
- When Structured Outputs is enabled, schemas provided (either as the `response_format` or in the function definition) are not eligible for zero retention, though the completions themselves are.
- When using Stored Completions via the `store: true` option in the API, those completions are stored for 30 days. Completions are stored in an unfiltered form after an API response, so please avoid storing completions that contain sensitive data.

**\\*\\* Assistants API:**

- Objects related to the Assistants API are deleted from our servers 30 days after you delete them via the API or the dashboard. Objects that are not deleted via the API or dashboard are retained indefinitely.

**Evaluations:**

- [Evaluation](/evaluations) data: When you create an evaluation, the data related to that evaluation is deleted from our servers 30 days after you delete it via the dashboard. Evaluation data that is not deleted via the dashboard is retained indefinitely.

For details, see our [API data usage policies](https://openai.com/policies/api-data-usage-policies). To learn more about zero retention, get in touch with our [sales team](https://openai.com/contact-sales).

## Model endpoint compatibility

| Endpoint | Latest models |
| --- | --- |
| /v1/assistants | All GPT-4o (except `chatgpt-4o-latest`), GPT-4o-mini, GPT-4, and GPT-3.5 Turbo models. The `retrieval` tool requires `gpt-4-turbo-preview` (and subsequent dated model releases) or `gpt-3.5-turbo-1106` (and subsequent versions). |
| /v1/audio/transcriptions | `whisper-1` |
| /v1/audio/translations | `whisper-1` |
| /v1/audio/speech | `tts-1`,  `tts-1-hd` |
| /v1/chat/completions | All GPT-4o (except for Realtime preview), GPT-4o-mini, GPT-4, and GPT-3.5 Turbo models and their dated releases. `chatgpt-4o-latest` dynamic model. [Fine-tuned](/docs/guides/fine-tuning) versions of `gpt-4o`,  `gpt-4o-mini`,  `gpt-4`,  and `gpt-3.5-turbo`. |
| /v1/completions (Legacy) | `gpt-3.5-turbo-instruct`,  `babbage-002`,  `davinci-002` |
| /v1/embeddings | `text-embedding-3-small`,  `text-embedding-3-large`,  `text-embedding-ada-002` |
| /v1/fine\_tuning/jobs | `gpt-4o`,  `gpt-4o-mini`,  `gpt-4`,  `gpt-3.5-turbo` |
| /v1/moderations | `text-moderation-stable`,  `text-moderation-latest` |
| /v1/images/generations | `dall-e-2`,  `dall-e-3` |
| /v1/realtime (beta) | `gpt-4o-realtime-preview`, `gpt-4o-realtime-preview-2024-10-01` |

This list excludes all of our [deprecated models](/docs/deprecations).Log in [Sign up](/signup)

Authentication required

Please log in to access this page

Log inSign upLog in [Sign up](/signup)

Page not found

We couldn't find the page you were looking for.

Was this expected?Log in [Sign up](/signup)

# Prompt examples

Explore what's possible with some example prompts

All categories

Grammar correction

Convert ungrammatical statements into standard English.

Summarize for a 2nd grader

Simplify text to a level appropriate for a second-grade student.

Parse unstructured data

Create tables from unstructured text.

Emoji Translation

Translate regular text into emoji text.

Calculate time complexity

Find the time complexity of a function.

Explain code

Explain a complicated piece of code.

Keywords

Extract keywords from a block of text.

Product name generator

Generate product names from a description and seed words.

Python bug fixer

Find and fix bugs in source code.

Spreadsheet creator

Create spreadsheets of various kinds of data.

Tweet classifier

Detect sentiment in a tweet.

Airport code extractor

Extract airport codes from text.

Mood to color

Turn a text description into a color.

VR fitness idea generator

Generate ideas for fitness promoting virtual reality games.

Marv the sarcastic chat bot

Marv is a factual chatbot that is also sarcastic.

Turn by turn directions

Convert natural language to turn-by-turn directions.

Interview questions

Create interview questions.

Function from specification

Create a Python function from a specification.

Improve code efficiency

Provide ideas for efficiency improvements to Python code.

Single page website creator

Create a single page website.

Rap battle writer

Generate a rap battle between two characters.

Memo writer

Generate a company memo based on provided points.

Emoji chatbot

Generate conversational replies using emojis only.

Translation

Translate natural language text.

Socratic tutor

Generate responses as a Socratic tutor.

Natural language to SQL

Convert natural language into SQL queries.

Meeting notes summarizer

Summarize meeting notes including overall discussion, action items, and future topics.

Review classifier

Classify user reviews based on a set of tags.

Pro and con discusser

Analyze the pros and cons of a given topic.

Lesson plan writer

Generate a lesson plan for a specific topic.

Tweet classifier

Extract

Natural Language

Detect sentiment in a tweet.

Prompt

SYSTEM

You will be provided with a tweet, and your task is to classify its sentiment as positive, neutral, or negative.

USER

I loved the new Batman movie!

Sample response

positive

API request

python

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
from openai import OpenAI
client = OpenAI()

response = client.chat.completions.create(
  model="gpt-4o",
  messages=[\
    {\
      "role": "system",\
      "content": "You will be provided with a tweet, and your task is to classify its sentiment as positive, neutral, or negative."\
    },\
    {\
      "role": "user",\
      "content": "I loved the new Batman movie!"\
    }\
  ],
  temperature=1,
  max_tokens=256,
  top_p=1
)
```

```javascript
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [\
    {\
      "role": "system",\
      "content": "You will be provided with a tweet, and your task is to classify its sentiment as positive, neutral, or negative."\
    },\
    {\
      "role": "user",\
      "content": "I loved the new Batman movie!"\
    }\
  ],
  temperature: 1,
  max_tokens: 256,
  top_p: 1,
});
```

```bash
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
  "model": "gpt-4o",
  "messages": [\
    {\
      "role": "system",\
      "content": "You will be provided with a tweet, and your task is to classify its sentiment as positive, neutral, or negative."\
    },\
    {\
      "role": "user",\
      "content": "I loved the new Batman movie!"\
    }\
  ],
  "temperature": 1,
  "max_tokens": 256,
  "top_p": 1
}'
```

```json
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
{
  "model": "gpt-4o",
  "messages": [\
    {\
      "role": "system",\
      "content": "You will be provided with a tweet, and your task is to classify its sentiment as positive, neutral, or negative."\
    },\
    {\
      "role": "user",\
      "content": "I loved the new Batman movie!"\
    }\
  ],
  "temperature": 1,
  "max_tokens": 256,
  "top_p": 1
}
```Log in [Sign up](/signup)

# Developer quickstart

Copy page

Learn how to make your first API request.

The OpenAI API provides a simple interface to state-of-the-art AI [models](/docs/models) for natural language processing, image generation, semantic search, and speech recognition. Follow this guide to learn how to generate human-like responses to [natural language prompts](/docs/guides/text-generation), [create vector embeddings](/docs/guides/embeddings) for semantic search, and [generate images](/docs/guides/images) from textual descriptions.

## Create and export an API key

[Create an API key in the dashboard here](/api-keys), which you’ll use to securely [access the API](/docs/api-reference/authentication). Store the key in a safe location, like a [`.zshrc` file](https://www.freecodecamp.org/news/how-do-zsh-configuration-files-work/) or another text file on your computer. Once you’ve generated an API key, export it as an [environment variable](https://en.wikipedia.org/wiki/Environment_variable) in your terminal.

macOS / LinuxWindows

macOS / Linux

Export an environment variable on macOS or Linux systems

```bash
1
export OPENAI_API_KEY="your_api_key_here"
```

Windows

Export an environment variable in PowerShell

```bash
1
setx OPENAI_API_KEY "your_api_key_here"
```

## Make your first API request

With your OpenAI API key exported as an environment variable, you're ready to make your first API request. You can either use the [REST API](/docs/api-reference) directly with the HTTP client of your choice, or use one of our [official SDKs](/docs/libraries) as shown below.

JavaScriptPythoncurl

JavaScript

To use the OpenAI API in server-side JavaScript environments like Node.js, Deno, or Bun, you can use the official [OpenAI SDK for TypeScript and JavaScript](https://github.com/openai/openai-node). Get started by installing the SDK using [npm](https://www.npmjs.com/) or your preferred package manager:

Install the OpenAI SDK with npm

```bash
1
npm install openai
```

With the OpenAI SDK installed, create a file called `example.mjs` and copy one of the following examples into it:

Generate textGenerate an imageCreate vector embeddings

Generate text

Create a human-like response to a prompt

```javascript
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
import OpenAI from "openai";
const openai = new OpenAI();

const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [\
        { role: "system", content: "You are a helpful assistant." },\
        {\
            role: "user",\
            content: "Write a haiku about recursion in programming.",\
        },\
    ],
});

console.log(completion.choices[0].message);
```

Generate an image

Generate an image based on a textual prompt

```javascript
1
2
3
4
5
6
import OpenAI from "openai";
const openai = new OpenAI();

const image = await openai.images.generate({ prompt: "A cute baby sea otter" });

console.log(image.data[0].url);
```

Create vector embeddings

Create vector embeddings for a string of text

```javascript
1
2
3
4
5
6
7
8
9
import OpenAI from "openai";
const openai = new OpenAI();

const embedding = await openai.embeddings.create({
    model: "text-embedding-3-large",
    input: "The quick brown fox jumped over the lazy dog",
});

console.log(embedding);
```

Execute the code with `node example.mjs` (or the equivalent command for Deno or Bun). In a few moments, you should see the output of your API request!

Python

To use the OpenAI API in Python, you can use the official [OpenAI SDK for Python](https://github.com/openai/openai-python). Get started by installing the SDK using [pip](https://pypi.org/project/pip/):

Install the OpenAI SDK with pip

```bash
1
pip install openai
```

With the OpenAI SDK installed, create a file called `example.py` and copy one of the following examples into it:

Generate textGenerate an imageCreate vector embeddings

Generate text

Create a human-like response to a prompt

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
from openai import OpenAI
client = OpenAI()

completion = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[\
        {"role": "system", "content": "You are a helpful assistant."},\
        {\
            "role": "user",\
            "content": "Write a haiku about recursion in programming."\
        }\
    ]
)

print(completion.choices[0].message)
```

Generate an image

Generate an image based on a textual prompt

```python
1
2
3
4
5
6
7
8
9
10
from openai import OpenAI
client = OpenAI()

response = client.images.generate(
    prompt="A cute baby sea otter",
    n=2,
    size="1024x1024"
)

print(response.data[0].url)
```

Create vector embeddings

Create vector embeddings for a string of text

```python
1
2
3
4
5
6
7
8
9
from openai import OpenAI
client = OpenAI()

response = client.embeddings.create(
    model="text-embedding-3-large",
    input="The food was delicious and the waiter..."
)

print(response)
```

Execute the code with `python example.py`. In a few moments, you should see the output of your API request!

curl

On Unix-based systems, you can test out the [OpenAI REST API](/docs/api-reference) using [curl](https://curl.se/). The following commands assume that you have exported the `OPENAI_API_KEY` system environment variable as shown above.

Generate textGenerate an imageCreate vector embeddings

Generate text

Create a human-like response to a prompt

```bash
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
curl "https://api.openai.com/v1/chat/completions" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
        "model": "gpt-4o-mini",
        "messages": [\
            {\
                "role": "system",\
                "content": "You are a helpful assistant."\
            },\
            {\
                "role": "user",\
                "content": "Write a haiku that explains the concept of recursion."\
            }\
        ]
    }'
```

Generate an image

Generate an image based on a textual prompt

```bash
1
2
3
4
5
6
7
8
curl "https://api.openai.com/v1/images/generations" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
        "prompt": "A cute baby sea otter",
        "n": 2,
        "size": "1024x1024"
    }'
```

Create vector embeddings

Create vector embeddings for a string of text

```bash
1
2
3
4
5
6
7
curl "https://api.openai.com/v1/embeddings" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $OPENAI_API_KEY" \
    -d '{
        "input": "The food was delicious and the waiter...",
        "model": "text-embedding-3-large"
    }'
```

Execute the curl commands above in your terminal. In a few moments, you should see the output of your API request!

## Next steps

Now that you've made your first OpenAI API request, you can explore the following resources:

[Chat Completions\\
\\
Learn more about generating text responses to natural language prompts](/docs/guides/text-generation) [Image Generation\\
\\
Generate images using our DALL·E model](/docs/guides/images) [Embeddings\\
\\
Create vector representations of text, used for similarity search](/docs/guides/embeddings) [Text-to-speech\\
\\
Generate human-like voice recordings with our text-to-speech model](/docs/guides/text-to-speech) [Speech-to-text\\
\\
Create transcriptions of voice recordings with our Whisper model](/docs/guides/speech-to-text) [Moderation\\
\\
Analyze and filter user-created content with our moderation model](/docs/guides/moderation) [Fine-tuning\\
\\
Fine-tune our models with your own data](/docs/guides/fine-tuning) [Batch\\
\\
Batch requests for async jobs](/docs/guides/batch) [Full API Reference\\
\\
View the full REST API reference for OpenAI](/docs/api-reference)Log in [Sign up](/signup)

# Models

Copy page

## Flagship models

[GPT-4o\\
\\
Our high-intelligence flagship model for complex, multi‑step tasks\\
\\
Text and image input, text output\\
\\
128k context length\\
\\
Smarter model, higher price per token](/docs/models#gpt-4o)

[GPT-4o mini\\
\\
Our affordable and intelligent small model for fast, lightweight tasks\\
\\
Text and image input, text output\\
\\
128k context length\\
\\
Faster model, lower price per token](/docs/models#gpt-4o-mini)

[o1-preview & o1-mini\\
\\
Beta\\
\\
A new series of reasoning models for solving hard problems\\
\\
Text input, text output\\
\\
128k context length\\
\\
Higher latency, uses tokens to think](/docs/models#o1)

[Model pricing details](https://openai.com/api/pricing)

## Models overview

The OpenAI API is powered by a diverse set of models with different capabilities and price points. You can also make customizations to our models for your specific use case with [fine-tuning](/docs/guides/fine-tuning).

| Model | Description |
| --- | --- |
| [GPT-4o](#gpt-4o) | Our high-intelligence flagship model for complex, multi-step tasks |
| [GPT-4o mini](#gpt-4o-mini) | Our affordable and intelligent small model for fast, lightweight tasks |
| [o1-preview and o1-mini](#o1) | Language models trained with reinforcement learning to perform complex reasoning. |
| [GPT-4 Turbo and GPT-4](#gpt-4-turbo-and-gpt-4) | The previous set of high-intelligence models |
| [GPT-3.5 Turbo](#gpt-3-5-turbo) | A fast, inexpensive model for simple tasks |
| [DALL·E](#dall-e) | A model that can generate and edit images given a natural language prompt |
| [TTS](#tts) | A set of models that can convert text into natural sounding spoken audio |
| [Whisper](#whisper) | A model that can convert audio into text |
| [Embeddings](#embeddings) | A set of models that can convert text into a numerical form |
| [Moderation](#moderation) | A fine-tuned model that can detect whether text may be sensitive or unsafe |
| [Deprecated](/docs/deprecations) | A full list of models that have been deprecated along with the suggested replacement |

For GPT-series models, the context window refers to the maximum number of tokens that can be used in a single request, inclusive of both input and output tokens.

We have also published open source models including [Point-E](https://github.com/openai/point-e), [Whisper](https://github.com/openai/whisper), [Jukebox](https://github.com/openai/jukebox), and [CLIP](https://github.com/openai/CLIP).

## Continuous model upgrades

`gpt-4o`, `gpt-4o-mini`, `gpt-4-turbo`, `gpt-4`, and `gpt-3.5-turbo` point to their respective latest model version. You can verify this by looking at the [response object](/docs/api-reference/chat/object) after sending a request. The response will include the specific model version used (e.g. `gpt-3.5-turbo-1106`). The `chatgpt-4o-latest` model version continuously points to the version of GPT-4o used in [ChatGPT](https://chatgpt.com), and is updated frequently, when there are significant changes. With the exception of `chatgpt-4o-latest`, we offer pinned model versions that developers can continue using for at least three months after an updated model has been introduced.

Learn more about model deprecation on our [deprecation page](/docs/deprecations).

## GPT-4o

GPT-4o (“o” for “omni”) is our most advanced GPT model. It is multimodal (accepting text or image inputs and outputting text), and it has the same high intelligence as GPT-4 Turbo but is much more efficient—it generates text 2x faster and is 50% cheaper. Additionally, GPT-4o has the best vision and performance across non-English languages of any of our models. GPT-4o is available in the OpenAI API to paying customers. Learn how to use GPT-4o in our [text generation guide](/docs/guides/text-generation).

| Model | Context window | Max output tokens | Knowledge cutoff |
| --- | --- | --- | --- |
| gpt-4o <br>Our high-intelligence flagship model for complex, multi-step tasks. GPT-4o is cheaper and faster than GPT-4 Turbo. Currently points to `gpt-4o-2024-08-06`. | 128,000 tokens | 16,384 tokens | Oct 2023 |
| gpt-4o-2024-11-20 <br>Latest `gpt-4o` snapshot from November 20th, 2024. | 128,000 tokens | 16,384 tokens | Oct 2023 |
| gpt-4o-2024-08-06 <br>First snapshot that supports [Structured Outputs](/docs/guides/structured-outputs). `gpt-4o` currently points to this version. | 128,000 tokens | 16,384 tokens | Oct 2023 |
| gpt-4o-2024-05-13 <br>Original `gpt-4o` snapshot from May 13, 2024. | 128,000 tokens | 4,096 tokens | Oct 2023 |
| chatgpt-4o-latest <br>The `chatgpt-4o-latest` model version continuously points to the version of GPT-4o used in ChatGPT, and is updated frequently, when there are significant changes. | 128,000 tokens | 16,384 tokens | Oct 2023 |

## GPT-4o mini

GPT-4o mini (“o” for “omni”) is our most advanced model in the small models category, and our cheapest model yet.
It is multimodal (accepting text or image inputs and outputting text), has higher intelligence than `gpt-3.5-turbo` but is just as fast.
It is meant to be used for smaller tasks, including vision tasks.

We recommend choosing `gpt-4o-mini` where you would have previously used `gpt-3.5-turbo` as this model is more capable and cheaper.

| Model | Context window | Max output tokens | Knowledge cutoff |
| --- | --- | --- | --- |
| gpt-4o-mini<br>Our affordable and intelligent small model for fast, lightweight tasks. GPT-4o mini is cheaper and more capable than GPT-3.5 Turbo. Currently points to `gpt-4o-mini-2024-07-18`. | 128,000 tokens | 16,384 tokens | Oct 2023 |
| gpt-4o-mini-2024-07-18<br>`gpt-4o-mini` currently points to this version. | 128,000 tokens | 16,384 tokens | Oct 2023 |

## GPT-4o Realtime + Audio     Beta

This is a preview release of the GPT-4o Realtime and Audio models. The `gpt-4o-realtime-*` models are capable of responding to audio and text inputs over a WebSocket interface. Learn more in the [Realtime API guide](/docs/guides/realtime). The `gpt-4o-audio-*` models below can be used in Chat Completions to [generate audio responses](/docs/guides/audio).

| Model | Context window | Max output tokens | Knowledge cutoff |
| --- | --- | --- | --- |
| gpt-4o-realtime-preview<br>Preview release for the [Realtime API](/docs/guides/realtime) | 128,000 tokens | 4,096 tokens | Oct 2023 |
| gpt-4o-realtime-preview-2024-10-01<br>Current snapshot for the Realtime API model. | 128,000 tokens | 4,096 tokens | Oct 2023 |
| gpt-4o-audio-preview<br>Preview release for [audio inputs in chat completions](/docs/guides/audio). | 128,000 tokens | 16,384 tokens | Oct 2023 |
| gpt-4o-audio-preview-2024-10-01<br>Current snapshot for the Audio API model. | 128,000 tokens | 16,384 tokens | Oct 2023 |

## o1-preview and o1-mini     Beta

The **o1 series** of large language models are trained with reinforcement
learning to perform complex reasoning. o1 models think before they answer,
producing a long internal chain of thought before responding to the user.

Learn about the capabilities and limitations of o1 models in our
[reasoning guide](/docs/guides/reasoning).

There are two model types available today:

- **o1-preview**: reasoning model designed to solve hard problems across domains.
- **o1-mini**: faster and cheaper reasoning model particularly good at coding, math, and science.

| Model | Context window | Max output tokens | Knowledge cutoff |
| --- | --- | --- | --- |
| o1-preview<br>Points to the most recent snapshot of the o1 model: `o1-preview-2024-09-12` | 128,000 tokens | 32,768 tokens | Oct 2023 |
| o1-preview-2024-09-12<br>Latest o1 model snapshot | 128,000 tokens | 32,768 tokens | Oct 2023 |
| o1-mini<br>Points to the most recent o1-mini snapshot: `o1-mini-2024-09-12` | 128,000 tokens | 65,536 tokens | Oct 2023 |
| o1-mini-2024-09-12<br>Latest o1-mini model snapshot | 128,000 tokens | 65,536 tokens | Oct 2023 |

## GPT-4 Turbo and GPT-4

GPT-4 is a large multimodal model (accepting text or image inputs and outputting text) that can solve difficult problems with greater accuracy than any of our previous models, thanks to its broader general knowledge and advanced reasoning capabilities. GPT-4 is available in the OpenAI API to [paying customers](https://help.openai.com/en/articles/7102672-how-can-i-access-gpt-4). Like `gpt-3.5-turbo`, GPT-4 is optimized for chat but works well for traditional completions tasks using the [Chat Completions API](/docs/api-reference/chat). Learn how to use GPT-4 in our [text generation guide](/docs/guides/text-generation).

| Model | Context window | Max output tokens | Knowledge cutoff |
| --- | --- | --- | --- |
| gpt-4-turbo<br>The latest GPT-4 Turbo model with vision capabilities. Vision requests can now use JSON mode and function calling. Currently points to `gpt-4-turbo-2024-04-09`. | 128,000 tokens | 4,096 tokens | Dec 2023 |
| gpt-4-turbo-2024-04-09<br>GPT-4 Turbo with Vision model. Vision requests can now use JSON mode and function calling. `gpt-4-turbo` currently points to this version. | 128,000 tokens | 4,096 tokens | Dec 2023 |
| gpt-4-turbo-preview<br>GPT-4 Turbo preview model. Currently points to `gpt-4-0125-preview`. | 128,000 tokens | 4,096 tokens | Dec 2023 |
| gpt-4-0125-preview<br>GPT-4 Turbo preview model intended to reduce cases of “laziness” where the model doesn’t complete a task. [Learn more](https://openai.com/blog/new-embedding-models-and-api-updates). | 128,000 tokens | 4,096 tokens | Dec 2023 |
| gpt-4-1106-preview<br>GPT-4 Turbo preview model featuring improved instruction following, JSON mode, reproducible outputs, parallel function calling, and more. This is a preview model. [Learn more](https://openai.com/blog/new-models-and-developer-products-announced-at-devday). | 128,000 tokens | 4,096 tokens | Apr 2023 |
| gpt-4<br>Currently points to `gpt-4-0613`. See [continuous model upgrades](#continuous-model-upgrades). | 8,192 tokens | 8,192 tokens | Sep 2021 |
| gpt-4-0613<br>Snapshot of `gpt-4` from June 13th 2023 with improved function calling support. | 8,192 tokens | 8,192 tokens | Sep 2021 |
| gpt-4-0314 <br>Legacy<br>Snapshot of `gpt-4` from March 14th 2023. | 8,192 tokens | 8,192 tokens | Sep 2021 |

For many basic tasks, the difference between GPT-4 and GPT-3.5 models is not significant. However, in more complex reasoning situations, GPT-4 is much more capable than any of our previous models.

#### Multilingual capabilities

GPT-4 [outperforms both previous large language models](https://cdn.openai.com/papers/gpt-4.pdf) and as of 2023, most state-of-the-art systems (which often have benchmark-specific training or hand-engineering). On the MMLU benchmark, an English-language suite of multiple-choice questions covering 57 subjects, GPT-4 not only outperforms existing models by a considerable margin in English, but also demonstrates strong performance in other languages.

## GPT-3.5 Turbo

GPT-3.5 Turbo models can understand and generate natural language or code and have been optimized for chat using the [Chat Completions API](/docs/api-reference/chat) but work well for non-chat tasks as well.

As of July 2024, `gpt-4o-mini` should be used in place of `gpt-3.5-turbo`, as it is cheaper, more capable, multimodal, and just as fast. `gpt-3.5-turbo` is still available for use in the API.

| Model | Context window | Max output tokens | Knowledge cutoff |
| --- | --- | --- | --- |
| gpt-3.5-turbo-0125<br>The latest GPT-3.5 Turbo model with higher accuracy at responding in requested formats and a fix for a bug which caused a text encoding issue for non-English language function calls. [Learn more](https://openai.com/blog/new-embedding-models-and-api-updates#:~:text=Other%20new%20models%20and%20lower%20pricing). | 16,385 tokens | 4,096 tokens | Sep 2021 |
| gpt-3.5-turbo<br>Currently points to `gpt-3.5-turbo-0125`. | 16,385 tokens | 4,096 tokens | Sep 2021 |
| gpt-3.5-turbo-1106<br>GPT-3.5 Turbo model with improved instruction following, JSON mode, reproducible outputs, parallel function calling, and more. [Learn more](https://openai.com/blog/new-models-and-developer-products-announced-at-devday). | 16,385 tokens | 4,096 tokens | Sep 2021 |
| gpt-3.5-turbo-instruct<br>Similar capabilities as GPT-3 era models. Compatible with legacy Completions endpoint and not Chat Completions. | 4,096 tokens | 4,096 tokens | Sep 2021 |

## DALL·E

DALL·E is a AI system that can create realistic images and art from a description in natural language. DALL·E 3 currently supports the ability, given a prompt, to create a new image with a specific size. DALL·E 2 also support the ability to edit an existing image, or create variations of a user provided image.

[DALL·E 3](https://openai.com/dall-e-3) is available through our [Images API](/docs/guides/images) along with [DALL·E 2](https://openai.com/blog/dall-e-api-now-available-in-public-beta). You can try DALL·E 3 through [ChatGPT Plus](https://chatgpt.com).

| Model | Description |
| --- | --- |
| `dall-e-3` | The latest DALL·E model released in Nov 2023. [Learn more](https://openai.com/blog/new-models-and-developer-products-announced-at-devday). |
| `dall-e-2` | The previous DALL·E model released in Nov 2022. The 2nd iteration of DALL·E with more realistic, accurate, and 4x greater resolution images than the original model. |

## TTS

TTS is an AI model that converts text to natural sounding spoken text. We offer two different model variates, `tts-1` is optimized for real time text to speech use cases and `tts-1-hd` is optimized for quality. These models can be used with the [Speech endpoint in the Audio API](/docs/guides/text-to-speech).

| Model | Description |
| --- | --- |
| `tts-1` | The latest text to speech model, optimized for speed. |
| `tts-1-hd` | The latest text to speech model, optimized for quality. |

## Whisper

Whisper is a general-purpose speech recognition model. It is trained on a large dataset of diverse audio and is also a multi-task model that can perform multilingual speech recognition as well as speech translation and language identification. The Whisper v2-large model is currently available through our API with the `whisper-1` model name.

Currently, there is no difference between the [open source version of Whisper](https://github.com/openai/whisper) and the version available through our API. However, [through our API](/docs/guides/speech-to-text), we offer an optimized inference process which makes running Whisper through our API much faster than doing it through other means. For more technical details on Whisper, you can [read the paper](https://arxiv.org/abs/2212.04356).

## Embeddings

Embeddings are a numerical representation of text that can be used to measure the relatedness between two pieces of text. Embeddings are useful for search, clustering, recommendations, anomaly detection, and classification tasks. You can read more about our latest embedding models in the [announcement blog post](https://openai.com/blog/new-embedding-models-and-api-updates).

| Model | Output Dimension |
| --- | --- |
| `text-embedding-3-large` <br>Most capable embedding model for both english and non-english tasks | 3,072 |
| `text-embedding-3-small` <br>Increased performance over 2nd generation ada embedding model | 1,536 |
| `text-embedding-ada-002` <br>Most capable 2nd generation embedding model, replacing 16 first generation models | 1,536 |

* * *

## Moderation

The Moderation models are designed to check whether content complies with OpenAI's [usage policies](https://openai.com/policies/usage-policies). The models provide classification capabilities that look for content in categories like hate, self-harm, sexual content, violence, and others. Learn more about moderating text and images in our [moderation guide](/docs/guides/moderation).

| Model | Max tokens |
| --- | --- |
| `omni-moderation-latest` <br>Currently points to `omni-moderation-2024-09-26`. | 32,768 |
| `omni-moderation-2024-09-26` <br>Latest pinned version of our new multi-modal moderation model, capable of analyzing both text and images. | 32,768 |
| `text-moderation-latest` <br>Currently points to `text-moderation-007`. | 32,768 |
| `text-moderation-stable` <br>Currently points to `text-moderation-007`. | 32,768 |
| `text-moderation-007` <br>Previous generation text-only moderation. We expect `omni-moderation-*` models to be the best default moving forward. | 32,768 |

## GPT base

GPT base models can understand and generate natural language or code but are not trained with instruction following. These models are made to be replacements for our original GPT-3 base models and use the legacy Completions API. Most customers should use GPT-3.5 or GPT-4.

| Model | Max tokens | Knowledge cutoff |
| --- | --- | --- |
| `babbage-002` <br>Replacement for the GPT-3 `ada` and `babbage` base models. | 16,384 tokens | Sep 2021 |
| `davinci-002` <br>Replacement for the GPT-3 `curie` and `davinci` base models. | 16,384 tokens | Sep 2021 |

## How we use your data

Your data is your data.

As of March 1, 2023, data sent to the OpenAI API will not be used to train or improve OpenAI models (unless you explicitly opt-in to share data with us, such as by [providing feedback in the Playground](https://help.openai.com/en/articles/9883556-providing-feedback-in-the-api-playground)). One advantage to opting in is that the models may get better at your use case over time.

To help identify abuse, API data may be retained for up to 30 days, after which it will be deleted (unless otherwise required by law). For trusted customers with sensitive applications, zero data retention may be available. With zero data retention, request and response bodies are not persisted to any logging mechanism and exist only in memory in order to serve the request.

Note that this data policy does not apply to OpenAI's non-API consumer services like [ChatGPT](https://chatgpt.com/) or [DALL·E Labs](https://labs.openai.com/).

### Default usage policies by endpoint

| Endpoint | Data used for training | Default retention | Eligible for zero retention |
| --- | --- | --- | --- |
| `/v1/chat/completions`\* | No | 30 days | Yes, except (a) image inputs, (b) schemas provided for Structured Outputs, or (c) audio outputs. \* |
| `/v1/assistants` | No | 30 days \*\* | No |
| `/v1/threads` | No | 30 days \*\* | No |
| `/v1/threads/messages` | No | 30 days \*\* | No |
| `/v1/threads/runs` | No | 30 days \*\* | No |
| `/v1/vector_stores` | No | 30 days \*\* | No |
| `/v1/threads/runs/steps` | No | 30 days \*\* | No |
| `/v1/images/generations` | No | 30 days | No |
| `/v1/images/edits` | No | 30 days | No |
| `/v1/images/variations` | No | 30 days | No |
| `/v1/embeddings` | No | 30 days | Yes |
| `/v1/audio/transcriptions` | No | Zero data retention | - |
| `/v1/audio/translations` | No | Zero data retention | - |
| `/v1/audio/speech` | No | 30 days | Yes |
| `/v1/files` | No | Until deleted by customer | No |
| `/v1/fine_tuning/jobs` | No | Until deleted by customer | No |
| `/v1/batches` | No | Until deleted by customer | No |
| `/v1/moderations` | No | Zero data retention | - |
| `/v1/completions` | No | 30 days | Yes |
| `/v1/realtime` (beta) | No | 30 days | Yes |

**\\* Chat Completions:**

- Image inputs via the `gpt-4o`, `gpt-4o-mini`, `chatgpt-4o-latest`, or `gpt-4-turbo` models (or previously `gpt-4-vision-preview`) are not eligible for zero retention.
- Audio outputs are stored for 1 hour to enable [multi-turn conversations](/docs/guides/audio), and are not currently eligible for zero retention.
- When Structured Outputs is enabled, schemas provided (either as the `response_format` or in the function definition) are not eligible for zero retention, though the completions themselves are.
- When using Stored Completions via the `store: true` option in the API, those completions are stored for 30 days. Completions are stored in an unfiltered form after an API response, so please avoid storing completions that contain sensitive data.

**\\*\\* Assistants API:**

- Objects related to the Assistants API are deleted from our servers 30 days after you delete them via the API or the dashboard. Objects that are not deleted via the API or dashboard are retained indefinitely.

**Evaluations:**

- [Evaluation](/evaluations) data: When you create an evaluation, the data related to that evaluation is deleted from our servers 30 days after you delete it via the dashboard. Evaluation data that is not deleted via the dashboard is retained indefinitely.

For details, see our [API data usage policies](https://openai.com/policies/api-data-usage-policies). To learn more about zero retention, get in touch with our [sales team](https://openai.com/contact-sales).

## Model endpoint compatibility

| Endpoint | Latest models |
| --- | --- |
| /v1/assistants | All GPT-4o (except `chatgpt-4o-latest`), GPT-4o-mini, GPT-4, and GPT-3.5 Turbo models. The `retrieval` tool requires `gpt-4-turbo-preview` (and subsequent dated model releases) or `gpt-3.5-turbo-1106` (and subsequent versions). |
| /v1/audio/transcriptions | `whisper-1` |
| /v1/audio/translations | `whisper-1` |
| /v1/audio/speech | `tts-1`,  `tts-1-hd` |
| /v1/chat/completions | All GPT-4o (except for Realtime preview), GPT-4o-mini, GPT-4, and GPT-3.5 Turbo models and their dated releases. `chatgpt-4o-latest` dynamic model. [Fine-tuned](/docs/guides/fine-tuning) versions of `gpt-4o`,  `gpt-4o-mini`,  `gpt-4`,  and `gpt-3.5-turbo`. |
| /v1/completions (Legacy) | `gpt-3.5-turbo-instruct`,  `babbage-002`,  `davinci-002` |
| /v1/embeddings | `text-embedding-3-small`,  `text-embedding-3-large`,  `text-embedding-ada-002` |
| /v1/fine\_tuning/jobs | `gpt-4o`,  `gpt-4o-mini`,  `gpt-4`,  `gpt-3.5-turbo` |
| /v1/moderations | `text-moderation-stable`,  `text-moderation-latest` |
| /v1/images/generations | `dall-e-2`,  `dall-e-3` |
| /v1/realtime (beta) | `gpt-4o-realtime-preview`, `gpt-4o-realtime-preview-2024-10-01` |

This list excludes all of our [deprecated models](/docs/deprecations).Log in [Sign up](/signup)

# Models

Copy page

## Flagship models

[GPT-4o\\
\\
Our high-intelligence flagship model for complex, multi‑step tasks\\
\\
Text and image input, text output\\
\\
128k context length\\
\\
Smarter model, higher price per token](/docs/models#gpt-4o)

[GPT-4o mini\\
\\
Our affordable and intelligent small model for fast, lightweight tasks\\
\\
Text and image input, text output\\
\\
128k context length\\
\\
Faster model, lower price per token](/docs/models#gpt-4o-mini)

[o1-preview & o1-mini\\
\\
Beta\\
\\
A new series of reasoning models for solving hard problems\\
\\
Text input, text output\\
\\
128k context length\\
\\
Higher latency, uses tokens to think](/docs/models#o1)

[Model pricing details](https://openai.com/api/pricing)

## Models overview

The OpenAI API is powered by a diverse set of models with different capabilities and price points. You can also make customizations to our models for your specific use case with [fine-tuning](/docs/guides/fine-tuning).

| Model | Description |
| --- | --- |
| [GPT-4o](#gpt-4o) | Our high-intelligence flagship model for complex, multi-step tasks |
| [GPT-4o mini](#gpt-4o-mini) | Our affordable and intelligent small model for fast, lightweight tasks |
| [o1-preview and o1-mini](#o1) | Language models trained with reinforcement learning to perform complex reasoning. |
| [GPT-4 Turbo and GPT-4](#gpt-4-turbo-and-gpt-4) | The previous set of high-intelligence models |
| [GPT-3.5 Turbo](#gpt-3-5-turbo) | A fast, inexpensive model for simple tasks |
| [DALL·E](#dall-e) | A model that can generate and edit images given a natural language prompt |
| [TTS](#tts) | A set of models that can convert text into natural sounding spoken audio |
| [Whisper](#whisper) | A model that can convert audio into text |
| [Embeddings](#embeddings) | A set of models that can convert text into a numerical form |
| [Moderation](#moderation) | A fine-tuned model that can detect whether text may be sensitive or unsafe |
| [Deprecated](/docs/deprecations) | A full list of models that have been deprecated along with the suggested replacement |

For GPT-series models, the context window refers to the maximum number of tokens that can be used in a single request, inclusive of both input and output tokens.

We have also published open source models including [Point-E](https://github.com/openai/point-e), [Whisper](https://github.com/openai/whisper), [Jukebox](https://github.com/openai/jukebox), and [CLIP](https://github.com/openai/CLIP).

## Continuous model upgrades

`gpt-4o`, `gpt-4o-mini`, `gpt-4-turbo`, `gpt-4`, and `gpt-3.5-turbo` point to their respective latest model version. You can verify this by looking at the [response object](/docs/api-reference/chat/object) after sending a request. The response will include the specific model version used (e.g. `gpt-3.5-turbo-1106`). The `chatgpt-4o-latest` model version continuously points to the version of GPT-4o used in [ChatGPT](https://chatgpt.com), and is updated frequently, when there are significant changes. With the exception of `chatgpt-4o-latest`, we offer pinned model versions that developers can continue using for at least three months after an updated model has been introduced.

Learn more about model deprecation on our [deprecation page](/docs/deprecations).

## GPT-4o

GPT-4o (“o” for “omni”) is our most advanced GPT model. It is multimodal (accepting text or image inputs and outputting text), and it has the same high intelligence as GPT-4 Turbo but is much more efficient—it generates text 2x faster and is 50% cheaper. Additionally, GPT-4o has the best vision and performance across non-English languages of any of our models. GPT-4o is available in the OpenAI API to paying customers. Learn how to use GPT-4o in our [text generation guide](/docs/guides/text-generation).

| Model | Context window | Max output tokens | Knowledge cutoff |
| --- | --- | --- | --- |
| gpt-4o <br>Our high-intelligence flagship model for complex, multi-step tasks. GPT-4o is cheaper and faster than GPT-4 Turbo. Currently points to `gpt-4o-2024-08-06`. | 128,000 tokens | 16,384 tokens | Oct 2023 |
| gpt-4o-2024-11-20 <br>Latest `gpt-4o` snapshot from November 20th, 2024. | 128,000 tokens | 16,384 tokens | Oct 2023 |
| gpt-4o-2024-08-06 <br>First snapshot that supports [Structured Outputs](/docs/guides/structured-outputs). `gpt-4o` currently points to this version. | 128,000 tokens | 16,384 tokens | Oct 2023 |
| gpt-4o-2024-05-13 <br>Original `gpt-4o` snapshot from May 13, 2024. | 128,000 tokens | 4,096 tokens | Oct 2023 |
| chatgpt-4o-latest <br>The `chatgpt-4o-latest` model version continuously points to the version of GPT-4o used in ChatGPT, and is updated frequently, when there are significant changes. | 128,000 tokens | 16,384 tokens | Oct 2023 |

## GPT-4o mini

GPT-4o mini (“o” for “omni”) is our most advanced model in the small models category, and our cheapest model yet.
It is multimodal (accepting text or image inputs and outputting text), has higher intelligence than `gpt-3.5-turbo` but is just as fast.
It is meant to be used for smaller tasks, including vision tasks.

We recommend choosing `gpt-4o-mini` where you would have previously used `gpt-3.5-turbo` as this model is more capable and cheaper.

| Model | Context window | Max output tokens | Knowledge cutoff |
| --- | --- | --- | --- |
| gpt-4o-mini<br>Our affordable and intelligent small model for fast, lightweight tasks. GPT-4o mini is cheaper and more capable than GPT-3.5 Turbo. Currently points to `gpt-4o-mini-2024-07-18`. | 128,000 tokens | 16,384 tokens | Oct 2023 |
| gpt-4o-mini-2024-07-18<br>`gpt-4o-mini` currently points to this version. | 128,000 tokens | 16,384 tokens | Oct 2023 |

## GPT-4o Realtime + Audio     Beta

This is a preview release of the GPT-4o Realtime and Audio models. The `gpt-4o-realtime-*` models are capable of responding to audio and text inputs over a WebSocket interface. Learn more in the [Realtime API guide](/docs/guides/realtime). The `gpt-4o-audio-*` models below can be used in Chat Completions to [generate audio responses](/docs/guides/audio).

| Model | Context window | Max output tokens | Knowledge cutoff |
| --- | --- | --- | --- |
| gpt-4o-realtime-preview<br>Preview release for the [Realtime API](/docs/guides/realtime) | 128,000 tokens | 4,096 tokens | Oct 2023 |
| gpt-4o-realtime-preview-2024-10-01<br>Current snapshot for the Realtime API model. | 128,000 tokens | 4,096 tokens | Oct 2023 |
| gpt-4o-audio-preview<br>Preview release for [audio inputs in chat completions](/docs/guides/audio). | 128,000 tokens | 16,384 tokens | Oct 2023 |
| gpt-4o-audio-preview-2024-10-01<br>Current snapshot for the Audio API model. | 128,000 tokens | 16,384 tokens | Oct 2023 |

## o1-preview and o1-mini     Beta

The **o1 series** of large language models are trained with reinforcement
learning to perform complex reasoning. o1 models think before they answer,
producing a long internal chain of thought before responding to the user.

Learn about the capabilities and limitations of o1 models in our
[reasoning guide](/docs/guides/reasoning).

There are two model types available today:

- **o1-preview**: reasoning model designed to solve hard problems across domains.
- **o1-mini**: faster and cheaper reasoning model particularly good at coding, math, and science.

| Model | Context window | Max output tokens | Knowledge cutoff |
| --- | --- | --- | --- |
| o1-preview<br>Points to the most recent snapshot of the o1 model: `o1-preview-2024-09-12` | 128,000 tokens | 32,768 tokens | Oct 2023 |
| o1-preview-2024-09-12<br>Latest o1 model snapshot | 128,000 tokens | 32,768 tokens | Oct 2023 |
| o1-mini<br>Points to the most recent o1-mini snapshot: `o1-mini-2024-09-12` | 128,000 tokens | 65,536 tokens | Oct 2023 |
| o1-mini-2024-09-12<br>Latest o1-mini model snapshot | 128,000 tokens | 65,536 tokens | Oct 2023 |

## GPT-4 Turbo and GPT-4

GPT-4 is a large multimodal model (accepting text or image inputs and outputting text) that can solve difficult problems with greater accuracy than any of our previous models, thanks to its broader general knowledge and advanced reasoning capabilities. GPT-4 is available in the OpenAI API to [paying customers](https://help.openai.com/en/articles/7102672-how-can-i-access-gpt-4). Like `gpt-3.5-turbo`, GPT-4 is optimized for chat but works well for traditional completions tasks using the [Chat Completions API](/docs/api-reference/chat). Learn how to use GPT-4 in our [text generation guide](/docs/guides/text-generation).

| Model | Context window | Max output tokens | Knowledge cutoff |
| --- | --- | --- | --- |
| gpt-4-turbo<br>The latest GPT-4 Turbo model with vision capabilities. Vision requests can now use JSON mode and function calling. Currently points to `gpt-4-turbo-2024-04-09`. | 128,000 tokens | 4,096 tokens | Dec 2023 |
| gpt-4-turbo-2024-04-09<br>GPT-4 Turbo with Vision model. Vision requests can now use JSON mode and function calling. `gpt-4-turbo` currently points to this version. | 128,000 tokens | 4,096 tokens | Dec 2023 |
| gpt-4-turbo-preview<br>GPT-4 Turbo preview model. Currently points to `gpt-4-0125-preview`. | 128,000 tokens | 4,096 tokens | Dec 2023 |
| gpt-4-0125-preview<br>GPT-4 Turbo preview model intended to reduce cases of “laziness” where the model doesn’t complete a task. [Learn more](https://openai.com/blog/new-embedding-models-and-api-updates). | 128,000 tokens | 4,096 tokens | Dec 2023 |
| gpt-4-1106-preview<br>GPT-4 Turbo preview model featuring improved instruction following, JSON mode, reproducible outputs, parallel function calling, and more. This is a preview model. [Learn more](https://openai.com/blog/new-models-and-developer-products-announced-at-devday). | 128,000 tokens | 4,096 tokens | Apr 2023 |
| gpt-4<br>Currently points to `gpt-4-0613`. See [continuous model upgrades](#continuous-model-upgrades). | 8,192 tokens | 8,192 tokens | Sep 2021 |
| gpt-4-0613<br>Snapshot of `gpt-4` from June 13th 2023 with improved function calling support. | 8,192 tokens | 8,192 tokens | Sep 2021 |
| gpt-4-0314 <br>Legacy<br>Snapshot of `gpt-4` from March 14th 2023. | 8,192 tokens | 8,192 tokens | Sep 2021 |

For many basic tasks, the difference between GPT-4 and GPT-3.5 models is not significant. However, in more complex reasoning situations, GPT-4 is much more capable than any of our previous models.

#### Multilingual capabilities

GPT-4 [outperforms both previous large language models](https://cdn.openai.com/papers/gpt-4.pdf) and as of 2023, most state-of-the-art systems (which often have benchmark-specific training or hand-engineering). On the MMLU benchmark, an English-language suite of multiple-choice questions covering 57 subjects, GPT-4 not only outperforms existing models by a considerable margin in English, but also demonstrates strong performance in other languages.

## GPT-3.5 Turbo

GPT-3.5 Turbo models can understand and generate natural language or code and have been optimized for chat using the [Chat Completions API](/docs/api-reference/chat) but work well for non-chat tasks as well.

As of July 2024, `gpt-4o-mini` should be used in place of `gpt-3.5-turbo`, as it is cheaper, more capable, multimodal, and just as fast. `gpt-3.5-turbo` is still available for use in the API.

| Model | Context window | Max output tokens | Knowledge cutoff |
| --- | --- | --- | --- |
| gpt-3.5-turbo-0125<br>The latest GPT-3.5 Turbo model with higher accuracy at responding in requested formats and a fix for a bug which caused a text encoding issue for non-English language function calls. [Learn more](https://openai.com/blog/new-embedding-models-and-api-updates#:~:text=Other%20new%20models%20and%20lower%20pricing). | 16,385 tokens | 4,096 tokens | Sep 2021 |
| gpt-3.5-turbo<br>Currently points to `gpt-3.5-turbo-0125`. | 16,385 tokens | 4,096 tokens | Sep 2021 |
| gpt-3.5-turbo-1106<br>GPT-3.5 Turbo model with improved instruction following, JSON mode, reproducible outputs, parallel function calling, and more. [Learn more](https://openai.com/blog/new-models-and-developer-products-announced-at-devday). | 16,385 tokens | 4,096 tokens | Sep 2021 |
| gpt-3.5-turbo-instruct<br>Similar capabilities as GPT-3 era models. Compatible with legacy Completions endpoint and not Chat Completions. | 4,096 tokens | 4,096 tokens | Sep 2021 |

## DALL·E

DALL·E is a AI system that can create realistic images and art from a description in natural language. DALL·E 3 currently supports the ability, given a prompt, to create a new image with a specific size. DALL·E 2 also support the ability to edit an existing image, or create variations of a user provided image.

[DALL·E 3](https://openai.com/dall-e-3) is available through our [Images API](/docs/guides/images) along with [DALL·E 2](https://openai.com/blog/dall-e-api-now-available-in-public-beta). You can try DALL·E 3 through [ChatGPT Plus](https://chatgpt.com).

| Model | Description |
| --- | --- |
| `dall-e-3` | The latest DALL·E model released in Nov 2023. [Learn more](https://openai.com/blog/new-models-and-developer-products-announced-at-devday). |
| `dall-e-2` | The previous DALL·E model released in Nov 2022. The 2nd iteration of DALL·E with more realistic, accurate, and 4x greater resolution images than the original model. |

## TTS

TTS is an AI model that converts text to natural sounding spoken text. We offer two different model variates, `tts-1` is optimized for real time text to speech use cases and `tts-1-hd` is optimized for quality. These models can be used with the [Speech endpoint in the Audio API](/docs/guides/text-to-speech).

| Model | Description |
| --- | --- |
| `tts-1` | The latest text to speech model, optimized for speed. |
| `tts-1-hd` | The latest text to speech model, optimized for quality. |

## Whisper

Whisper is a general-purpose speech recognition model. It is trained on a large dataset of diverse audio and is also a multi-task model that can perform multilingual speech recognition as well as speech translation and language identification. The Whisper v2-large model is currently available through our API with the `whisper-1` model name.

Currently, there is no difference between the [open source version of Whisper](https://github.com/openai/whisper) and the version available through our API. However, [through our API](/docs/guides/speech-to-text), we offer an optimized inference process which makes running Whisper through our API much faster than doing it through other means. For more technical details on Whisper, you can [read the paper](https://arxiv.org/abs/2212.04356).

## Embeddings

Embeddings are a numerical representation of text that can be used to measure the relatedness between two pieces of text. Embeddings are useful for search, clustering, recommendations, anomaly detection, and classification tasks. You can read more about our latest embedding models in the [announcement blog post](https://openai.com/blog/new-embedding-models-and-api-updates).

| Model | Output Dimension |
| --- | --- |
| `text-embedding-3-large` <br>Most capable embedding model for both english and non-english tasks | 3,072 |
| `text-embedding-3-small` <br>Increased performance over 2nd generation ada embedding model | 1,536 |
| `text-embedding-ada-002` <br>Most capable 2nd generation embedding model, replacing 16 first generation models | 1,536 |

* * *

## Moderation

The Moderation models are designed to check whether content complies with OpenAI's [usage policies](https://openai.com/policies/usage-policies). The models provide classification capabilities that look for content in categories like hate, self-harm, sexual content, violence, and others. Learn more about moderating text and images in our [moderation guide](/docs/guides/moderation).

| Model | Max tokens |
| --- | --- |
| `omni-moderation-latest` <br>Currently points to `omni-moderation-2024-09-26`. | 32,768 |
| `omni-moderation-2024-09-26` <br>Latest pinned version of our new multi-modal moderation model, capable of analyzing both text and images. | 32,768 |
| `text-moderation-latest` <br>Currently points to `text-moderation-007`. | 32,768 |
| `text-moderation-stable` <br>Currently points to `text-moderation-007`. | 32,768 |
| `text-moderation-007` <br>Previous generation text-only moderation. We expect `omni-moderation-*` models to be the best default moving forward. | 32,768 |

## GPT base

GPT base models can understand and generate natural language or code but are not trained with instruction following. These models are made to be replacements for our original GPT-3 base models and use the legacy Completions API. Most customers should use GPT-3.5 or GPT-4.

| Model | Max tokens | Knowledge cutoff |
| --- | --- | --- |
| `babbage-002` <br>Replacement for the GPT-3 `ada` and `babbage` base models. | 16,384 tokens | Sep 2021 |
| `davinci-002` <br>Replacement for the GPT-3 `curie` and `davinci` base models. | 16,384 tokens | Sep 2021 |

## How we use your data

Your data is your data.

As of March 1, 2023, data sent to the OpenAI API will not be used to train or improve OpenAI models (unless you explicitly opt-in to share data with us, such as by [providing feedback in the Playground](https://help.openai.com/en/articles/9883556-providing-feedback-in-the-api-playground)). One advantage to opting in is that the models may get better at your use case over time.

To help identify abuse, API data may be retained for up to 30 days, after which it will be deleted (unless otherwise required by law). For trusted customers with sensitive applications, zero data retention may be available. With zero data retention, request and response bodies are not persisted to any logging mechanism and exist only in memory in order to serve the request.

Note that this data policy does not apply to OpenAI's non-API consumer services like [ChatGPT](https://chatgpt.com/) or [DALL·E Labs](https://labs.openai.com/).

### Default usage policies by endpoint

| Endpoint | Data used for training | Default retention | Eligible for zero retention |
| --- | --- | --- | --- |
| `/v1/chat/completions`\* | No | 30 days | Yes, except (a) image inputs, (b) schemas provided for Structured Outputs, or (c) audio outputs. \* |
| `/v1/assistants` | No | 30 days \*\* | No |
| `/v1/threads` | No | 30 days \*\* | No |
| `/v1/threads/messages` | No | 30 days \*\* | No |
| `/v1/threads/runs` | No | 30 days \*\* | No |
| `/v1/vector_stores` | No | 30 days \*\* | No |
| `/v1/threads/runs/steps` | No | 30 days \*\* | No |
| `/v1/images/generations` | No | 30 days | No |
| `/v1/images/edits` | No | 30 days | No |
| `/v1/images/variations` | No | 30 days | No |
| `/v1/embeddings` | No | 30 days | Yes |
| `/v1/audio/transcriptions` | No | Zero data retention | - |
| `/v1/audio/translations` | No | Zero data retention | - |
| `/v1/audio/speech` | No | 30 days | Yes |
| `/v1/files` | No | Until deleted by customer | No |
| `/v1/fine_tuning/jobs` | No | Until deleted by customer | No |
| `/v1/batches` | No | Until deleted by customer | No |
| `/v1/moderations` | No | Zero data retention | - |
| `/v1/completions` | No | 30 days | Yes |
| `/v1/realtime` (beta) | No | 30 days | Yes |

**\\* Chat Completions:**

- Image inputs via the `gpt-4o`, `gpt-4o-mini`, `chatgpt-4o-latest`, or `gpt-4-turbo` models (or previously `gpt-4-vision-preview`) are not eligible for zero retention.
- Audio outputs are stored for 1 hour to enable [multi-turn conversations](/docs/guides/audio), and are not currently eligible for zero retention.
- When Structured Outputs is enabled, schemas provided (either as the `response_format` or in the function definition) are not eligible for zero retention, though the completions themselves are.
- When using Stored Completions via the `store: true` option in the API, those completions are stored for 30 days. Completions are stored in an unfiltered form after an API response, so please avoid storing completions that contain sensitive data.

**\\*\\* Assistants API:**

- Objects related to the Assistants API are deleted from our servers 30 days after you delete them via the API or the dashboard. Objects that are not deleted via the API or dashboard are retained indefinitely.

**Evaluations:**

- [Evaluation](/evaluations) data: When you create an evaluation, the data related to that evaluation is deleted from our servers 30 days after you delete it via the dashboard. Evaluation data that is not deleted via the dashboard is retained indefinitely.

For details, see our [API data usage policies](https://openai.com/policies/api-data-usage-policies). To learn more about zero retention, get in touch with our [sales team](https://openai.com/contact-sales).

## Model endpoint compatibility

| Endpoint | Latest models |
| --- | --- |
| /v1/assistants | All GPT-4o (except `chatgpt-4o-latest`), GPT-4o-mini, GPT-4, and GPT-3.5 Turbo models. The `retrieval` tool requires `gpt-4-turbo-preview` (and subsequent dated model releases) or `gpt-3.5-turbo-1106` (and subsequent versions). |
| /v1/audio/transcriptions | `whisper-1` |
| /v1/audio/translations | `whisper-1` |
| /v1/audio/speech | `tts-1`,  `tts-1-hd` |
| /v1/chat/completions | All GPT-4o (except for Realtime preview), GPT-4o-mini, GPT-4, and GPT-3.5 Turbo models and their dated releases. `chatgpt-4o-latest` dynamic model. [Fine-tuned](/docs/guides/fine-tuning) versions of `gpt-4o`,  `gpt-4o-mini`,  `gpt-4`,  and `gpt-3.5-turbo`. |
| /v1/completions (Legacy) | `gpt-3.5-turbo-instruct`,  `babbage-002`,  `davinci-002` |
| /v1/embeddings | `text-embedding-3-small`,  `text-embedding-3-large`,  `text-embedding-ada-002` |
| /v1/fine\_tuning/jobs | `gpt-4o`,  `gpt-4o-mini`,  `gpt-4`,  `gpt-3.5-turbo` |
| /v1/moderations | `text-moderation-stable`,  `text-moderation-latest` |
| /v1/images/generations | `dall-e-2`,  `dall-e-3` |
| /v1/realtime (beta) | `gpt-4o-realtime-preview`, `gpt-4o-realtime-preview-2024-10-01` |

This list excludes all of our [deprecated models](/docs/deprecations).Log in [Sign up](/signup)

# Vision

Copy page

Learn how to use vision capabilities to understand images.

Many OpenAI [models](/docs/models) have vision capabilities, meaning the models can take in images and answer questions about them. Historically, language model systems have been limited by taking in a single input modality, text.

## Quickstart

Images are made available to the model in two main ways: by passing a link to the image or by passing the base64 encoded image directly in the request. Images can be passed in the `user` messages.

What's in this image?

python

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
  model="gpt-4o-mini",
  messages=[\
    {\
      "role": "user",\
      "content": [\
        {"type": "text", "text": "What’s in this image?"},\
        {\
          "type": "image_url",\
          "image_url": {\
            "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",\
          },\
        },\
      ],\
    }\
  ],
  max_tokens=300,
)

print(response.choices[0])
```

```bash
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [\
      {\
        "role": "user",\
        "content": [\
          {\
            "type": "text",\
            "text": "What’s in this image?"\
          },\
          {\
            "type": "image_url",\
            "image_url": {\
              "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg"\
            }\
          }\
        ]\
      }\
    ],
    "max_tokens": 300
  }'
```

```node
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [\
      {\
        role: "user",\
        content: [\
          { type: "text", text: "What’s in this image?" },\
          {\
            type: "image_url",\
            image_url: {\
              "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",\
            },\
          },\
        ],\
      },\
    ],
  });
  console.log(response.choices[0]);
}
main();
```

The model is best at answering general questions about what is present in the images. While it does understand the relationship between objects in images, it is not yet optimized to answer detailed questions about the location of certain objects in an image. For example, you can ask it what color a car is or what some ideas for dinner might be based on what is in you fridge, but if you show it an image of a room and ask it where the chair is, it may not answer the question correctly.

It is important to keep in mind the [limitations of the model](/docs/guides/vision#limitations) as you explore what use-cases visual understanding can be applied to.

[Video understanding with vision\\
\\
Learn how to use use GPT-4 with Vision to understand videos in the OpenAI Cookbook](https://cookbook.openai.com/examples/gpt_with_vision_for_video_understanding)

## Uploading Base64 encoded images

If you have an image or set of images locally, you can pass those to the model in base 64 encoded format, here is an example of this in action:

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
import base64
from openai import OpenAI

client = OpenAI()

# Function to encode the image
def encode_image(image_path):
  with open(image_path, "rb") as image_file:
    return base64.b64encode(image_file.read()).decode('utf-8')

# Path to your image
image_path = "path_to_your_image.jpg"

# Getting the base64 string
base64_image = encode_image(image_path)

response = client.chat.completions.create(
  model="gpt-4o-mini",
  messages=[\
    {\
      "role": "user",\
      "content": [\
        {\
          "type": "text",\
          "text": "What is in this image?",\
        },\
        {\
          "type": "image_url",\
          "image_url": {\
            "url":  f"data:image/jpeg;base64,{base64_image}"\
          },\
        },\
      ],\
    }\
  ],
)

print(response.choices[0])
```

## Multiple image inputs

The Chat Completions API is capable of taking in and processing multiple image inputs in both base64 encoded format or as an image URL. The model will process each image and use the information from all of them to answer the question.

Multiple image inputs

python

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
from openai import OpenAI

client = OpenAI()
response = client.chat.completions.create(
  model="gpt-4o-mini",
  messages=[\
    {\
      "role": "user",\
      "content": [\
        {\
          "type": "text",\
          "text": "What are in these images? Is there any difference between them?",\
        },\
        {\
          "type": "image_url",\
          "image_url": {\
            "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",\
          },\
        },\
        {\
          "type": "image_url",\
          "image_url": {\
            "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",\
          },\
        },\
      ],\
    }\
  ],
  max_tokens=300,
)
print(response.choices[0])
```

```bash
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [\
      {\
        "role": "user",\
        "content": [\
          {\
            "type": "text",\
            "text": "What are in these images? Is there any difference between them?"\
          },\
          {\
            "type": "image_url",\
            "image_url": {\
              "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",\
            }\
          },\
          {\
            "type": "image_url",\
            "image_url": {\
              "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",\
            }\
          }\
        ]\
      }\
    ],
    "max_tokens": 300
  }'
```

```node
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [\
      {\
        role: "user",\
        content: [\
          { type: "text", text: "What are in these images? Is there any difference between them?" },\
          {\
            type: "image_url",\
            image_url: {\
              "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",\
            },\
          },\
          {\
            type: "image_url",\
            image_url: {\
              "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",\
            },\
          }\
        ],\
      },\
    ],
  });
  console.log(response.choices[0]);
}
main();
```

Here the model is shown two copies of the same image and can answer questions about both or each of the images independently.

## Low or high fidelity image understanding

By controlling the `detail` parameter, which has three options, `low`, `high`, or `auto`, you have control over how the model processes the image and generates its textual understanding. By default, the model will use the `auto` setting which will look at the image input size and decide if it should use the `low` or `high` setting.

- `low` will enable the "low res" mode. The model will receive a low-res 512px x 512px version of the image, and represent the image with a budget of 85 tokens. This allows the API to return faster responses and consume fewer input tokens for use cases that do not require high detail.
- `high` will enable "high res" mode, which first allows the model to first see the low res image (using 85 tokens) and then creates detailed crops using 170 tokens for each 512px x 512px tile.

Choosing the detail level

python

```python
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
from openai import OpenAI

client = OpenAI()

response = client.chat.completions.create(
  model="gpt-4o-mini",
  messages=[\
    {\
      "role": "user",\
      "content": [\
        {"type": "text", "text": "What’s in this image?"},\
        {\
          "type": "image_url",\
          "image_url": {\
            "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",\
            "detail": "high"\
          },\
        },\
      ],\
    }\
  ],
  max_tokens=300,
)

print(response.choices[0].message.content)
```

```bash
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-4o-mini",
    "messages": [\
      {\
        "role": "user",\
        "content": [\
          {\
            "type": "text",\
            "text": "What’s in this image?"\
          },\
          {\
            "type": "image_url",\
            "image_url": {\
              "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",\
              "detail": "high"\
            }\
          }\
        ]\
      }\
    ],
    "max_tokens": 300
  }'
```

```node
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [\
      {\
        role: "user",\
        content: [\
          { type: "text", text: "What’s in this image?" },\
          {\
            type: "image_url",\
            image_url: {\
              "url": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",\
              "detail": "low"\
            },\
          },\
        ],\
      },\
    ],
  });
  console.log(response.choices[0]);
}
main();
```

## Managing images

The Chat Completions API, unlike the Assistants API, is not stateful. That means you have to manage the messages (including images) you pass to the model yourself. If you want to pass the same image to the model multiple times, you will have to pass the image each time you make a request to the API.

For long running conversations, we suggest passing images via URL's instead of base64. The latency of the model can also be improved by downsizing your images ahead of time to be less than the maximum size they are expected them to be. For low res mode, we expect a 512px x 512px image. For high res mode, the short side of the image should be less than 768px and the long side should be less than 2,000px.

After an image has been processed by the model, it is deleted from OpenAI servers and not retained. [We do not use data uploaded via the OpenAI API to train our models](https://openai.com/enterprise-privacy).

## Limitations

While GPT-4 with vision is powerful and can be used in many situations, it is important to understand the limitations of the model. Here are some of the limitations we are aware of:

- Medical images: The model is not suitable for interpreting specialized medical images like CT scans and shouldn't be used for medical advice.
- Non-English: The model may not perform optimally when handling images with text of non-Latin alphabets, such as Japanese or Korean.
- Small text: Enlarge text within the image to improve readability, but avoid cropping important details.
- Rotation: The model may misinterpret rotated / upside-down text or images.
- Visual elements: The model may struggle to understand graphs or text where colors or styles like solid, dashed, or dotted lines vary.
- Spatial reasoning: The model struggles with tasks requiring precise spatial localization, such as identifying chess positions.
- Accuracy: The model may generate incorrect descriptions or captions in certain scenarios.
- Image shape: The model struggles with panoramic and fisheye images.
- Metadata and resizing: The model doesn't process original file names or metadata, and images are resized before analysis, affecting their original dimensions.
- Counting: May give approximate counts for objects in images.
- CAPTCHAS: For safety reasons, we have implemented a system to block the submission of CAPTCHAs.

## Calculating costs

Image inputs are metered and charged in tokens, just as text inputs are. The token cost of a given image is determined by two factors: its size, and the `detail` option on each image\_url block. All images with `detail: low` cost 85 tokens each. `detail: high` images are first scaled to fit within a 2048 x 2048 square, maintaining their aspect ratio. Then, they are scaled such that the shortest side of the image is 768px long. Finally, we count how many 512px squares the image consists of. Each of those squares costs **170 tokens**. Another **85 tokens** are always added to the final total.

Here are some examples demonstrating the above.

- A 1024 x 1024 square image in `detail: high` mode costs 765 tokens

  - 1024 is less than 2048, so there is no initial resize.
  - The shortest side is 1024, so we scale the image down to 768 x 768.
  - 4 512px square tiles are needed to represent the image, so the final token cost is `170 * 4 + 85 = 765`.
- A 2048 x 4096 image in `detail: high` mode costs 1105 tokens

  - We scale down the image to 1024 x 2048 to fit within the 2048 square.
  - The shortest side is 1024, so we further scale down to 768 x 1536.
  - 6 512px tiles are needed, so the final token cost is `170 * 6 + 85 = 1105`.
- A 4096 x 8192 image in `detail: low` most costs 85 tokens

  - Regardless of input size, low detail images are a fixed cost.

## FAQ

### Can I fine-tune the image capabilities in `gpt-4`?

No, we do not support fine-tuning the image capabilities of `gpt-4` at this time.

### Can I use `gpt-4` to generate images?

No, you can use `dall-e-3` to generate images and `gpt-4o`, `gpt-4o-mini` or `gpt-4-turbo` to understand images.

### What type of files can I upload?

We currently support PNG (.png), JPEG (.jpeg and .jpg), WEBP (.webp), and non-animated GIF (.gif).

### Is there a limit to the size of the image I can upload?

Yes, we restrict image uploads to 20MB per image.

### Can I delete an image I uploaded?

No, we will delete the image for you automatically after it has been processed by the model.

### Where can I learn more about the considerations of GPT-4 with Vision?

You can find details about our evaluations, preparation, and mitigation work in the [GPT-4 with Vision system card](https://openai.com/contributions/gpt-4v).

We have further implemented a system to block the submission of CAPTCHAs.

### How do rate limits for GPT-4 with Vision work?

We process images at the token level, so each image we process counts towards your tokens per minute (TPM) limit. See the calculating costs section for details on the formula used to determine token count per image.

### Can GPT-4 with Vision understand image metadata?

No, the model does not receive image metadata.

### What happens if my image is unclear?

If an image is ambiguous or unclear, the model will do its best to interpret it. However, the results may be less accurate. A good rule of thumb is that if an average human cannot see the info in an image at the resolutions used in low/high res mode, then the model cannot either.Waiting for platform.openai.com to respond...Log in [Sign up](/signup)

Authentication required

Please log in to access this page

Log inSign up

We use cookies and similar technologies to deliver, maintain, improve our services and for security purposes. Check our [Cookie Policy](https://openai.com/policies/cookie-policy) for details. Click 'Accept all' to let OpenAI and partners use cookies for these purposes. Click 'Reject all' to say no to cookies, except those that are strictly necessary. Choose 'Manage Cookies' to pick specific cookies you're okay with or to change your preferences.

Reject allAccept allLog in [Sign up](/signup)

Authentication required

Please log in to access this page

Log inSign up

We use cookies and similar technologies to deliver, maintain, improve our services and for security purposes. Check our [Cookie Policy](https://openai.com/policies/cookie-policy) for details. Click 'Accept all' to let OpenAI and partners use cookies for these purposes. Click 'Reject all' to say no to cookies, except those that are strictly necessary. Choose 'Manage Cookies' to pick specific cookies you're okay with or to change your preferences.

Reject allAccept allLog in [Sign up](/signup)

Authentication required

Please log in to access this page

Log inSign up

We use cookies and similar technologies to deliver, maintain, improve our services and for security purposes. Check our [Cookie Policy](https://openai.com/policies/cookie-policy) for details. Click 'Accept all' to let OpenAI and partners use cookies for these purposes. Click 'Reject all' to say no to cookies, except those that are strictly necessary. Choose 'Manage Cookies' to pick specific cookies you're okay with or to change your preferences.

Reject allAccept all