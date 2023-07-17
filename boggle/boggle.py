def make_board(board_string):
    letters = board_string.split()
    board = [
        letters[0:5],
        letters[5:10],
        letters[10:15],
        letters[15:20],
        letters[20:25],
    ]
    return board


def find_from(board, word, y, x, seen):
    if board[y][x] != word[0]:
        return False
    if (y, x) in seen:
        return False
    if len(word) == 1:
        return True
    seen = seen | {(y, x)}
    if y > 0:
        if find_from(board, word[1:], y - 1, x, seen):
            return True
    if y < 4:
        if find_from(board, word[1:], y + 1, x, seen):
            return True
    if x > 0:
        if find_from(board, word[1:], y, x - 1, seen):
            return True
    if x < 4:
        if find_from(board, word[1:], y, x + 1, seen):
            return True
    return False


def find(board, word):
    for y in range(0, 5):
        for x in range(0, 5):
            if find_from(board, word, y, x, seen=set()):
                return True
    return False


board = make_board('''
N C A N E
O U I O P
Z Q Z O N
F A D P L
E D E A Z
''')

print(find(board, "NOON"))  # True
print(find(board, "NOPE"))  # True
print(find(board, "CANON"))  # False
print(find(board, "QUINE"))  # False
print(find(board, "FADED"))  # True

board2 = make_board('''
E D O S Z
N S O N R
O U O O P
Z Q Z O R
F A D P L
''')

print(find(board2, "NOOOOS"))  # True
