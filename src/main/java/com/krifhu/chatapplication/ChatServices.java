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
import java.util.Arrays;
import javax.json.Json;
import javax.json.JsonArrayBuilder;
import javax.json.JsonObject;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Kristian
 */
@Stateless
@Path("users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ChatServices {
    
    @PersistenceContext
    EntityManager em;
    
    @GET
    @Path("get")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Users> getUsers(){
        List<Users> result = null; 
        result = em.createQuery("SELECT u FROM Users u", Users.class)
                .getResultList();
        return result != null ? result : Collections.EMPTY_LIST;
    }
    
    @GET
    @Path("getUser")
    @Produces(MediaType.APPLICATION_JSON) 
    public List<Users> getUser(@QueryParam("username") String username){ 
        List<Users> result = null;
        result = em.createQuery("SELECT u FROM Users u WHERE u.username = :username", Users.class)
                .setParameter("username", username)
                .getResultList();
        return result != null ? result : Collections.EMPTY_LIST;
    }
    
    @POST
    @Path("add")
    public Response addUser(@QueryParam("username") String username, @QueryParam("password") String password) {
        if (username != null && password != null) {
            List<Users> result = null;
            result = em.createQuery("SELECT u FROM Users u WHERE u.username = :username", Users.class)
                .setParameter("username", username)
                .getResultList();
            if(result.size() == 0){
                Users u = new Users();
                em.persist(u);
                u.setUsername(username);
                u.setPassword(password);  
            }else{
                return Response.noContent().build();
            }
            return Response.ok(username).build();
        }
        return Response.noContent().build();
    }
    
    
    @GET
    @Path("getTest")
    @Produces(MediaType.APPLICATION_JSON) 
    public List<Users> getTest(@QueryParam("username") String username, @QueryParam("userID") String userID){ 
        List<Users> result = null;
        
        int id = Integer.parseInt(userID);
        
        result = em.createQuery("SELECT u FROM Users u WHERE u.username = :username OR u.userID = :userID", Users.class)
                .setParameter("username", username)
                .setParameter("userID", id)
                .getResultList();
        return result != null ? result : Collections.EMPTY_LIST;
    }
    
    
    
}