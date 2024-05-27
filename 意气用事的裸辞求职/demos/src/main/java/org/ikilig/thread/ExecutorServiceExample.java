package org.ikilig.thread;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ExecutorServiceExample {
    public static void main(String[] args) {
        ExecutorService executorService = Executors.newFixedThreadPool(3);

        Runnable task = () -> {
            System.out.println("Task is running.");
        };

        executorService.execute(task);
        executorService.shutdown();
    }
}