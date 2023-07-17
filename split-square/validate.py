def validate(s):
    """Validate that a given square is valid.."""

    if isinstance(s, int):
        return s == 0 or s == 1

    if isinstance(s, list) and len(s) == 4:
        for q in s:
            if not validate(q):
                return False
        return True

    return False


if __name__ == "__main__":
    import doctest
    if doctest.testmod().failed == 0:
        print "\n*** ALL TESTS PASS; THAT'S SUPER-VALID WORK!\n"
