package org.ikilig.spring6.iocxml;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class TestUser {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("bean.xml");

        // 根据 id 获取bean
        User user = (User) context.getBean("user");
        System.out.println("1 根据 id 获取 bean: " + user);

        User user2 = context.getBean(User.class);
        System.out.println("2 根据类型获取 bean: " + user2);

        User user3 = context.getBean("user", User.class);
        System.out.println("3 根据 id 和类型获取 bean: " + user3);
    }
}
