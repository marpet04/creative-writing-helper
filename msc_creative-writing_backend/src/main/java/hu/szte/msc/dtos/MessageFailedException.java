package hu.szte.msc.dtos;

public class MessageFailedException extends Exception{

    public MessageFailedException(String message) {
        super(message);
    }

    public MessageFailedException(Throwable cause) {
        super(cause);
    }

    public MessageFailedException(String message, Throwable cause) {
        super(message, cause);
    }
}