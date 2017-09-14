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
    @Path("get")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getMessages(){
        
        String getMessages = "getMessages!";
        
        return Response.ok(getMessages).build();
    }
    
    @POST
    @Path("add")
    public Response addMessage(@QueryParam("message") String message){
        System.out.println(message);
        
        //String addMessage = "addMessage";
        
        return Response.ok(message).build();
    }
    
    
}
