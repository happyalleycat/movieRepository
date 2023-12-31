package com.betulaltindis.userService.user;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="_user")
public class User implements UserDetails {

    @Id
    @GeneratedValue
    private Long id;
    private String userName;
    private String email;
    private String password;
    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities(){       
         return List.of(new SimpleGrantedAuthority(userRole.name()));
        }
 
   @Override
    public String getPassword(){
        return password;
    }

    @Override 
    public String getUsername(){
        return userName;
    }

    @Override 
    public boolean isAccountNonExpired(){
        return true;
    }

    @Override 
    public boolean isAccountNonLocked(){
        return true;
    }

    @Override 
    public boolean isCredentialsNonExpired(){
        return true;
    }

    @Override 
    public  boolean isEnabled(){
        return true;
    }

}
