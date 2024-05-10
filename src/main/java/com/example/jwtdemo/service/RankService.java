package com.example.jwtdemo.service;

import com.example.jwtdemo.entity.Rank;
import com.example.jwtdemo.repository.RankRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@AllArgsConstructor(onConstructor = @__(@Autowired))
@Service
public class RankService {
    private final RankRepository rankRepository;

    public Rank findRankByScore(int score) {
        return rankRepository.findRankByScore(score);
    }

}
