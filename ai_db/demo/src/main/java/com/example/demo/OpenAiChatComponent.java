ipackage com.example.demo;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.advisor.MessageChatMemoryAdvisor;
import org.springframework.ai.chat.memory.ChatMemory;
import org.springframework.ai.chat.memory.MessageWindowChatMemory;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.chat.prompt.PromptTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@Component
public class OpenAiChatComponent {
    private final ChatClient chatClient;

    ChatMemory chatMemory= MessageWindowChatMemory.builder().build();
    public  OpenAiChatComponent(ChatClient.Builder builder) {
        this.chatClient = builder.defaultAdvisors(MessageChatMemoryAdvisor.builder(chatMemory).build()).build();
    }

    public String prepareQuery (String text){
//        String tempt = """
//                     I want a well-defined mysql query for the given question :" {text}"\s
//                      I will provide the details of database and tables below:
//                     Database name:employee_db
//                     table names and fields:
//                     1.employee_details:id primary int,name varchar(256),mobile number char(10),salary float,department varchar(256)
//
//                     Output format: output should be a mysql query only.
//
//                   if text is unrelated to database or tables ,answer to  that  normally.
//
//                   \s""";
//         String tempt = """
//     I want a well-defined MySQL query for the given question: "{text}"

//     I will provide the details of the database and tables below:
//     Database name: employee_db
//     Table names and fields:
//     1. employee_details: id INT PRIMARY KEY, name VARCHAR(256), mobile_number CHAR(10), salary FLOAT, department int ,FOREIGN KEY (department) REFERENCES department_details(dept_id)
//     2.department_details:dept_id Int PRIMARY KEY,dept_name varchar(256),location varchar(256);
//     3.project_details:project_id int primary key,project_name varchar(256),start_date Date,end_date Date,dept_id int, FOREIGN KEY (dept_id) REFERENCES department_details(dept_id)
//     Output format: Output should be a MySQL query only.

//     If the question is unrelated to the database or tables, respond like it is unrelated to database or tables and if unrelated dont add sql as prefix..
// """;
        String tempt = """
You are a strict SQL generator.

Step 1: First check whether the question is related to the given database schema.
- Related means: employee, department, project, salary, location, joins, filters, aggregation, etc.

Step 2:
- If the question is NOT related to the database or tables, respond EXACTLY with:
  This question is unrelated to the database or tables.

- Do NOT explain.
- Do NOT include SQL.
- Do NOT mention database details.

Step 3:
- ONLY if the question IS related, generate a valid MySQL query.
- Output must contain ONLY the SQL query, nothing else.

Database name: employee_db

Tables:
1. employee_details (
   id INT PRIMARY KEY,
   name VARCHAR(256),
   mobile_number CHAR(10),
   salary FLOAT,
   department INT,
   FOREIGN KEY (department) REFERENCES department_details(dept_id)
)

2. department_details (
   dept_id INT PRIMARY KEY,
   dept_name VARCHAR(256),
   location VARCHAR(256)
)

3. project_details (
   project_id INT PRIMARY KEY,
   project_name VARCHAR(256),
   start_date DATE,
   end_date DATE,
   dept_id INT,
   FOREIGN KEY (dept_id) REFERENCES department_details(dept_id)
)

Question: "{text}"
""";
assume db contain name like reddy,viswani,etc
if just write reddy and click enter?

        PromptTemplate promptTemplate = new PromptTemplate(tempt);
        Prompt prompt = promptTemplate.create(Map.of("text",text));
        return chatClient.prompt(prompt)
                .call()
                .content();
    }
}
