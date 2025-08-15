package com.example.demo.Controller;

import com.example.demo.OpenAiChatComponent;
import com.example.demo.service.QueryExecutionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
//
//@RestController
//@CrossOrigin(origins = "http://localhost:5173")
//public class QueryController {
//    @Autowired
//    private OpenAiChatComponent chat;
//    @Autowired
//    private QueryExecutionService service;
//    @PostMapping("api/query")
//    public ResponseEntity<?> answerQuery(@RequestBody String text){
//        String sql = chat.prepareQuery(text);
//        sql = sql.replaceAll("```sql", "").replaceAll("```", "").trim();
//        List<Object[]> results = service.executeNativeQuery(sql);
//        return ResponseEntity.ok(results);
//    }
//}

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class QueryController {
    @Autowired
    private OpenAiChatComponent chat;

    @Autowired
    private QueryExecutionService service;

    @PostMapping("api/query")
    public ResponseEntity<?> answerQuery(@RequestBody String text) {
        System.out.println(text);
        String sql = chat.prepareQuery(text);
        List<Map<String, Object>> results = null;
         System.out.println(sql);
        // Ensure safe return if not a SQL query
        if (sql.trim().startsWith("```sql") ) {
            sql = sql.replaceAll("```sql", "").replaceAll("```", "").trim();
            results = service.executeNativeQuery(sql);
            System.out.println(results);
            return ResponseEntity.ok(Map.of(
                    "query", sql,
                    "results", results
            ));
        } else {
            // fallback if not a SQL query
            return ResponseEntity.ok(Map.of(
                    "query", sql,
                    "results", "The input is not related to the supported database schema."
            ));
        }
    }


}
