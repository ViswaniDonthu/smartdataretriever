//package com.example.demo.service;
//
//import jakarta.persistence.EntityManager;
//import jakarta.persistence.PersistenceContext;
//import jakarta.transaction.Transactional;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Service
//public class QueryExecutionService {
//
//    @PersistenceContext
//    private EntityManager entityManager;
//
//    @Transactional
//    public List<Object[]> executeNativeQuery(String sql) {
//        return entityManager.createNativeQuery(sql).getResultList();
//    }
//}
//
package com.example.demo.service;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.hibernate.Session;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.*;

@Service
public class QueryExecutionService {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public List<Map<String, Object>> executeNativeQuery(String sql) {
        List<Map<String, Object>> resultList = new ArrayList<>();

        entityManager.unwrap(Session.class).doWork(connection -> {
            try (PreparedStatement ps = connection.prepareStatement(sql);
                 ResultSet rs = ps.executeQuery()) {

                ResultSetMetaData metaData = rs.getMetaData();
                int columnCount = metaData.getColumnCount();

                while (rs.next()) {
                    Map<String, Object> row = new LinkedHashMap<>();
                    for (int i = 1; i <= columnCount; i++) {
                        row.put(metaData.getColumnLabel(i), rs.getObject(i));
                    }
                    resultList.add(row);
                }
            }
        });

        return resultList;
    }
}
