package com.example.jwtdemo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

@Data
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor(onConstructor = @__(@Autowired))
@Entity
@Table(name = "ranks")
public class Rank {
    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rank_id")
    private Long id;
    @Column(name = "rank_name")
    private String rankName;
    @Column(name = "min_score")
    private int minScore;
    @Column(name = "max_score")
    private int maxScore;
}
