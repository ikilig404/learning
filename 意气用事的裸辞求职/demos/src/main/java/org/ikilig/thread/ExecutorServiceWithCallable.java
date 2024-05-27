package org.ikilig.thread;

import java.util.concurrent.*;

public class ExecutorServiceWithCallable {
    public static void main(String[] args) {
        ExecutorService executorService = Executors.newFixedThreadPool(3);

        Callable<Integer> task = () -> {
            System.out.println("Task is running.");
            return 123;
        };

        Future<Integer> future = executorService.submit(task);

        try {
            Integer result = future.get(); // 获取结果
            System.out.println("Result: " + result);
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }

        executorService.shutdown();
    }
}