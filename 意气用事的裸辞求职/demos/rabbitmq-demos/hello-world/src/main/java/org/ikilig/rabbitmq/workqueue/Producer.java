package org.ikilig.rabbitmq.workqueue;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import org.ikilig.rabbitmq.utils.ConnectionUtils;

public class Producer {
    public static final String QUEUE_NAME = "work_queue";

    public static void main(String[] args) throws Exception {
        Connection connection = ConnectionUtils.getConnection();
        Channel channel = connection.createChannel();
        channel.queueDeclare(QUEUE_NAME, true, false, false, null);
        for (int i = 0; i < 10; i++) {
            String body = i + "hello rabbitmq~~~";
            channel.basicPublish("", QUEUE_NAME, null, body.getBytes());
        }
        channel.close();
        connection.close();
    }
}
