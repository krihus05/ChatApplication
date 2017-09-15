package com.krifhu.chatapplication;

import java.util.Collections;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import com.krifhu.chatapplication.domain.Messages;
import com.krifhu.chatapplication.domain.Users;
import java.util.ArrayList;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;

/**
 *
 * @author Kristian
 */
@Stateless
@Path("conversations")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ConversationServices {
    
    @PersistenceContext
    EntityManager em;
    
    @GET
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Messages> getMessages(){
        List<Messages> result = null; 
        result = em.createQuery("SELECT m FROM Messages m", Messages.class)
                .getResultList();
        return result != null ? result : Collections.EMPTY_LIST;
    }
    
    @GET
    @Path("getConversation")
    @Produces(MediaType.APPLICATION_JSON) 
    public List<Messages> getConversation(@QueryParam("user1") String user1, @QueryParam("user2") String user2){ 
        List<Messages> result = null;   
        result = em.createQuery("SELECT m FROM Messages m WHERE (m.sender = :user1 AND m.receiver = :user2) OR (m.sender = :user2 AND m.receiver = :user1)", Messages.class)
                .setParameter("user1", user1)
                .setParameter("user2", user2)
                .getResultList();
        return result != null ? result : Collections.EMPTY_LIST;
    }
    
    @POST
    @Path("add")
    public Response addMessage(@QueryParam("sender") String sender, @QueryParam("receiver") String receiver, @QueryParam("messageBody") String messageBody) {
        if (sender != null && receiver != null && messageBody != null) {
            Messages m = new Messages();
            em.persist(m);
            m.setSender(sender);
            m.setReceiver(receiver);
            m.setMessageBody(messageBody);
        }
        return Response.ok(sender).build();
    }  
}
