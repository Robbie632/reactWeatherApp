"""
automated unit tests
"""
import unittest
from utils import RangeFinder


class TestRangeFinder(unittest.TestCase):
    """"
    unit tests for RangeFinder
    """
    def setUp(self):
        self.range_finder = RangeFinder(10)

    def test_1(self):
        """
        finder should show no change because stays out of range
        """
        observed = self.range_finder.into_range(11)
        self.assertEqual(observed, 0)

    def test_2(self):
        """
        finder should show moving into range
        """
        observed = self.range_finder.into_range(9)
        self.assertEqual(observed, 1)

    def test_3(self):
        """
        finder should show moving out of range
        """
        _ = self.range_finder.into_range(9)
        observed = self.range_finder.into_range(11)
        self.assertEqual(observed, -1)

    def test_4(self):
        """
        finder should show no change because sensor in range and stays in range
        """
        _ = self.range_finder.into_range(9)
        observed = self.range_finder.into_range(8)
        self.assertEqual(observed, 0)

    def test_5(self):
        """
        finder should show no change because sensor out of range and stays out of range
        """
        _ = self.range_finder.into_range(11)
        observed = self.range_finder.into_range(12)
        self.assertEqual(observed, 0)

if __name__ == '__main__':
    unittest.main()
    