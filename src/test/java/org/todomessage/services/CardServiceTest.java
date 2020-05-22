package org.todomessage.services;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.todomessage.entities.Board;
import org.todomessage.entities.Card;
import org.todomessage.mappers.CardMapper;
import org.todomessage.repositories.CardRepository;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.todomessage.PayloadFactory.TEST_BOARD_NAME;
import static org.todomessage.PayloadFactory.createExistingTestBoard;

@ExtendWith(MockitoExtension.class)
public class CardServiceTest {
    
    @Mock
    private CardRepository cardRepository;
    
    @Mock
    private CardMapper cardMapper;
    
    @Mock
    private TodoService todoService;
    
    @InjectMocks
    private CardService cardService;
    
    @Test
    public void generateDefaultCardsShouldReturnSetOfCards() {
        final int CARDS_COUNT_EXPECTED = 8;
        final Board board = createExistingTestBoard();
        
        final Set<Card> cards = cardService.generateDefaultCards(board);
        
        assertEquals(CARDS_COUNT_EXPECTED, cards.size());
        cards.forEach(card -> {
            assertNotNull(card.getDay());
            assertEquals(TEST_BOARD_NAME, card.getBoard().getName());});
    }
}
